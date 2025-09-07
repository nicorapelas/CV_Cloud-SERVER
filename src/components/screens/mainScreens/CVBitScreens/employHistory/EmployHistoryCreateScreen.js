import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as EmployHistoryContext } from '../../../../../context/EmployHistoryContext'
import EmployHistoryCreateForm from '../cvBitForms/employHistory/EmployHistoryCreateForm'

const EmployHistoryCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(EmployHistoryContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <EmployHistoryCreateForm />
  }

  return renderContent()
}

export default EmployHistoryCreateScreen
