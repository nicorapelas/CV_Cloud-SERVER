import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as NavContext } from '../../context/NavContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const ModalLink = ({ message, routeName, buttonText }) => {
  const { clearErrorMessage, clearApiMessage } = useContext(AuthContext)

  const { setScreenSelected } = useContext(NavContext)

  const {
    state: { userPlanformOS },
  } = useContext(UniversalContext)

  const visible = !!message

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        clearErrorMessage()
        clearApiMessage()
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.overlay}>
          <View style={styles.messageBed}>
            <Text
              style={
                userPlanformOS === 'ios'
                  ? styles.messageTextIos
                  : styles.messageTextAndroid
              }
            >
              {message}
            </Text>
            <TouchableOpacity
              onPress={() => {
                clearErrorMessage()
                clearApiMessage()
                setScreenSelected('loginEmail')
              }}
            >
              <Text style={styles.button}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '90%',
    borderRadius: 7,
  },
  messageBed: {
    alignItems: 'center',
    padding: 20,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  button: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#59BB46',
    marginTop: 20,
  },
})

export default ModalLink
