import React, { useContext } from 'react'
import AttributeEditForm from '../cvBitForms/AttributeInterestPersonalSummaryEditForm'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as AttributeContext } from '../../../../../context/AttributeContext'

const AttributeEditScreen = () => {
  const {
    state: { loading },
  } = useContext(AttributeContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <AttributeEditForm bit="attribute" />
  }

  return renderContent()
}

export default AttributeEditScreen
