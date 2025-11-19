import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useKeyboard } from '@react-native-community/hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Context as UniversalContext } from '../../../context/UniversalContext'
import DashboardNav from './DashboardNav'
import ViewCV from './ViewCV'
import ShareCV from './ShareCV'

const NavBar = ({ videoUploading = false, isRecording = false }) => {
  const {
    state: { imageToViewUrl },
  } = useContext(UniversalContext)

  const keyboard = useKeyboard()
  const insets = useSafeAreaInsets()

  const renderContent = () => {
    // Hide navbar during: keyboard, image viewing, video recording, or video uploading
    if (
      keyboard.keyboardShown ||
      imageToViewUrl ||
      videoUploading ||
      isRecording
    )
      return null
    return (
      <View style={styles.container}>
        <DashboardNav />
        <ViewCV />
        <ShareCV />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#5e5e5e',
    backgroundColor: '#232936',
    paddingTop: 5,
  },
})

export default NavBar
