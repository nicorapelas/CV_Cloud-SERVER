import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import { CameraView, Camera } from 'expo-camera'
import { Audio } from 'expo-audio'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { Context as FirstImpressionContext } from '../../../../../context/FirstImpressionContext'
import { Context as UniversalContext } from '../../../../../context/UniversalContext'
import VideoPlaybackUpload from './video/VideoPlaybackUpload'
import InstructionModal from '../../../../common/modals/InstructionModal'
import FirstImpressionPermissions from './FirstImpressionPermissions'
import VideoSample from './video/VideoSample'
import { log } from 'async'

const FirstImpressionCreateScreen = () => {
  const [time, setTime] = useState(30)
  const [blink, setBlink] = useState(false)
  const [runTimer, setRunTimer] = useState(false)
  const [recording, setRecording] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(null)
  const [audioPermission, setAudioPermission] = useState(null)
  const [type, setType] = useState('back')
  const [view, setView] = useState('record')

  const cameraRef = useRef(null)

  const {
    state: { videoObject, videoDemoShow },
    addVideoObject,
  } = useContext(FirstImpressionContext)

  const { toggleInstructionModal } = useContext(UniversalContext)

  useEffect(() => {
    if (!videoObject) setView('record')
    if (videoObject) setView('play')
  }, [videoObject])

  useEffect(() => {
    toggleInstructionModal(true)
    cameraPermissionsRequest()
    if (Platform.OS === 'android') audioPermissionsRequest()
  }, [])

  useEffect(() => {
    timer()
    autoStopRecording()
  }, [time, runTimer])

  useEffect(() => {
    runCameraPermissions()
  }, [cameraPermission, audioPermission])

  const autoStopRecording = () => {
    if (time === 0) {
      setRecording(false)
      setRunTimer(false)
      setTime(30)
      if (cameraRef.current) {
        cameraRef.current.stopRecording()
      }
    }
  }

  const timer = () => {
    if (!runTimer) return null
    setTimeout(() => {
      setTime(time - 1)
      setBlink(!blink)
    }, 1000)
  }

  const cameraPermissionsRequest = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setCameraPermission(status === 'granted')
      if (status === 'granted') {
        setType('back')
      }
    } catch (error) {
      console.error('Camera permission error:', error)
    }
  }

  const audioPermissionsRequest = async () => {
    try {
      // expo-audio may handle permissions differently
      // For camera recording, permissions are typically handled by expo-camera
      // when audio={true} is set on CameraView
      if (Audio.requestPermissionsAsync) {
        const { status } = await Audio.requestPermissionsAsync()
        setAudioPermission(status === 'granted')
      } else {
        // expo-audio might not have requestPermissionsAsync
        // In this case, expo-camera handles audio permissions
        setAudioPermission(true)
      }
    } catch (error) {
      console.error('Audio permission error:', error)
      // Fallback: camera with audio enabled should handle permissions
      setAudioPermission(true)
    }
  }

  const runCameraPermissions = () => {
    if (cameraPermission === null)
      return (
        <View>
          <Text>hello</Text>
        </View>
      )
    if (cameraPermission === false) return <FirstImpressionPermissions />
    if (audioPermission === false && Platform.OS === 'android')
      return <FirstImpressionPermissions />
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const video = await cameraRef.current.recordAsync({
          quality: '480p',
          maxDuration: 30,
        })
        addVideoObject(video)
      } catch (error) {
        console.error('Recording error:', error)
      }
    }
  }

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording()
    }
  }

  const openCamera = () => {
    if (view === 'record' && type) {
      return (
        <View style={styles.videoRecorderBed}>
          <CameraView
            style={styles.cameraBed}
            facing={type}
            ref={cameraRef}
            mode="video"
            video={true}
            audio={true}
          />
          <View style={styles.cameraContainer}>
            {!runTimer ? null : (
              <>
                <MaterialCommunityIcons
                  name="record"
                  style={!blink ? styles.recondDotOff : styles.recondDotOn}
                />
                <Text style={styles.timeText}>{time}</Text>
              </>
            )}
            <View style={styles.buttonsBed}>
              {runTimer ? null : (
                <TouchableOpacity
                  style={styles.cameraSelectButton}
                  onPress={() => {
                    setType(type === 'back' ? 'front' : 'back')
                  }}
                >
                  <Ionicons
                    name="camera-reverse-sharp"
                    style={styles.cameraSelectButtonIcon}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.recordButtonBed}
                onPress={async () => {
                  if (time === 1) return null
                  if (!recording) {
                    setRecording(true)
                    setRunTimer(true)
                    setTime(29)
                    await startRecording()
                  } else {
                    setRecording(false)
                    setRunTimer(false)
                    setTime(30)
                    stopRecording()
                  }
                }}
              >
                <View style={styles.recordButtonOuter}>
                  <View
                    style={
                      recording
                        ? styles.recordButtonInnerActive
                        : styles.recordButtonInner
                    }
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }

  const playbackAndUpload = () => {
    if (view === 'play') {
      return <VideoPlaybackUpload videoObject={videoObject} />
    }
  }

  const renderContent = () => {
    if (videoDemoShow) {
      return <VideoSample />
    }

    // Check permissions first
    const permissionCheck = runCameraPermissions()
    if (permissionCheck) {
      return permissionCheck
    }

    return (
      <>
        <InstructionModal bit="firstImpression" />
        {view === 'play' ? playbackAndUpload() : openCamera()}
      </>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  videoRecorderBed: {
    flex: 1,
  },
  cameraBed: {
    flex: 1,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  buttonsBed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 30,
  },
  cameraSelectButton: {
    alignSelf: 'flex-end',
  },
  cameraSelectButtonIcon: {
    color: '#ffff',
    fontSize: 40,
  },
  recordButtonBed: {
    alignSelf: 'center',
  },
  recordButtonOuter: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'red',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonInnerActive: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'red',
    height: 40,
    width: 40,
  },
  recordButtonInner: {
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#ffff',
    height: 40,
    width: 40,
  },
  timerBed: {
    display: 'flex',
    justifyContent: 'center',
  },
  timeText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '900',
    paddingBottom: 20,
  },
  recondDotOn: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 25,
    paddingBottom: 10,
  },
  recondDotOff: {
    color: '#0000',
    alignSelf: 'center',
    fontSize: 25,
    paddingBottom: 10,
  },
})

export default FirstImpressionCreateScreen
