import React, { useEffect, useContext, useState } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Text,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import LoaderWithText from '../../../common/LoaderWithText'
import logo from '../../../../../assets/images/logo-h79.png'

// Import templates
import CurrentTemplate from './templates/current/CurrentTemplate'
import Template01 from './templates/template01/Template01'

import { Context as AttributeContext } from '../../../../context/AttributeContext'
import { Context as ContactInfoContext } from '../../../../context/ContactInfoContext'
import { Context as EmployHistoryContext } from '../../../../context/EmployHistoryContext'
import { Context as ExperienceContext } from '../../../../context/ExperienceContext'
import { Context as InterestContext } from '../../../../context/InterestContext'
import { Context as LanguageContext } from '../../../../context/LanguageContext'
import { Context as PersonalInfoContext } from '../../../../context/PersonalInfoContext'
import { Context as PersonalSummaryContext } from '../../../../context/PersonalSummaryContext'
import { Context as PhotoContext } from '../../../../context/PhotoContext'
import { Context as ReferenceContext } from '../../../../context/ReferenceContext'
import { Context as SecondEduContext } from '../../../../context/SecondEduContext'
import { Context as SkillContext } from '../../../../context/SkillContext'
import { Context as TertEduContext } from '../../../../context/TertEduContext'

const ViewCVScreen = () => {
  const [zoom, setZoom] = useState('zoomedOut')
  const [showSample, setShowSample] = useState(false)
  const [showSampleButton, setShowSampleButton] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState('template01') // Template01 as default

  const {
    state: { loading: loadingAttribute, attributes, attributeSample },
    fetchAttributeSample,
  } = useContext(AttributeContext)

  const {
    state: { loading: loadingContactInfo, contactInfo, contactInfoSample },
    fetchContactInfoSample,
  } = useContext(ContactInfoContext)

  const {
    state: {
      loading: loadingEmployHistory,
      employHistorys,
      employHistorySample,
    },
    fetchEmployHistorySample,
  } = useContext(EmployHistoryContext)

  const {
    state: { loading: loadingExperience, experiences, experienceSample },
    fetchExperienceSample,
  } = useContext(ExperienceContext)

  const {
    state: { loading: loadingInterest, interests, interestSample },
    fetchInterestSample,
  } = useContext(InterestContext)

  const {
    state: { loading: loadingLanguage, languages, languageSample },
    fetchLanguageSample,
  } = useContext(LanguageContext)

  const {
    state: {
      loading: loadingPersonalInfo,
      personalInfo,
      viewHeading,
      personalInfoSample,
      viewHeadingSample,
    },
    fetchViewHeading,
    fetchPersonalInfoSample,
    fetchViewHeadingSample,
  } = useContext(PersonalInfoContext)

  const {
    state: {
      loading: loadingPersonalSummary,
      personalSummary,
      personalSummarySample,
    },
    fetchPersonalSummarySample,
  } = useContext(PersonalSummaryContext)

  const {
    state: { loading: loadingPhoto, assignedPhotoUrl, assignedPhotoUrlSample },
    fetchAssignedPhoto,
    fetchPhotoSample,
  } = useContext(PhotoContext)

  const {
    state: { loading: loadingReference, references, referenceSample },
    fetchReferenceSample,
  } = useContext(ReferenceContext)

  const {
    state: { loading: loadingSecondEdu, secondEdus, secondEduSample },
    fetchSecondEduSample,
  } = useContext(SecondEduContext)

  const {
    state: { loading: loadingSkill, skills, skillSample },
    fetchSkillSample,
  } = useContext(SkillContext)

  const {
    state: { loading: loadingTertEdu, tertEdus, tertEduSample },
    fetchTertEduSample,
  } = useContext(TertEduContext)

  useEffect(() => {
    userRedirect()
  }, [contactInfo, personalInfo])

  useEffect(() => {
    fetchAttributeSample()
    fetchContactInfoSample()
    fetchEmployHistorySample()
    fetchExperienceSample()
    fetchInterestSample()
    fetchLanguageSample()
    fetchViewHeading()
    fetchPersonalInfoSample()
    fetchViewHeadingSample()
    fetchPersonalSummarySample()
    fetchAssignedPhoto()
    fetchPhotoSample()
    fetchReferenceSample()
    fetchSecondEduSample()
    fetchSkillSample()
    fetchTertEduSample()
  }, [])

  const userRedirect = () => {
    if (personalInfo === null || contactInfo === null) return null
    if (personalInfo.length < 1 && contactInfo.length < 1) {
      // navigation.navigate('StartUpCreate')
    }
  }

  const headerWithZoom = () => {
    return (
      <View style={styles.headerContainer}>
        {/* Top Row: Logo and Zoom Controls */}
        <View style={styles.bed}>
          <Image style={styles.logo} source={logo} resizeMode="contain" />
          <View style={styles.zoomButtonsContainer}>
            <View style={styles.zoomButtonsBed}>
              <TouchableOpacity onPress={() => setZoom('zoomedOut')}>
                <Text
                  style={
                    zoom === 'zoomedOut'
                      ? styles.zoomedButtonTextActive
                      : styles.zoomedButtonText
                  }
                >
                  -
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setZoom('zoomedIn')}>
                <Text
                  style={
                    zoom === 'zoomedIn'
                      ? styles.zoomedButtonTextActive
                      : styles.zoomedButtonText
                  }
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Row: Template Selector */}
        <View style={styles.templateSelector}>
          <Text style={styles.templateLabel}>Template:</Text>
          <TouchableOpacity
            style={[
              styles.templateButton,
              selectedTemplate === 'template01' && styles.templateButtonActive,
            ]}
            onPress={() => setSelectedTemplate('template01')}
          >
            <Text
              style={[
                styles.templateButtonText,
                selectedTemplate === 'template01' &&
                  styles.templateButtonTextActive,
              ]}
            >
              Modern
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.templateButton,
              selectedTemplate === 'current' && styles.templateButtonActive,
            ]}
            onPress={() => setSelectedTemplate('current')}
          >
            <Text
              style={[
                styles.templateButtonText,
                selectedTemplate === 'current' &&
                  styles.templateButtonTextActive,
              ]}
            >
              Classic
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Template rendering function
  const renderTemplate = () => {
    const templateProps = {
      // Data props
      assignedPhotoUrl,
      assignedPhotoUrlSample,
      contactInfo,
      contactInfoSample,
      personalInfo,
      personalInfoSample,
      languages,
      languageSample,
      attributes,
      attributeSample,
      interests,
      interestSample,
      skills,
      skillSample,
      references,
      referenceSample,
      viewHeading,
      viewHeadingSample,
      personalSummary,
      personalSummarySample,
      employHistorys,
      employHistorySample,
      experiences,
      experienceSample,
      secondEdus,
      secondEduSample,
      tertEdus,
      tertEduSample,
      // UI props
      showSample,
      zoom,
      headerWithZoom,
    }

    switch (selectedTemplate) {
      case 'template01':
        return <Template01 {...templateProps} />
      case 'current':
        return <CurrentTemplate {...templateProps} />
      default:
        return <Template01 {...templateProps} />
    }
  }

  const renderContent = () => {
    if (
      loadingAttribute ||
      loadingContactInfo ||
      loadingEmployHistory ||
      loadingExperience ||
      loadingInterest ||
      loadingLanguage ||
      loadingPersonalInfo ||
      loadingPersonalSummary ||
      loadingPhoto ||
      loadingReference ||
      loadingSkill ||
      loadingSecondEdu ||
      loadingTertEdu ||
      personalInfo === null ||
      contactInfo === null
    ) {
      return <LoaderWithText mainText="Building your CV" />
    }
    return renderTemplate()
  }

  const cvSampleButton = () => {
    if (
      !showSampleButton ||
      loadingAttribute ||
      loadingContactInfo ||
      loadingEmployHistory ||
      loadingExperience ||
      loadingInterest ||
      loadingLanguage ||
      loadingPersonalInfo ||
      loadingPersonalSummary ||
      loadingPhoto ||
      loadingReference ||
      loadingSkill ||
      loadingSecondEdu ||
      loadingTertEdu
    )
      return null
    return (
      <View style={styles.viewCvSampleButtonBed}>
        <TouchableOpacity
          style={styles.viewCvSampleCloseButton}
          onPress={() => {
            setShowSampleButton(false)
            setShowSample(false)
          }}
        >
          <AntDesign style={styles.viewCvSampleCloseButtonIcon} name="close" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewCvSampleButton}
          onPress={() => setShowSample(!showSample)}
        >
          <Text style={styles.viewCvSampleButtonText}>
            {!showSample ? 'View' : 'Hide'}
          </Text>
          <Text style={styles.viewCvSampleButtonText}>Sample</Text>
          <Text style={styles.viewCvSampleButtonText}>CV</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {renderContent()}
      {cvSampleButton()}
    </>
  )
}

const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    backgroundColor: '#ffff',
    marginTop: 5,
    marginLeft: 10,
    width: 380,
    flexDirection: 'row',
  },
  leftColumn: {
    backgroundColor: '#278ACD',
    width: '30%',
    paddingRight: 1,
  },
  rightColumn: {
    backgroundColor: '#ffff',
    width: '70%',
  },
  leftFooter: {
    backgroundColor: '#278ACD',
    height: 20,
  },
  rightFooter: {
    backgroundColor: '#ffff',
    height: 20,
  },
})

const stylesZoomedIn = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    backgroundColor: '#ffff',
    marginTop: 5,
    width: 793,
    flexDirection: 'row',
  },
  leftColumn: {
    backgroundColor: '#278ACD',
    width: '30%',
  },
  rightColumn: {
    backgroundColor: '#ffff',
    width: '70%',
  },
  leftFooter: {
    backgroundColor: '#278ACD',
    height: 20,
  },
  rightFooter: {
    backgroundColor: '#ffff',
    height: 20,
  },
})

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
  },
  bed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -55,
  },
  logo: {
    width: 150,
    marginBottom: -23,
    marginLeft: 10,
  },
  templateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  templateLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  templateButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  templateButtonActive: {
    backgroundColor: '#278ACD',
    borderColor: '#278ACD',
  },
  templateButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  templateButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  zoomButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  zoomButtonsBed: {
    flexDirection: 'row',
  },
  zoomedButtonText: {
    color: '#ffff',
    fontSize: 30,
    paddingRight: 30,
  },
  zoomedButtonTextActive: {
    color: '#808080',
    fontSize: 30,
    paddingRight: 30,
  },
  viewCvSampleCloseButton: {
    alignSelf: 'flex-end',
  },
  viewCvSampleCloseButtonIcon: {
    fontSize: 16,
  },
  viewCvSampleButtonBed: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  viewCvSampleButton: {
    backgroundColor: '#065b948c',
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
  },
  viewCvSampleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
})

export default ViewCVScreen
