import React, { useContext } from 'react'
import SkillEditForm from '../cvBitForms/skill/SkillEditForm'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as skillContext } from '../../../../../context/SkillContext'

const SkillEditScreen = () => {
  const {
    state: { loading },
  } = useContext(skillContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <SkillEditForm />
  }

  return renderContent()
}

export default SkillEditScreen
