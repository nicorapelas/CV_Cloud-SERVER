import React, { useContext, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'

const DeleteAccount = () => {
  const { setBurgerMenuVisible, setInfoToShow } = useContext(BurgerMenuContext)

  const {
    state: { apiMessage },
    signout,
  } = useContext(AuthContext)

  useEffect(() => {
    if (apiMessage) {
      if (apiMessage.success === 'User successfully deleted') {
        setTimeout(() => {
          setBurgerMenuVisible(false)
          setInfoToShow('')
          signout()
        }, 3500)
      }
    }
  }, [apiMessage])

  const handlePress = () => {
    setInfoToShow('deleteAccount')
  }

  const button = () => {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.buttonText}>Delete my account</Text>
      </TouchableOpacity>
    )
  }

  return button()
}

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: '#278ACD',
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginBottom: 5,
  },
})

export default DeleteAccount
