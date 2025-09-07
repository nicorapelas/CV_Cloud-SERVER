import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as InterestContext } from '../../../../../context/InterestContext'
import InterestCreateForm from '../cvBitForms/interest/InterestCreateForm'

const InterestCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(InterestContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <InterestCreateForm bit="interest" />
  }

  return renderContent()
}

export default InterestCreateScreen
