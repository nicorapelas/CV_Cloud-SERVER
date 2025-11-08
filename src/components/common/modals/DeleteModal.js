import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons'

import { Context as AttributeContext } from '../../../context/AttributeContext'
import { Context as CertificateContext } from '../../../context/CertificateContext'
import { Context as ContactInfoContext } from '../../../context/ContactInfoContext'
import { Context as EmployHistoryContext } from '../../../context/EmployHistoryContext'
import { Context as ExperienceContext } from '../../../context/ExperienceContext'
import { Context as FirstImpressionContext } from '../../../context/FirstImpressionContext'
import { Context as InterestContext } from '../../../context/InterestContext'
import { Context as LanguageContext } from '../../../context/LanguageContext'
import { Context as PersonalInfoContext } from '../../../context/PersonalInfoContext'
import { Context as PersonalSummaryContext } from '../../../context/PersonalSummaryContext'
import { Context as PhotoContext } from '../../../context/PhotoContext'
import { Context as SecondEduContext } from '../../../context/SecondEduContext'
import { Context as ReferenceContext } from '../../../context/ReferenceContext'
import { Context as SkillContext } from '../../../context/SkillContext'
import { Context as TertEduContext } from '../../../context/TertEduContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import { Context as NavContext } from '../../../context/NavContext'

const DeleteModal = ({
  id,
  documentSelected,
  bit,
  publicId,
  isVisible = false,
}) => {
  const [cancelRoute, setCancelRoute] = useState('')

  const { deleteAttribute } = useContext(AttributeContext)
  const { deleteCertificate } = useContext(CertificateContext)
  const { deleteContactInfo } = useContext(ContactInfoContext)
  const { deleteEmployHistory } = useContext(EmployHistoryContext)
  const { deleteExperience } = useContext(ExperienceContext)
  const { deleteFirstImpression } = useContext(FirstImpressionContext)
  const { deleteInterest } = useContext(InterestContext)
  const { deleteLanguage } = useContext(LanguageContext)
  const { deletePersonalInfo } = useContext(PersonalInfoContext)
  const { deletePersonalSummary } = useContext(PersonalSummaryContext)
  const {
    state: { assignedPhotoId },
    deletePhoto,
    setAssignedPhotoId,
  } = useContext(PhotoContext)
  const { deleteSecondEdu } = useContext(SecondEduContext)
  const { deleteReference } = useContext(ReferenceContext)
  const { deleteSkill } = useContext(SkillContext)
  const { deleteTertEdu } = useContext(TertEduContext)

  const {
    state: { deleteModalShow, userPlanformOS },
    hideDeleteModal,
  } = useContext(UniversalContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    switch (bit) {
      case 'contact information':
        setCancelRoute('contactInfo')
        break
      case 'secondary education':
        setCancelRoute('secondEdu')
        break
      case 'tertiary education':
        setCancelRoute('tertEdu')
        break
      case 'personal summary':
        setCancelRoute('personalSummary')
        break
      case 'personal information':
        setCancelRoute('personalInfo')
        break
      case 'employment history':
        setCancelRoute('employHistory')
        break
      case 'first impression':
        setCancelRoute('firstImpression')
        break
      default:
        setCancelRoute(bit)
    }
  }, [bit])

  const photoDelete = () => {
    if (assignedPhotoId === id) {
      deletePhoto({ id, publicId }, () => {
        setAssignedPhotoId(null)
      })
      return
    }
    deletePhoto({ id, publicId })
  }

  const selectAction = () => {
    if (bit === 'attribute') {
      deleteAttribute(id)
    }
    if (bit === 'certificate') {
      deleteCertificate({ id, publicId })
    }
    if (bit === 'contact information') {
      deleteContactInfo(id)
    }
    if (bit === 'employment history') {
      deleteEmployHistory(id)
    }
    if (bit === 'experience') {
      deleteExperience(id)
    }
    if (bit === 'first impression') {
      deleteFirstImpression({ id, publicId })
    }
    if (bit === 'language') {
      deleteLanguage(id)
    }
    if (bit === 'interest') {
      deleteInterest(id)
    }
    if (bit === 'personal information') {
      deletePersonalInfo(id)
    }
    if (bit === 'personal summary') {
      deletePersonalSummary(id)
    }
    if (bit === 'photo') {
      photoDelete()
    }
    if (bit === 'reference') {
      deleteReference(id)
    }
    if (bit === 'secondary education') {
      deleteSecondEdu(id)
      setCVBitScreenSelected('secondEdu')
    }
    if (bit === 'skill') {
      deleteSkill(id)
    }
    if (bit === 'tertiary education') {
      deleteTertEdu(id)
    }
    return null
  }

  const handlePressCancel = () => {
    setCVBitScreenSelected(cancelRoute)
    hideDeleteModal()
  }

  const renderModal = () => {
    return (
      <Modal
        transparent={true}
        visible={deleteModalShow}
        animationType="slide"
        onRequestClose={handlePressCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.messageBed}>
            <FontAwesome style={styles.icon} name="trash-o" />
            <Text
              style={
                userPlanformOS === 'ios'
                  ? styles.messageTextIos
                  : styles.messageTextAndroid
              }
            >
              delete {bit}
            </Text>
            {documentSelected ? (
              <Text style={styles.documentSelectedText}>
                "{documentSelected}"
              </Text>
            ) : (
              <Text style={styles.noDocumentSelectedText}></Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                selectAction()
                hideDeleteModal()
              }}
            >
              <Text style={styles.buttonText}>delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handlePressCancel}
            >
              <MaterialIcons name="cancel" style={styles.backButtonIcon} />
              <Text style={styles.backButtonText}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return renderModal()
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  messageBed: {
    backgroundColor: '#232936',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 7,
    borderColor: '#f56c6c',
    margin: -30,
  },
  icon: {
    color: '#F9B321',
    alignSelf: 'center',
    fontSize: 55,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  documentSelectedText: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 2,
  },
  noDocumentSelectedText: {
    paddingBottom: 3,
  },
  button: {
    backgroundColor: '#f56c6c',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#ffff',
    borderWidth: 2,
    alignSelf: 'center',
    width: 'auto',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#ffff',
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    paddingTop: 5,
    fontSize: 13,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 16,
  },
})

export default DeleteModal
