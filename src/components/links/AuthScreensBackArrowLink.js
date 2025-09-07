import React, { useContext } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useKeyboard } from '@react-native-community/hooks'

import { Context as NavContext } from '../../context/NavContext'
import { Context as AuthContext } from '../../context/AuthContext'

const AuthScreensBackArrowLink = ({ routeName }) => {
  const { setScreenSelected } = useContext(NavContext)

  const { clearErrorMessage, clearApiMessage } = useContext(AuthContext)

  const keyboard = useKeyboard()

  const handlePress = () => {
    clearErrorMessage()
    clearApiMessage()
    setScreenSelected(routeName)
  }

  const renderContent = () => {
    if (keyboard.keyboardShown === true) return null
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <Feather style={styles.navArrow} name="arrow-left" />
        </TouchableOpacity>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '5%',
  },
  navArrow: {
    color: '#F9B321',
    fontSize: 30,
    paddingLeft: 15,
  },
})

export default AuthScreensBackArrowLink
