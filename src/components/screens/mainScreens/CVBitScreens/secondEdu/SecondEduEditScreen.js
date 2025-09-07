import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as SecondEduContext } from '../../../../../context/SecondEduContext'
import SecondEduEditForm from '../cvBitForms/secondEdu/SecondEduEditForm'

const SecondEduEditScreen = () => {
  const {
    state: { loading },
  } = useContext(SecondEduContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <SecondEduEditForm />
  }

  return renderContent()
}

export default SecondEduEditScreen
