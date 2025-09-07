import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useKeyboard } from '@react-native-community/hooks'

import { Context as UniversalContext } from '../../../context/UniversalContext'
import DashboardNav from './DashboardNav'
import ViewCV from './ViewCV'
import ShareCV from './ShareCV'

const NavBar = () => {
  const {
    state: { imageToViewUrl },
  } = useContext(UniversalContext)

  const keyboard = useKeyboard()

  const renderContent = () => {
    if (keyboard.keyboardShown || imageToViewUrl) return null
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
  },
})

export default NavBar
