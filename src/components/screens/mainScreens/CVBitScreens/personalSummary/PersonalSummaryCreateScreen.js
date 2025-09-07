import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as PersonalInfoContext } from '../../../../../context/PersonalInfoContext'
import PersonalSummaryCreateForm from '../cvBitForms/personalSummary/PersonalSummaryCreateForm'

const PersonalSummaryCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(PersonalInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <PersonalSummaryCreateForm />
  }

  return renderContent()
}

export default PersonalSummaryCreateScreen
