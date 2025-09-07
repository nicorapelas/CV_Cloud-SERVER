import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import DashboardScreen from './dashboard/DashboardScreen'
import ViewCVScreen from './viewCV/ViewCVScreen'
import ShareCVScreen from './shareCVScreen/ShareCVScreen'
import InitDataFetch from '../../common/InitDataFetch'
import BannerAdRender from '../../../advertisements/bannerAdsStrip/BannerAdStripRender'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'

const MainViewRender = () => {
  const {
    state: { navTabSelected, CVBitScreenSelected },
  } = useContext(NavContext)

  const { setBurgerMenuVisible } = useContext(BurgerMenuContext)

  useEffect(() => {
    if (CVBitScreenSelected !== '') {
      setBurgerMenuVisible(false)
    }
  }, [CVBitScreenSelected])

  const renderContent = () => {
    switch (navTabSelected) {
      case 'dashboard':
        return <DashboardScreen />
      case 'viewCV':
        return <ViewCVScreen />
      case 'shareCV':
        return <ShareCVScreen />
      default:
        break
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>{renderContent()}</View>
      <View style={styles.bannerContainer}>
        <InitDataFetch />
        <BannerAdRender />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default MainViewRender
