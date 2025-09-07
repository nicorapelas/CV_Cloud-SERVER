import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as SkillContext } from '../../../../../context/SkillContext'
import SkillCreateForm from '../cvBitForms/skill/SkillCreateForm'

const SkillCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(SkillContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <SkillCreateForm />
  }

  return renderContent()
}

export default SkillCreateScreen
