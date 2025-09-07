import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../../context/AuthContext'
import { Context as ConfigContext } from '../../../../context/ConfigContext'
import ManageAffiliate from './ManageAffiliate'
import UsersInfo from './UsersInfo'
import AppVersion from '../AppVersion'

const Managment = () => {
  const [pin, setPin] = useState(null)
  const [affiliateFormType, setAffiliateFormType] = useState(null)
  const [userPin, setUserPin] = useState(null)

  const {
    state: { managmentMenuVisible },
    setManagmentMenuVisible,
    setInfoToShow,
  } = useContext(BurgerMenuContext)

  const {
    state: { loading, configData },
    fetchConfigInfo,
  } = useContext(ConfigContext)

  const {
    clearApiMessage,
    clearErrorMessage,
    clearAffiliateInfo,
    clearAffiliates,
  } = useContext(AuthContext)

  useEffect(() => {
    fetchConfigInfo({ info: 'tdData' })
  }, [])

  useEffect(() => {
    if (configData) {
      setUserPin(configData.pin)
    }
  }, [configData])

  const pinInput = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setInfoToShow('')}
        >
          <AntDesign name="closecircle" style={styles.backButtonIcon} />
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          secureTextEntry={true}
          textAlign="center"
          placeholder="pin"
          value={pin}
          onChangeText={setPin}
          autoCorrect={false}
        />
        <AppVersion />
      </>
    )
  }

  const renderMenu = () => {
    if (pin !== userPin) return pinInput()
    return (
      <View style={styles.bed}>
        <Text style={styles.heading}>Managment</Text>
        {affiliateFormType !== null ? null : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAffiliateFormType('createAffiliate')}
            >
              <Text style={styles.buttonText}>Create affiliate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAffiliateFormType('viewAffiliateInfo')}
            >
              <Text style={styles.buttonText}>View affiliate info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAffiliateFormType('viewAffiliates')}
            >
              <Text style={styles.buttonText}>View affiliates</Text>
            </TouchableOpacity>
          </>
        )}
        <ManageAffiliate affiliateFormType={affiliateFormType} />
        <UsersInfo />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setInfoToShow('')
            setManagmentMenuVisible(false)
            setPin(null)
            setAffiliateFormType(null)
            clearApiMessage()
            clearErrorMessage()
            clearAffiliateInfo()
            clearAffiliates()
          }}
        >
          <AntDesign name="closecircle" style={styles.backButtonIcon} />
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return null
    return <View style={styles.container}>{renderMenu()}</View>
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bed: {
    backgroundColor: '#232936',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    color: '#7ac6fa',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: '100',
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    fontSize: 16,
    paddingTop: 3,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
    padding: 7,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffff',
    width: '80%',
    borderRadius: 5,
    height: 40,
    alignSelf: 'center',
    marginVertical: 20,
  },
})

export default Managment
