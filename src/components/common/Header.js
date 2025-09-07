import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import BurgerMenu from '../common/burgerMenu/BurgerMenu'
import logo from '../../../assets/images/logo_w300px.png'

const Header = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} resizeMode="contain" />
        </View>
        <View style={styles.burgerMenuContainer}>
          <BurgerMenu />
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 150,
    height: 26,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  burgerMenuContainer: {
    justifyContent: 'flex-end',
    marginRight: 10,
  },
})

export default Header
