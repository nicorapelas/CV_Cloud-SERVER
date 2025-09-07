import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as PersonalSummaryContext } from '../../../../../context/PersonalSummaryContext'
import PersonalSummaryEditForm from '../cvBitForms/AttributeInterestPersonalSummaryEditForm'

const PersonalSummaryEditScreen = () => {
  const {
    state: { loading },
  } = useContext(PersonalSummaryContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <PersonalSummaryEditForm bit="personalSummary" />
  }

  return renderContent()
}

export default PersonalSummaryEditScreen
