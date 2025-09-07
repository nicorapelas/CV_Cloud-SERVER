import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as TertEduContext } from '../../../../../context/TertEduContext'
import TertEduCreateForm from '../cvBitForms/tertEdu/TertEduCreateForm'

const TertEduCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(TertEduContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <TertEduCreateForm />
  }

  return renderContent()
}

export default TertEduCreateScreen
