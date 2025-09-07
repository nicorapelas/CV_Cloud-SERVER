import React, { useContext } from 'react'
import EmployHistoryEditForm from '../cvBitForms/employHistory/EmployHistoryEditForm'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as EmployHistoryContext } from '../../../../../context/EmployHistoryContext'

const EmployHistoryEditScreen = () => {
  const {
    state: { loading },
  } = useContext(EmployHistoryContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <EmployHistoryEditForm />
  }

  return renderContent()
}

export default EmployHistoryEditScreen
