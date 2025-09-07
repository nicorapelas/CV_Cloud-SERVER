import React, { useState, useContext, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as BurgerMenuContext } from '../../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../../context/AuthContext'
import { Context as ConfigContext } from '../../../../context/ConfigContext'

const Managment = () => {
  const [userId, setUserId] = useState(null)

  const { setManagmentMenuVisible, setInfoToShow } =
    useContext(BurgerMenuContext)

  const {
    state: { configData },
    fetchConfigInfo,
  } = useContext(ConfigContext)

  const {
    state: { user },
  } = useContext(AuthContext)

  useEffect(() => {
    fetchConfigInfo({ info: 'tdData' })
  }, [])

  useEffect(() => {
    if (configData) {
      setUserId(configData.id)
    }
  }, [configData])

  const handlePress = () => {
    setInfoToShow('managment')
  }

  // const renderButton = () => {
  //   if (configData.length < 1) return null
  //   if (!user) return null
  //   const { _id } = user
  //   if (_id !== userId) return null
  //   return (
  //     <TouchableOpacity onPress={handlePress}>
  //       <Text style={styles.buttonText}>Managment</Text>
  //     </TouchableOpacity>
  //   )
  // }

  // return renderButton()

  return null
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

export default Managment
