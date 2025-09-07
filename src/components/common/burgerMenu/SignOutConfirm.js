import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'

const SignOutConfirm = () => {
  const { setBurgerMenuVisible, setInfoToShow } = useContext(BurgerMenuContext)

  const { signout } = useContext(AuthContext)

  const handleSignOutPress = () => {
    setInfoToShow('')
    setBurgerMenuVisible(false)
    signout()
  }

  const handleBackPress = () => {
    setInfoToShow('')
  }

  const renderMessage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.messageHeading}>Sign out</Text>
        <Text style={styles.messageText}>
          Are you sure you would like to sign out?
        </Text>
        <TouchableOpacity
          style={styles.messageSignOutButton}
          onPress={handleSignOutPress}
        >
          <Text style={styles.messageSignOutButtonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBackButton}
          onPress={handleBackPress}
        >
          <AntDesign name="closecircle" style={styles.messageBackButtonIcon} />
          <Text style={styles.messageBackButtonText}>back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return renderMessage()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
  },
  messageHeading: {
    color: '#7ac6fa',
    fontSize: 20,
    alignSelf: 'center',
    paddingBottom: 5,
  },
  messageText: {
    color: '#7ac6fa',
    textAlign: 'center',
  },
  messageSignOutButton: {
    backgroundColor: '#278acd',
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 20,
  },
  messageSignOutButtonText: {
    color: '#ffff',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  messageBackButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  messageBackButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    fontSize: 18,
  },
  messageBackButtonText: {
    color: '#F9B321',
    fontSize: 16,
  },

  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
})

export default SignOutConfirm
