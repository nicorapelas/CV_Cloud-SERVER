import React, { useContext, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'

const BurgerMenu = () => {
  const {
    state: { burgerMenuVisible },
    setBurgerMenuVisible,
    getLatestAppVersion,
  } = useContext(BurgerMenuContext)

  useEffect(() => {
    getLatestAppVersion()
  }, [])

  const handlePress = () => {
    setBurgerMenuVisible(!burgerMenuVisible)
  }

  const burgerMenuButton = () => {
    return (
      <TouchableOpacity style={styles.burgerMenuIconBed} onPress={handlePress}>
        <Entypo name="menu" style={styles.burgerMenuIcon} />
      </TouchableOpacity>
    )
  }

  return burgerMenuButton()
}

const styles = StyleSheet.create({
  burgerMenuIconBed: {
    height: 30,
    alignSelf: 'flex-end',
    flexDirection: 'column',
  },
  burgerMenuIcon: {
    color: Platform.OS === 'android' ? '#7ac6fa' : '#3ba7ee',
    fontSize: 33,
    alignSelf: 'flex-end',
    paddingRight: 7,
    paddingBottom: 2,
  },
})

export default BurgerMenu
