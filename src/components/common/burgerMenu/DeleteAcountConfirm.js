import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'

const DeleteAccountConfirm = () => {
  const [showDeleteLoader, setShowDeleteLoader] = useState(false)

  const { setBurgerMenuVisible, setInfoToShow } = useContext(BurgerMenuContext)

  const {
    state: { apiMessage },
    deleteAccount,
    signout,
  } = useContext(AuthContext)

  useEffect(() => {
    if (apiMessage) {
      if (apiMessage.success === 'User successfully deleted') {
        setTimeout(() => {
          setInfoToShow('')
          setBurgerMenuVisible(false)
          signout()
        }, 3500)
      }
    }
  }, [apiMessage])

  const handlePressCancel = () => {
    setInfoToShow('')
  }

  const deleteLoader = () => {
    return (
      <View style={styles.deleteLoaderBed}>
        <Text style={styles.deleteText}>
          {!apiMessage ? 'Deletion in progress' : apiMessage.success}
        </Text>
        {!apiMessage ? (
          <ActivityIndicator
            size="small"
            color="#ededed"
            style={styles.spinner}
          />
        ) : null}
      </View>
    )
  }

  const renderMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageHeading}>Delete account</Text>
        <Text style={styles.messageText}>
          Deleting your account is irreversible and all your CV Cloud data will
          be lost!
        </Text>
        <Text style={styles.messageText}>
          Are you sure you want to delete your account?
        </Text>
        <TouchableOpacity
          style={styles.messageSignOutButton}
          onPress={() => {
            setShowDeleteLoader(true)
            deleteAccount()
          }}
        >
          <Text style={styles.messageSignOutButtonText}>yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBackButton}
          onPress={handlePressCancel}
        >
          <AntDesign name="closecircle" style={styles.messageBackButtonIcon} />
          <Text style={styles.messageBackButtonText}>cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (showDeleteLoader) return deleteLoader()
    return renderMessage()
  }

  return <View style={styles.container}>{renderContent()}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  messageContainer: {
    backgroundColor: '#232936',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  messageHeading: {
    color: '#ff0000',
    fontSize: 20,
    alignSelf: 'center',
    paddingBottom: 5,
  },
  messageText: {
    color: '#ffff',
    textAlign: 'center',
  },
  messageSignOutButton: {
    backgroundColor: '#ff0000',
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
  deleteLoaderBed: {
    backgroundColor: '#232936',
    borderRadius: 10,
    borderColor: '#ff0000',
    borderWidth: 1,
    width: '75%',
    padding: 15,
    alignSelf: 'center',
  },
  deleteText: {
    alignSelf: 'center',
    color: '#ffff',
    fontSize: 16,
  },
  spinner: {
    paddingTop: 15,
  },
})

export default DeleteAccountConfirm
