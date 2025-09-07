import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as PersonalInfoContext } from '../../../../../context/PersonalInfoContext'
import PersonalInfoCreateForm from '../cvBitForms/personalInfo/PersonalInfoCreateForm'

const PersonalInfoCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(PersonalInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <PersonalInfoCreateForm />
  }

  return renderContent()
}

export default PersonalInfoCreateScreen
