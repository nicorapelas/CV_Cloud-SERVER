import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as ReferenceContext } from '../../../../../context/ReferenceContext'
import ReferenceCreateForm from '../cvBitForms/reference/ReferenceCreateForm'

const ReferenceCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(ReferenceContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <ReferenceCreateForm />
  }

  return renderContent()
}

export default ReferenceCreateScreen
