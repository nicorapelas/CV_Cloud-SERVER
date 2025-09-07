import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Context as NavContext } from '../../../context/NavContext'
import { normalize } from '../../../utils/fontUtils'

const ShareCV = () => {
  const {
    state: { navTabSelected },
    setNavTabSelected,
    setCVBitScreenSelected,
  } = useContext(NavContext)

  const handlePress = () => {
    setNavTabSelected('shareCV')
    setCVBitScreenSelected('')
  }

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text
          style={navTabSelected === 'shareCV' ? styles.textActive : styles.text}
        >
          Share CV
        </Text>
      </TouchableOpacity>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  text: {
    color: '#278ACD',
    textAlign: 'center',
    fontSize: normalize(13),
  },
  textActive: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: normalize(13),
  },
})

export default ShareCV
