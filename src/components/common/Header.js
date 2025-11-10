import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import BurgerMenu from '../common/burgerMenu/BurgerMenu'
import NotificationBell from '../common/NotificationCenter/NotificationBell'
import NotificationModal from '../common/NotificationCenter/NotificationModal'
import logo from '../../../assets/images/logo_w300px.png'

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)

  const renderContent = () => {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} resizeMode="contain" />
          </View>
          <View style={styles.rightContainer}>
            <NotificationBell onPress={() => setShowNotifications(true)} />
            <BurgerMenu />
          </View>
        </View>
        <NotificationModal
          visible={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </>
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
})

export default Header
