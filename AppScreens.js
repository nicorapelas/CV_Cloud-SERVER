import React, { useContext, useState, useEffect, useRef, useMemo } from 'react'
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native'

import { Context as NavContext } from './src/context/NavContext'
import { Context as AuthContext } from './src/context/AuthContext'
import { Context as UniversalContext } from './src/context/UniversalContext'
import { Context as AdvertisementContext } from './src/context/AdvertisementContext'

import RegisterOrLoginScreen from './src/components/screens/authScreens/RegisterOrLoginScreen'
import RegisterEmailScreen from './src/components/screens/authScreens/RegisterEmailScreen'
import LoginEmailScreen from './src/components/screens/authScreens/LoginEmailScreen'
import PasswordForgotScreen from './src/components/screens/authScreens/PasswordForgotScreen'
import MainScreen from './src/components/screens/mainScreens/MainScreen'

const { width } = Dimensions.get('window')

const AppScreens = () => {
  const {
    state: { screenSelected },
  } = useContext(NavContext)

  const {
    state: { token, user },
    tryLocalSignin,
    fetchUser,
  } = useContext(AuthContext)

  const { setUserPlatformOS } = useContext(UniversalContext)

  const { fetchSystemSettings } = useContext(AdvertisementContext)

  const [currentScreen, setCurrentScreen] = useState(screenSelected)
  const [nextScreen, setNextScreen] = useState(null)
  const [slideDirection, setSlideDirection] = useState('left')
  const animatedValue = useRef(new Animated.Value(0)).current
  const [fetchUserCount, setFetchUserCount] = useState(0)

  useEffect(() => {
    tryLocalSignin()
    setUserPlatformOS(Platform.OS)
  }, [])

  useEffect(() => {
    if (token && fetchUserCount < 1) {
      fetchUser()
      setFetchUserCount(fetchUserCount + 1)
    }
  }, [token, fetchUserCount, user])

  // Fetch system settings immediately when user is loaded
  useEffect(() => {
    if (user) {
      fetchSystemSettings()
    }
  }, [user])

  useEffect(() => {
    if (screenSelected !== currentScreen) {
      setSlideDirection(determineSlideDirection(screenSelected))
      setNextScreen(screenSelected)
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentScreen(screenSelected)
        setNextScreen(null)
        animatedValue.setValue(0)
      })
    }
  }, [screenSelected])

  const determineSlideDirection = (nextScreen) => {
    const screenOrder = [
      'registerOrLogin',
      'registerEmail',
      'loginEmail',
      'passwordForgot',
    ]
    const currentIndex = screenOrder.indexOf(currentScreen)
    const nextIndex = screenOrder.indexOf(nextScreen)
    return nextIndex > currentIndex ? 'left' : 'right'
  }

  const initialScreenSelector = (screen) => {
    switch (screen) {
      case 'registerOrLogin':
        return <RegisterOrLoginScreen />
      case 'registerEmail':
        return <RegisterEmailScreen />
      case 'loginEmail':
        return <LoginEmailScreen />
      case 'passwordForgot':
        return <PasswordForgotScreen />
      default:
        return null
    }
  }

  const authenticatedScreenSelector = (screen) => {
    switch (screen) {
      case 'main':
        return <MainScreen />
      // Add more cases for other authenticated screens
      default:
        return <MainScreen />
    }
  }

  const screenSelector = (screen) => {
    return token
      ? authenticatedScreenSelector(screen)
      : initialScreenSelector(screen)
  }

  const currentScreenStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, slideDirection === 'left' ? -width : width],
        }),
      },
    ],
  }

  const nextScreenStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [slideDirection === 'left' ? width : -width, 0],
        }),
      },
    ],
  }

  const memoizedCurrentScreen = useMemo(
    () => screenSelector(currentScreen),
    [currentScreen, token]
  )
  const memoizedNextScreen = useMemo(
    () => screenSelector(nextScreen),
    [nextScreen, token]
  )

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.screenContainer, currentScreenStyle]}
        pointerEvents="box-none"
      >
        {memoizedCurrentScreen}
      </Animated.View>
      {nextScreen && (
        <Animated.View
          style={[styles.screenContainer, nextScreenStyle]}
          pointerEvents="box-none"
        >
          {memoizedNextScreen}
        </Animated.View>
      )}
    </View>
  )
}

export default AppScreens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
    width,
  },
})
