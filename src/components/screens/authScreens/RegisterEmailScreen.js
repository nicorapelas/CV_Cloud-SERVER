import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useKeyboard } from '@react-native-community/hooks'

import AuthScreensBackArrowLink from '../../links/AuthScreensBackArrowLink'
import NavLink from '../../links/NavLink'
import LoaderFullScreen from '../../common/LoaderFullScreen'
import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import ModalLink from '../../links/ModalLink'
import validateEmailInput from '../../../utils/validation/email'
import logo from '../../../../assets/images/logo-w400.png'

const RegisterEmailScreen = () => {
  const {
    state: { loading, errorMessage, apiMessage, introAffiliateCode },
    register,
    clearErrorMessage,
  } = useContext(AuthContext)

  const {
    state: { userPlanformOS },
  } = useContext(UniversalContext)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSubmitButton, setShowSubmitButton] = useState(false)

  useEffect(() => {
    const { isValid } = validateEmailInput(email)
    let check = 0
    if (fullName.length > 4) check = check + 1
    if (isValid) check = check + 1
    if (password.length > 5) check = check + 1
    if (password === password2) check = check + 1
    if (check === 4) setShowSubmitButton(true)
  }, [fullName, email, password, password2])

  const keyboard = useKeyboard()

  const validateEmail = () => {
    const { errors, isValid } = validateEmailInput(email)
    if (!isValid) {
      return <Text style={styles.validateText}>{errors.email}</Text>
    }
    return <AntDesign style={styles.checkedIcon} name="checkcircle" />
  }

  const validatePassword = () => {
    if (password.length < 6) {
      return (
        <Text style={styles.validateText}>
          Password must be 6 or more characters
        </Text>
      )
    }
    if (password !== password2 || password.length < 1) {
      return <Text style={styles.validateText}>Passwords must match</Text>
    }
    return <AntDesign style={styles.checkedIcon} name="checkcircle" />
  }

  const validateName = () => {
    if (fullName.length < 6) {
      return <Text style={styles.validateText}>'Full Name' is required</Text>
    }
    if (fullName.length > 5) {
      return <AntDesign style={styles.checkedIcon} name="checkcircle" />
    }
  }

  const renderErrorMessage = () => {
    if (!errorMessage) return null
    const { email, password, password2 } = errorMessage
    return (
      <View style={styles.errorMessageBed}>
        {!email ? null : <Text style={styles.errorText}>{email}</Text>}
        {!password ? null : <Text style={styles.errorText}>{password}</Text>}
        {!password2 ? null : <Text style={styles.errorText}>{password2}</Text>}
      </View>
    )
  }

  const renderSuccessMessage = () => {
    if (!apiMessage) return null
    const { success } = apiMessage
    return (
      <ModalLink buttonText="OK" message={success} routeName="loginEmail" />
    )
  }

  const formHeader = () => {
    if (keyboard.keyboardShown) {
      return (
        <Image style={styles.logoSmall} source={logo} resizeMode="contain" />
      )
    }
    return (
      <>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text
          style={
            userPlanformOS === 'ios' ? styles.headingIos : styles.headingAndroid
          }
        >
          Sign up with your email
        </Text>
      </>
    )
  }

  const renderForm = () => {
    return (
      <View style={styles.container}>
        {renderSuccessMessage()}
        {formHeader()}
        <View style={styles.formInputs}>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={clearErrorMessage}
          />
          <View style={styles.validateContainer}>{validateName()}</View>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            textAlign="center"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={clearErrorMessage}
          />
          {renderErrorMessage()}
          <View style={styles.validateContainer}>{validateEmail()}</View>
          <View style={styles.passwordInputBed}>
            <TextInput
              style={styles.passwordInput}
              textAlign="center"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={clearErrorMessage}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButtonBed}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                style={styles.eyeButtonIcon}
                name={showPassword ? 'eye' : 'eye-off'}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={password2}
            onChangeText={setPassword2}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={clearErrorMessage}
            secureTextEntry={!showPassword}
          />
        </View>
        <View style={styles.validateContainer}>{validatePassword()}</View>
        {!showSubmitButton ? null : (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              register({
                fullName,
                email,
                password,
                password2,
                introAffiliateCode,
              })
            }
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        <View style={styles.navLinkContainer}>
          <View style={styles.navLink}>
            <NavLink
              routeName="loginEmail"
              text="Already have an account? Login here."
            />
          </View>
        </View>
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <KeyboardAvoidingView
        style={
          userPlanformOS === 'ios' && keyboard.keyboardShown === false
            ? styles.bedIos
            : styles.bedAndroid
        }
        behavior={userPlanformOS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="always"
        >
          <AuthScreensBackArrowLink routeName="registerOrLogin" />
          {renderForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  return renderContent()
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
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formInputs: {
    alignItems: 'center',
  },
  validateContainer: {
    marginBottom: 10,
  },
  validateText: {
    color: '#F9B321',
    textAlign: 'center',
  },
  checkedIcon: {
    color: '#25bf02',
    fontSize: 17,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffff',
    height: 50,
    width: '80%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  logo: {
    width: 200,
    alignSelf: 'center',
  },
  logoSmall: {
    width: 100,
    height: 34,
    marginLeft: '10%',
  },
  headingIos: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '100',
    marginBottom: 10,
  },
  headingAndroid: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'sourceSansProLight',
  },
  errorMessageBed: {
    backgroundColor: 'red',
    borderRadius: 7,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 5,
  },
  errorText: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#278acd',
    width: '65%',
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffff',
    paddingVertical: 10,
  },
  passwordInputBed: {
    flexDirection: 'row',
    width: '80%',
  },
  passwordInput: {
    backgroundColor: '#ffff',
    height: 50,
    textAlign: 'center',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    marginVertical: 5,
    flex: 3,
  },
  eyeButtonBed: {
    backgroundColor: '#555555',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  eyeButtonIcon: {
    color: '#ffff',
    fontSize: 27,
    alignSelf: 'center',
  },
  navLinkContainer: {
    marginTop: 20,
  },
  navLink: {
    alignSelf: 'center',
    width: '100%'
  },
})

export default RegisterEmailScreen
