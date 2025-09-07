import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'

import { Context as AdvertisementContext } from '../../context/AdvertisementContext'
import BannerAdd1 from './BannerAdd1'

const BannerAddRender = () => {
  const {
    state: { bannerAddSelected },
  } = useContext(AdvertisementContext)

  const renderContent = () => {
    switch (bannerAddSelected) {
      case 'bannerAdd1':
        return <BannerAdd1 />
      default:
        break
    }
  }

  return renderContent()
}

export default BannerAddRender
