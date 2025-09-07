import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'

const TermsAndConditionsBurgerButton = () => {
  const { setInfoToShow } = useContext(BurgerMenuContext)

  const handlePress = () => {
    setInfoToShow('terms')
  }

  const button = () => {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.buttonText}>Terms & Conditions</Text>
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
    marginBottom: 5,
  },
})

export default TermsAndConditionsBurgerButton
