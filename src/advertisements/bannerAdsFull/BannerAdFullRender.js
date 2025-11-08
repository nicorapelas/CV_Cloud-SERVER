import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'

import { Context as AdvertisementContext } from '../../context/AdvertisementContext'
import { Context as AuthContext } from '../../context/AuthContext'
import BannerAdFull1 from '../bannerAdsFull/BannerAdFull1'

const BannerAdFullRender = () => {
  const {
    state: { user },
  } = useContext(AuthContext)

  const {
    state: { bannerAdFullSelected, bannerAdFullShow, settingsLoaded },
  } = useContext(AdvertisementContext)

  const renderContent = () => {
    // Don't show ads if user is premium tier
    if (user?.tier === 'premium') {
      return null
    }

    // Don't show if settings haven't loaded yet
    if (!settingsLoaded) {
      return null
    }

    // Don't show if globally disabled
    if (!bannerAdFullShow) {
      return null
    }

    switch (bannerAdFullSelected) {
      case 'bannerAdFull1':
        return <BannerAdFull1 />
      default:
        break
    }
  }

  return renderContent()
}

export default BannerAdFullRender
