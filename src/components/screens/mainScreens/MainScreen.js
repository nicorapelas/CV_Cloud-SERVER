import React, { useState, useContext, useEffect } from 'react'
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

const Main = () => {
  const [showHeader, setShowHeader] = useState(true)

  const {
    state: { user },
    signout,
  } = useContext(AuthContext)

  const {
    state: { InfoToShow },
    setInfoToShow,
  } = useContext(BurgerMenuContext)

  const {
    state: { bannerAdFullShow },
    setBannerAdFullShow,
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

  useEffect(() => {
    if (bannerAdFullShow) {
      const timer = setTimeout(() => {
        setBannerAdFullShow(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [bannerAdFullShow])

  useEffect(() => {
    console.log(`CVBitScreenSelected:`, CVBitScreenSelected)
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
    if (bannerAdFullShow) return <BannerAdFullRender />
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
