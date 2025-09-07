import React, { useContext } from 'react'
import InterestEditForm from '../cvBitForms/AttributeInterestPersonalSummaryEditForm'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as InterestContext } from '../../../../../context/InterestContext'

const InterestEditScreen = () => {
  const {
    state: { loading },
  } = useContext(InterestContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <InterestEditForm bit="interest" />
  }

  return renderContent()
}

export default InterestEditScreen
