import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as ContactInfoContext } from '../../../../../context/ContactInfoContext'
import ContactInfoEditForm from '../cvBitForms/contactInfo/ContactInfoEditForm'

const ContactInfoEditScreen = () => {
  const {
    state: { loading },
  } = useContext(ContactInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <ContactInfoEditForm />
  }

  return renderContent()
}

export default ContactInfoEditScreen
