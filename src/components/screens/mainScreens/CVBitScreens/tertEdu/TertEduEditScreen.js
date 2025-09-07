import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as TertEduContext } from '../../../../../context/TertEduContext'
import TertEduEditForm from '../cvBitForms/tertEdu/TertEduEditForm'

const TertEduEditScreen = () => {
  const {
    state: { loading },
  } = useContext(TertEduContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <TertEduEditForm />
  }

  return renderContent()
}

export default TertEduEditScreen
