import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import BitNoData from '../../../../common/BitNoData'
import VideoPlayerRetake from './video/VideoPlayerRetake'
import { Context as FirstImpressionContext } from '../../../../../context/FirstImpressionContext'

const FirstImpressionScreen = () => {
  const {
    state: { loading, firstImpression },
    fetchFirstImpression,
  } = useContext(FirstImpressionContext)

  useEffect(() => {
    fetchFirstImpression()
  }, [])

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#ededed" />
      </View>
    )
  }

  const renderContent = () => {
    if (loading) {
      return <View style={styles.statusBed}>{renderLoader()}</View>
    }
    if (!firstImpression || firstImpression.length < 1) {
      return (
        <BitNoData
          cvBit="First impression"
          routeName="firstImpressionCreate"
          buttonText="create video"
        />
      )
    }
    return <VideoPlayerRetake firstImpression={firstImpression} />
  }

  return <View style={styles.bed}>{renderContent()}</View>
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
  },
})

export default FirstImpressionScreen
