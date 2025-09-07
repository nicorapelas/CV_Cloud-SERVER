import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'

import { Context as AdvertisementContext } from '../../context/AdvertisementContext'
import BannerAdFull1 from '../bannerAdsFull/BannerAdFull1'

const BannerAdFullRender = () => {
  const {
    state: { bannerAdFullSelected },
  } = useContext(AdvertisementContext)

  const renderContent = () => {
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
