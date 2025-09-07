import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'
import { useKeyboard } from '@react-native-community/hooks'
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons'

import uuid from 'uuid/v4'
import LoaderFullScreen from '../../../../../common/LoaderFullScreen'
import FormHintModal from '../../../../../common/modals/FormHintModal'
import FormCancelButton from '../../../../../common/FormCancelButton'
import { Context as InterestContext } from '../../../../../../context/InterestContext'
import { Context as UniversalContext } from '../../../../../../context/UniversalContext'
import { Context as NavContext } from '../../../../../../context/NavContext'

const InterestCreateForm = ({ bit }) => {
  const [interest, setInterest] = useState(null)
  const [interestArray, setInterestArray] = useState([])

  const {
    state: { loading, error, interests },
    createInterest,
    clearInterestErrors,
  } = useContext(InterestContext)

  const {
    state: { tipSelected, userPlanformOS },
    tipSelectReset,
  } = useContext(UniversalContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    addIncomingInterests()
  }, [interests])

  useEffect(() => {
    addTipSelectedInterest()
  }, [tipSelected])

  const keyboard = useKeyboard()

  const addInterest = () => {
    if (!interest || !interest.replace(/\s/g, '').length) {
      return null
    } else {
      const queryUnique = interestArray.filter((int) => {
        return int.interest === interest
      })
      if (queryUnique.length !== 0) {
        return null
      } else {
        return setInterestArray([...interestArray, { interest, key: uuid() }])
      }
    }
  }

  const addIncomingInterests = () => {
    if (!interests || interests.length < 1) return null
    interests.map((int) => {
      setInterestArray((interestArray) => [
        ...interestArray,
        { interest: int.interest, key: uuid() },
      ])
    })
  }

  const addTipSelectedInterest = () => {
    if (!tipSelected) return null
    const queryUnique = interestArray.filter((int) => {
      return int.interest === interest
    })
    if (queryUnique.length !== 0) {
      return null
    } else {
      return setInterestArray([
        ...interestArray,
        { interest: tipSelected, key: uuid() },
      ])
    }
  }

  const removeArrayItem = (key) => {
    const newArray = interestArray.filter((int) => int.key !== key)
    setInterestArray(newArray)
  }

  const errorHeading = () => {
    if (!error) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const renderInterestArray = () => {
    if (!interestArray || interestArray.length < 1) return null
    return interestArray.map((int) => {
      return (
        <View style={styles.itemListBed} key={int.key}>
          <Text style={styles.itemList}>{int.interest}</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <MaterialCommunityIcons
              style={styles.deleteButtonIcon}
              name="delete"
              onPress={() => removeArrayItem(int.key)}
            />
          </TouchableOpacity>
        </View>
      )
    })
  }

  const handleSave = () => {
    createInterest(interestArray)
    tipSelectReset()
    setCVBitScreenSelected('interest')
  }

  const renderDoneSaveButton = () => {
    if (!interestArray || interestArray.length < 1) return null
    if (keyboard.keyboardShown) {
      return (
        <View style={styles.donePlusButtonBed}>
          <FormCancelButton route="interest" />
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              addInterest()
              setInterest(null)
              Keyboard.dismiss()
            }}
          >
            <AntDesign name="caretdown" style={styles.addButtonIcon} />
            <Text
              style={
                userPlanformOS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              done
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              addInterest()
              setInterest(null)
            }}
          >
            <AntDesign name="plus" style={styles.addButtonIcon} />
            <Text
              style={
                userPlanformOS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              add
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={handleSave}
        >
          <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
          <Text
            style={
              userPlanformOS === 'ios'
                ? styles.addButtonTextIos
                : styles.addButtonText
            }
          >
            save
          </Text>
        </TouchableOpacity>
      </>
    )
  }

  const renderForm = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <View style={styles.formBed}>
        <Text style={styles.inputHeading}>Interest</Text>
        <TextInput
          style={styles.input}
          maxLength={25}
          onSubmitEditing={() => {
            addInterest()
            setInterest(null)
          }}
          returnKeyLabel="add"
          blurOnSubmit={false}
          textAlign="center"
          placeholder="interest"
          value={interest}
          onChangeText={setInterest}
          onFocus={() => {
            tipSelectReset()
            clearInterestErrors()
          }}
          autoCorrect={true}
          autoFocus={!error ? true : false}
        />
        {!error ? (
          <Text style={styles.maxCharactersNote}>
            max 25 characters ({!interest ? '0' : interest.length}
            /25)
          </Text>
        ) : (
          <Text style={styles.error}>{error}</Text>
        )}
        {!interestArray || interestArray.length < 1 ? (
          <FormCancelButton route="interest" />
        ) : null}
        {renderDoneSaveButton()}
        <FormHintModal bit={bit} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={
        userPlanformOS === 'ios' && keyboard.keyboardShown === false
          ? styles.bedIos
          : styles.bedAndroid
      }
      behavior={userPlanformOS === 'ios' ? 'padding' : 'height'}
    >
      {errorHeading()}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="always"
      >
        {renderInterestArray()}
        {renderForm()}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  bedIos: {
    backgroundColor: '#232936',
    width: '100%',
    flex: 1,
    marginTop: -100,
  },
  bedAndroid: {
    backgroundColor: '#232936',
    width: '100%',
    flex: 1,
  },
  formBed: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  inputHeading: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  donePlusButtonBed: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    margin: 5,
    height: 40,
  },

  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonTextIos: {
    color: '#ffff',
    fontSize: 18,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 4,
  },
  errorHeadingBed: {
    backgroundColor: '#ffcfd8',
    borderColor: '#ff0033',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    width: '85%',
    marginVertical: 10,
  },
  errorHeadingText: {
    color: '#ff0033',
    padding: 10,
    alignSelf: 'center',
  },
  error: {
    color: '#ff0033',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 20,
  },
  itemListBed: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    alignSelf: 'center',
    borderRadius: 25,
    padding: 3,
    marginVertical: 2,
  },
  itemList: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7,
  },
  deleteButton: {
    backgroundColor: '#f56c6c',
    borderRadius: 25,
  },
  deleteButtonIcon: {
    color: '#ffff',
    fontSize: 20,
    padding: 7,
  },
})

export default InterestCreateForm
