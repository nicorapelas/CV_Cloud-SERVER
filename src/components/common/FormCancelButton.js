import React, { useContext } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Context as NavContext } from '../../context/NavContext'
import { Context as UniversalContext } from '../../context/UniversalContext'
import { Context as AttributeContext } from '../../context/AttributeContext'
import { Context as ContactInfoContext } from '../../context/ContactInfoContext'
import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { Context as ExperienceContext } from '../../context/ExperienceContext'
import { Context as InterestContext } from '../../context/InterestContext'
import { Context as LanguageContext } from '../../context/LanguageContext'
import { Context as PersonalInfoContext } from '../../context/PersonalInfoContext'
import { Context as PersonalSummaryContext } from '../../context/PersonalSummaryContext'
import { Context as ReferenceContext } from '../../context/ReferenceContext'
import { Context as SecondEduContext } from '../../context/SecondEduContext'
import { Context as SkillContext } from '../../context/SkillContext'
import { Context as TertEduContext } from '../../context/TertEduContext'

const FormCancelButton = ({ route }) => {
  const { setCVBitScreenSelected, setNavTabSelected } = useContext(NavContext)

  const { setStartYear, setEndYear, setStartMonth, setEndMonth } =
    useContext(UniversalContext)

  const { clearAttributeErrors } = useContext(AttributeContext)
  const { clearErrors: clearContactInfoErrors } = useContext(ContactInfoContext)
  const { clearEmployHistoryErrors } = useContext(EmployHistoryContext)
  const { clearExperienceErrors } = useContext(ExperienceContext)
  const { clearInterestErrors } = useContext(InterestContext)
  const { clearLanguageErrors } = useContext(LanguageContext)
  const { clearErrors: clearPersonalInfoErrors } =
    useContext(PersonalInfoContext)
  const { clearPersonalSummaryErrors } = useContext(PersonalSummaryContext)
  const { clearReferenceErrors } = useContext(ReferenceContext)
  const { clearSecondEduErrors } = useContext(SecondEduContext)
  const { clearSkillErrors } = useContext(SkillContext)
  const { clearTertEduErrors } = useContext(TertEduContext)

  const clearErrors = () => {
    console.log(`route`, route)
    switch (route) {
      case 'attribute':
        clearAttributeErrors()
        break
      case 'interest':
        clearInterestErrors()
        break
      case 'skill':
        clearSkillErrors()
        break
      case 'language':
        clearLanguageErrors()
        break
      case 'personalInfo':
        clearPersonalInfoErrors()
        break
      case 'personalSummary':
        clearPersonalSummaryErrors()
        break
      case 'contactInfo':
        clearContactInfoErrors()
        break
      case 'secondEdu':
        clearSecondEduErrors()
        break
      case 'tertEdu':
        clearTertEduErrors()
        break
      case 'employHistory':
        clearEmployHistoryErrors()
        break
      case 'experience':
        clearExperienceErrors()
        break
      case 'reference':
        clearReferenceErrors()
        break
      default:
        break
    }
  }

  const handlePressCancel = () => {
    if (route === 'dashboard') {
      setCVBitScreenSelected('')
      setNavTabSelected('dashboard')
    } else {
      setCVBitScreenSelected(route)
      clearErrors()
      setStartYear(null)
      setEndYear(null)
      setStartMonth(null)
      setEndMonth(null)
      Keyboard.dismiss()
    }
  }

  const cancelButton = () => {
    return (
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={handlePressCancel}
      >
        <AntDesign name="back" style={styles.cancelButtonIcon} />
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.addButtonTextIos
              : styles.addButtonText
          }
        >
          cancel
        </Text>
      </TouchableOpacity>
    )
  }

  return cancelButton()
}

const styles = StyleSheet.create({
  addButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    margin: 5,
    height: 40,
  },
  addButtonTextIos: {
    color: '#ffff',
    fontSize: 18,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 4,
  },
  cancelButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
})

export default FormCancelButton
