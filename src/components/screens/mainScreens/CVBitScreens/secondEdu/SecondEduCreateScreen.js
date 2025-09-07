import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as SecondEduContext } from '../../../../../context/SecondEduContext'
import SecondEduCreateForm from '../cvBitForms/secondEdu/SecondEduCreateForm'

const SecondEduCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(SecondEduContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <SecondEduCreateForm />
  }

  return renderContent()
}

export default SecondEduCreateScreen
