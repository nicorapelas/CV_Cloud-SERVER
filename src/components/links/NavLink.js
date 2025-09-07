import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Context as NavContext } from '../../context/NavContext'
import { Context as AuthContext } from '../../context/AuthContext'
import Spacer from '../common/Spacer'

const NavLink = ({ text, routeName }) => {
  const { setScreenSelected } = useContext(NavContext)

  const { clearApiMessage, clearErrorMessage } = useContext(AuthContext)

  const handlePress = () => {
    clearApiMessage()
    clearErrorMessage()
    setScreenSelected(routeName)
  }

  return (
    <Spacer>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    </Spacer>
  )
}

const styles = StyleSheet.create({
  link: {
    color: '#278acd',
    width: '90%',
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
  },
})

export default NavLink
