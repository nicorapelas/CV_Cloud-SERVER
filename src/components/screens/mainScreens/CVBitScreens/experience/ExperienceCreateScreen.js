import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as ExperienceContext } from '../../../../../context/ExperienceContext'
import ExperienceCreateForm from '../cvBitForms/experience/ExperienceCreateForm'

const ExperienceCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(ExperienceContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <ExperienceCreateForm />
  }

  return renderContent()
}

export default ExperienceCreateScreen
