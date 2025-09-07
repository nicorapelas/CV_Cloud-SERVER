import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as LanguageContext } from '../../../../../context/LanguageContext'
import LanguageCreateForm from '../cvBitForms/language/LanguageCreateForm'

const LanguageCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(LanguageContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <LanguageCreateForm />
  }

  return renderContent()
}

export default LanguageCreateScreen
