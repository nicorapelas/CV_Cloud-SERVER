import React, { useContext } from 'react'
import { useKeyboard } from '@react-native-community/hooks'

import { Context as AdvertisementContext } from '../../context/AdvertisementContext'
import { Context as AuthContext } from '../../context/AuthContext'
import BannerAdStrip1 from './BannerAdStrip1'

const BannerAdStripRender = () => {
  const {
    state: { user },
  } = useContext(AuthContext)

  const {
    state: { bannerAdStripSelected, bannerAdStripShow, settingsLoaded },
  } = useContext(AdvertisementContext)

  const keyboard = useKeyboard()

  const renderContent = () => {
    // Don't show ads if user is premium tier
    if (user?.tier === 'premium') {
      return null
    }

    // Don't show if settings haven't loaded yet
    if (!settingsLoaded) {
      return null
    }

    // Don't show if keyboard is visible or globally disabled
    if (keyboard.keyboardShown || !bannerAdStripShow) {
      return null
    }

    switch (bannerAdStripSelected) {
      case 'bannerAdStrip1':
        return <BannerAdStrip1 />
      default:
        break
    }
  }

  return renderContent()
}

export default BannerAdStripRender
