import React, { useContext } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import FirstImpressionBitButton from '../../../cvBitButtons/FirstImpressionBitButton'
import ContactInfoBitButton from '../../../cvBitButtons/ContactInfoBitButton'
import PersonalInfoBitButton from '../../../cvBitButtons/PersonalInfoBitButton'
import PersonalSummaryBitButton from '../../../cvBitButtons/PersonalSummaryBitButton'
import AttributeBitButton from '../../../cvBitButtons/AttributeBitButton'
import InterestBitButton from '../../../cvBitButtons/InterestBitButton'
import SkillBitButton from '../../../cvBitButtons/SkillBitButton'
import CVBitScreenRender from '../CVBitScreens/CVBitScreenRender'
import LanguageBitButton from '../../../cvBitButtons/LanguageBitButton'
import SecondEduBitButton from '../../../cvBitButtons/SecondEduBitButton'
import TertEduBitButton from '../../../cvBitButtons/TertEduBitButton'
import EmployHistoryBitButton from '../../../cvBitButtons/EmployHistoryBitButton'
import ExperienceBitButton from '../../../cvBitButtons/ExperienceBitButton'
import ReferenceBitButton from '../../../cvBitButtons/ReferenceBitButton'
import PhotoBitButton from '../../../cvBitButtons/PhotoBitButton'
import CertificateBitButton from '../../../cvBitButtons/CertificateBitButton'
import { Context as NavContext } from '../../../../context/NavContext'

const DashboardScreen = () => {
  const {
    state: { CVBitScreenSelected },
  } = useContext(NavContext)

  const renderContent = () => {
    if (CVBitScreenSelected === '') {
      return (
        <ScrollView style={styles.container}>
          <FirstImpressionBitButton />
          <PhotoBitButton />
          <PersonalSummaryBitButton />
          <SecondEduBitButton />
          <TertEduBitButton />
          <PersonalInfoBitButton />
          <ContactInfoBitButton />
          <LanguageBitButton />
          <AttributeBitButton />
          <InterestBitButton />
          <SkillBitButton />
          <EmployHistoryBitButton />
          <ExperienceBitButton />
          <ReferenceBitButton />
          <CertificateBitButton />
        </ScrollView>
      )
    }
    return <CVBitScreenRender />
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginVertical: 5,
  },
})

export default DashboardScreen
