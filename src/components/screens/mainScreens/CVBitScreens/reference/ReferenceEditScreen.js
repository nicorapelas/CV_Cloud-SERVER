import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as ReferenceContext } from '../../../../../context/ReferenceContext'
import ReferenceEditForm from '../cvBitForms/reference/ReferenceEditForm'

const ReferenceEditScreen = () => {
  const {
    state: { loading },
  } = useContext(ReferenceContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <ReferenceEditForm />
  }

  return renderContent()
}

export default ReferenceEditScreen
