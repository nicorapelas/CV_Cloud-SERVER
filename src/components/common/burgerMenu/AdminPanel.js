import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'

const AdminPanel = () => {
  const { setInfoToShow } = useContext(BurgerMenuContext)

  const {
    state: { user },
  } = useContext(AuthContext)

  // Only show if user is admin
  if (!user?.isAdmin) {
    return null
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setInfoToShow('adminPanel')}
    >
      <MaterialIcons name="admin-panel-settings" style={styles.icon} />
      <Text style={styles.text}>Admin Panel</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffc107',
    borderRadius: 7,
    width: '85%',
    alignSelf: 'center',
    marginVertical: 3,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  icon: {
    color: '#000',
    fontSize: 18,
    marginRight: 8,
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
})

export default AdminPanel
