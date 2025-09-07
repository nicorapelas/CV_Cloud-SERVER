import React, { useContext } from 'react'
import { useKeyboard } from '@react-native-community/hooks'

import { Context as AdvertisementContext } from '../../context/AdvertisementContext'
import BannerAdStrip1 from './BannerAdStrip1'

const BannerAdStripRender = () => {
  const {
    state: { bannerAdStripSelected, bannerAdStripShow },
  } = useContext(AdvertisementContext)

  const keyboard = useKeyboard()

  const renderContent = () => {
    if (keyboard.keyboardShown || !bannerAdStripShow) {
      return null
    } else {
      switch (bannerAdStripSelected) {
        case 'bannerAdStrip1':
          return <BannerAdStrip1 />
        default:
          break
      }
    }
  }

  return renderContent()
}

export default BannerAdStripRender
