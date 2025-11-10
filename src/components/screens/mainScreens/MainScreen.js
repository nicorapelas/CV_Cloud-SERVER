import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import InfoFullscreenRender from '../../common/InfoFullscreenRender'
import Header from '../../common/Header'
import HeaderCVBit from '../../common/HeaderCVBit'
import NavBar from '../../common/navbar/NavBar'
import Menu from '../../common/menu/Menu'
import BannerAdFullRender from '../../../advertisements/bannerAdsFull/BannerAdFullRender'
import LoaderFullScreen from '../../common/LoaderFullScreen'
import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as AdvertisementContext } from '../../../context/AdvertisementContext'
import { Context as NavContext } from '../../../context/NavContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import { Context as FirstImpressionContext } from '../../../context/FirstImpressionContext'
import { useNotifications } from '../../../context/NotificationContext'

const Main = () => {
  const [showHeader, setShowHeader] = useState(true)
  const [showFullAdPopup, setShowFullAdPopup] = useState(false)
  const adTimerRef = useRef(null)

  const {
    state: { user },
    signout,
  } = useContext(AuthContext)

  const {
    state: { InfoToShow },
    setInfoToShow,
  } = useContext(BurgerMenuContext)

  const {
    state: { bannerAdFullShow, settingsLoaded },
  } = useContext(AdvertisementContext)

  const {
    state: { navTabSelected, CVBitScreenSelected },
  } = useContext(NavContext)

  const {
    state: { imageToViewUrl },
  } = useContext(UniversalContext)

  const {
    state: { firstImpression, videoUploading },
  } = useContext(FirstImpressionContext)

  const { fetchNotifications } = useNotifications()

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        signout()
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      const { termsAndConditionsAccepted } = user
      if (!termsAndConditionsAccepted) {
        setInfoToShow('initTerms')
      }
    }
  }, [user])

  // Fetch notifications when user logs in
  useEffect(() => {
    if (user) {
      console.log('📱 Fetching notifications for user...')
      fetchNotifications()
    }
  }, [user])

  // Show full ad popup ONCE when settings load and it's enabled
  useEffect(() => {
    if (
      settingsLoaded &&
      bannerAdFullShow &&
      user?.tier !== 'premium' &&
      !adTimerRef.current // Only if timer hasn't been set
    ) {
      setShowFullAdPopup(true)

      adTimerRef.current = setTimeout(() => {
        setShowFullAdPopup(false)
        adTimerRef.current = null
      }, 5000)
    }

    // Cleanup on unmount
    return () => {
      if (adTimerRef.current) {
        clearTimeout(adTimerRef.current)
        adTimerRef.current = null
      }
    }
  }, [settingsLoaded, bannerAdFullShow, user?.tier])

  useEffect(() => {
    if (
      CVBitScreenSelected === 'attributeCreate' ||
      CVBitScreenSelected === 'attributeEdit' ||
      CVBitScreenSelected === 'interestCreate' ||
      CVBitScreenSelected === 'interestEdit' ||
      CVBitScreenSelected === 'skillCreate' ||
      CVBitScreenSelected === 'skillEdit' ||
      CVBitScreenSelected === 'languageCreate' ||
      CVBitScreenSelected === 'languageEdit' ||
      CVBitScreenSelected === 'personalInfoCreate' ||
      CVBitScreenSelected === 'personalInfoEdit' ||
      CVBitScreenSelected === 'personalSummaryCreate' ||
      CVBitScreenSelected === 'personalSummaryEdit' ||
      CVBitScreenSelected === 'contactInfoCreate' ||
      CVBitScreenSelected === 'contactInfoEdit' ||
      CVBitScreenSelected === 'secondEduCreate' ||
      CVBitScreenSelected === 'secondEduEdit' ||
      CVBitScreenSelected === 'tertEduCreate' ||
      CVBitScreenSelected === 'tertEduEdit' ||
      CVBitScreenSelected === 'employHistoryCreate' ||
      CVBitScreenSelected === 'employHistoryEdit' ||
      CVBitScreenSelected === 'experienceCreate' ||
      CVBitScreenSelected === 'experienceEdit' ||
      CVBitScreenSelected === 'referenceCreate' ||
      CVBitScreenSelected === 'referenceEdit' ||
      CVBitScreenSelected === 'photoCreate' ||
      CVBitScreenSelected === 'photoEdit' ||
      CVBitScreenSelected === 'certificatePhotoUpload' ||
      CVBitScreenSelected === 'certificatePdfUpload' ||
      CVBitScreenSelected === 'certificateCreate' ||
      CVBitScreenSelected === 'certificateEdit' ||
      navTabSelected === 'viewCV' ||
      imageToViewUrl ||
      videoUploading
    ) {
      setShowHeader(false)
    } else {
      setShowHeader(true)
    }
  }, [
    CVBitScreenSelected,
    navTabSelected,
    imageToViewUrl,
    videoUploading,
    firstImpression,
  ])

  const renderHeader = () => {
    if (!showHeader) return null
    if (CVBitScreenSelected === '') {
      if (navTabSelected !== 'viewCV') {
        return <Header />
      }
    }
    return <HeaderCVBit />
  }

  const renderContent = () => {
    if (!user) return <LoaderFullScreen />
    // Show full banner ad popup (separate from database setting)
    if (showFullAdPopup) return <BannerAdFullRender />
    if (InfoToShow !== '') return <InfoFullscreenRender />
    return (
      <View style={styles.container}>
        <View
          style={
            showHeader ? styles.headerContainer : styles.headerContainerMinimal
          }
        >
          {renderHeader()}
        </View>
        <View style={styles.mainViewContainer}>
          {/* MainView content is nested in Menu */}
          <Menu />
        </View>
        <View style={styles.navBarContainer}>
          <NavBar />
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 40,
  },
  headerContainerMinimal: {
    flex: Platform.OS === 'ios' ? 2 : 4,
  },
  headerContainer: {
    flex: 4,
  },
  mainViewContainer: {
    flex: 32,
  },
  navBarContainer: {
    flex: 4,
  },
})

export default Main
