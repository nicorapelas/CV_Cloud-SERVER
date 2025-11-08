import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { VideoView, useVideoPlayer } from 'expo-video'

import LoaderFullScreen from '../../../../../common/LoaderFullScreen'
import { Context as FirstImpressionContext } from '../../../../../../context/FirstImpressionContext'

const VideoSample = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    state: { loading, videoDemoUrl },
    setVideoDemoShow,
    fetchDemoVideoUrl,
  } = useContext(FirstImpressionContext)

  const player = useVideoPlayer(
    videoDemoUrl?.url ? { uri: videoDemoUrl.url } : undefined
  )

  useEffect(() => {
    fetchDemoVideoUrl()
  }, [])

  useEffect(() => {
    if (videoDemoUrl?.url && player) {
      player.replaceAsync({ uri: videoDemoUrl.url }).then(() => {
        player.loop = true
      })
    }
  }, [videoDemoUrl?.url])

  useEffect(() => {
    if (!player) return

    const subscription = player.addListener('playingChange', (newIsPlaying) => {
      setIsPlaying(newIsPlaying)
    })

    return () => {
      subscription.remove()
    }
  }, [player])

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    if (!videoDemoUrl) return null
    return (
      <View style={styles.videoBed}>
        <VideoView
          player={player}
          style={styles.video}
          nativeControls
          contentFit="contain"
          fullscreenOptions={{ enterFullscreenButtonVisible: true }}
        />
        <View style={styles.buttonsBed}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => (isPlaying ? player.pause() : player.play())}
          >
            {isPlaying ? (
              <MaterialIcons
                name="pause-circle"
                style={styles.playButtonIcon}
              />
            ) : (
              <MaterialIcons name="play-circle" style={styles.playButtonIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setVideoDemoShow(false)}
          >
            <MaterialIcons style={styles.backButtonIcon} name="cancel" />
            <Text style={styles.backButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  videoBed: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#232936',
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '60%',
  },
  buttonsBed: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  playButton: {
    paddingBottom: 20,
  },
  playButtonIcon: {
    color: '#ffff',
    fontSize: 42,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 7,
    paddingTop: 2,
    fontSize: 20,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 18,
  },
})

export default VideoSample
