import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import LoaderModal from '../../common/LoaderModal'

const EmailVerificationModal = ({
  message,
  email,
  buttonOneText,
  buttonTwoText,
}) => {
  const visible = !!message

  const {
    state: { loading },
    resendVerificationEmail,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)

  const {
    state: { userPlanformOS },
  } = useContext(UniversalContext)

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        clearApiMessage()
        clearErrorMessage()
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.overlay}>
          <LoaderModal loading={loading} />
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
              clearApiMessage()
              clearErrorMessage()
            }}
          >
            <Text style={styles.button}>{buttonOneText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => resendVerificationEmail({ email })}>
            <Text style={styles.resendLink}>{buttonTwoText}</Text>
          </TouchableOpacity>
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
    width: '80%',
    borderRadius: 7,
    padding: 20,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 25,
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
    marginVertical: 10,
  },
  resendLink: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#288acd',
  },
})

export default EmailVerificationModal
