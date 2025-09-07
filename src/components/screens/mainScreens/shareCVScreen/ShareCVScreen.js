import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import ShareCVForm from './ShareCVForm'

const ShareCVScreen = () => {
  const renderContent = () => {
    return (
      <View style={styles.bed}>
        <ShareCVForm />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
})

export default ShareCVScreen
