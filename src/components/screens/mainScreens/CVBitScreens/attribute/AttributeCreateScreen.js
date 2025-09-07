import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as AttributeContext } from '../../../../../context/AttributeContext'
import AttributeCreateForm from '../cvBitForms/attribute/AttributeCreateForm'

const AttributeCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(AttributeContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <AttributeCreateForm bit="attribute" />
  }

  return renderContent()
}

export default AttributeCreateScreen
