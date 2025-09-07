import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as ContactInfoContext } from '../../../../../context/ContactInfoContext'
import ContactInfoCreateForm from '../cvBitForms/contactInfo/ContactInfoCreateForm'

const ContactInfoCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(ContactInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <ContactInfoCreateForm />
  }

  return renderContent()
}

export default ContactInfoCreateScreen
