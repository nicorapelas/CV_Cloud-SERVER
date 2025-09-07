import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as PersonalInfoContext } from '../../../../../context/PersonalInfoContext'
import PersonalInfoEditForm from '../cvBitForms/personalInfo/PersonalInfoEditForm'

const PersonalInfoEditScreen = () => {
  const {
    state: { loading },
  } = useContext(PersonalInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <PersonalInfoEditForm />
  }

  return renderContent()
}

export default PersonalInfoEditScreen
