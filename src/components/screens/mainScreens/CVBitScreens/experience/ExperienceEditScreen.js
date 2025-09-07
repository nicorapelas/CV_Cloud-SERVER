import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as ExperienceContext } from '../../../../../context/ExperienceContext'
import ExperienceEditForm from '../cvBitForms/experience/ExperienceEditForm'

const ExperienceEditScreen = () => {
  const {
    state: { loading },
  } = useContext(ExperienceContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <ExperienceEditForm />
  }

  return renderContent()
}

export default ExperienceEditScreen
