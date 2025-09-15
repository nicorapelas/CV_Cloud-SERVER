import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native'
import moment from 'moment'

const Template09 = ({
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
  secondEdu,
  secondEduSample,
  tertEdus,
  tertEduSample,
  // UI props
  showSample,
  zoom,
  headerWithZoom,
}) => {
  // Use sample data if showSample is true and extract first item from arrays
  const data = {
    assignedPhotoUrl: showSample ? assignedPhotoUrlSample : assignedPhotoUrl,
    contactInfo: showSample ? contactInfoSample?.[0] : contactInfo?.[0],
    personalInfo: showSample ? personalInfoSample?.[0] : personalInfo?.[0],
    languages: showSample ? languageSample : languages,
    attributes: showSample ? attributeSample : attributes,
    interests: showSample ? interestSample : interests,
    skills: showSample ? skillSample : skills,
    references: showSample ? referenceSample : references,
    personalSummary: showSample
      ? personalSummarySample?.[0]
      : personalSummary?.[0],
    employHistorys: showSample ? employHistorySample : employHistorys,
    experiences: showSample ? experienceSample : experiences,
    secondEdu: showSample ? secondEduSample : secondEdu,
    tertEdus: showSample ? tertEduSample : tertEdus,
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      return moment(dateString).format('MMM YYYY')
    } catch (error) {
      return dateString
    }
  }

  // Determine current styles based on zoom
  const currentStyles = zoom === 'zoomedIn' ? stylesZoomedIn : stylesZoomedOut

  const renderZoomedOut = (currentStyles) => {
    return (
      <View style={currentStyles.bed}>
        {headerWithZoom()}
        <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
          <ScrollView horizontal style={{ backgroundColor: '#f5f5f5' }}>
            <View style={currentStyles.cvBed}>
              <View style={currentStyles.container}>
                {/* Industrial Header */}
                <View style={currentStyles.header}>
                  <View style={currentStyles.headerContent}>
                    <View style={currentStyles.logoSection}>
                      <View style={currentStyles.logo}>
                        <Text style={currentStyles.logoText}>⚙️</Text>
                      </View>
                    </View>
                    <View style={currentStyles.titleSection}>
                      <Text style={currentStyles.name}>
                        {data.personalInfo?.fullName || 'PROFESSIONAL PROFILE'}
                      </Text>
                      <Text style={currentStyles.title}>
                        {data.personalSummary?.content?.split('.')[0] ||
                          'Industrial Professional'}
                      </Text>
                      <View style={currentStyles.headerDivider} />
                    </View>
                  </View>
                </View>

                {/* Contact Information */}
                <View style={currentStyles.contactSection}>
                  <View style={currentStyles.contactGrid}>
                    {data.contactInfo?.email && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactIcon}>📧</Text>
                        <View style={currentStyles.contactDetails}>
                          <Text style={currentStyles.contactLabel}>Email</Text>
                          <Text style={currentStyles.contactValue}>
                            {data.contactInfo.email}
                          </Text>
                        </View>
                      </View>
                    )}
                    {data.contactInfo?.phone && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactIcon}>📞</Text>
                        <View style={currentStyles.contactDetails}>
                          <Text style={currentStyles.contactLabel}>Phone</Text>
                          <Text style={currentStyles.contactValue}>
                            {data.contactInfo.phone}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* Photo Section */}
                {data.assignedPhotoUrl && (
                  <View style={currentStyles.photoSection}>
                    <Image
                      source={{ uri: data.assignedPhotoUrl }}
                      style={currentStyles.profilePhoto}
                    />
                  </View>
                )}

                {/* Professional Summary */}
                {data.personalSummary && (
                  <View style={currentStyles.section}>
                    <View style={currentStyles.sectionHeader}>
                      <Text style={currentStyles.sectionIcon}>⚡</Text>
                      <Text style={currentStyles.sectionTitle}>
                        PROFESSIONAL OVERVIEW
                      </Text>
                    </View>
                    <View style={currentStyles.sectionContent}>
                      <View style={currentStyles.summaryBox}>
                        <Text style={currentStyles.summaryText}>
                          {data.personalSummary.content}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Two Column Layout */}
                <View style={currentStyles.columns}>
                  {/* Left Column */}
                  <View style={currentStyles.leftColumn}>
                    {/* Work Experience */}
                    {data.experiences && data.experiences.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🔧</Text>
                          <Text style={currentStyles.sectionTitle}>
                            WORK EXPERIENCE
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {data.experiences.map((experience, index) => (
                            <View
                              key={experience._id || index}
                              style={currentStyles.experienceItem}
                            >
                              <View style={currentStyles.experienceHeader}>
                                <Text style={currentStyles.experienceName}>
                                  {experience.title}
                                </Text>
                                {experience.company && (
                                  <Text style={currentStyles.experienceCompany}>
                                    {experience.company}
                                  </Text>
                                )}
                              </View>
                              {experience.description && (
                                <Text
                                  style={currentStyles.experienceDescription}
                                >
                                  {experience.description}
                                </Text>
                              )}
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Education */}
                    {(data.tertEdus && data.tertEdus.length > 0) ||
                    (data.secondEdu && data.secondEdu.length > 0) ? (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🎓</Text>
                          <Text style={currentStyles.sectionTitle}>
                            EDUCATION
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {/* Tertiary Education */}
                          {data.tertEdus &&
                            data.tertEdus.map((education, index) => (
                              <View
                                key={education._id || index}
                                style={currentStyles.educationItem}
                              >
                                <Text style={currentStyles.educationName}>
                                  {education.certificationType ||
                                    'Tertiary Education'}
                                </Text>
                                <Text
                                  style={currentStyles.educationInstitution}
                                >
                                  {education.instituteName}
                                </Text>
                                {education.description && (
                                  <Text
                                    style={currentStyles.educationDescription}
                                  >
                                    {education.description}
                                  </Text>
                                )}
                              </View>
                            ))}

                          {/* Secondary Education */}
                          {data.secondEdu &&
                            data.secondEdu.map((education, index) => (
                              <View
                                key={education._id || index}
                                style={currentStyles.educationItem}
                              >
                                <Text style={currentStyles.educationName}>
                                  Secondary Education
                                </Text>
                                <Text
                                  style={currentStyles.educationInstitution}
                                >
                                  {education.schoolName}
                                </Text>
                                {education.additionalInfo && (
                                  <Text
                                    style={currentStyles.educationAdditional}
                                  >
                                    {education.additionalInfo}
                                  </Text>
                                )}
                              </View>
                            ))}
                        </View>
                      </View>
                    ) : null}
                  </View>

                  {/* Right Column */}
                  <View style={currentStyles.rightColumn}>
                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>⚙️</Text>
                          <Text style={currentStyles.sectionTitle}>
                            TECHNICAL SKILLS
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {data.skills.map((skill, index) => (
                            <View
                              key={skill._id || index}
                              style={currentStyles.skillItem}
                            >
                              <Text style={currentStyles.skillName}>
                                {skill.skill}
                              </Text>
                              <Text style={currentStyles.skillLevel}>
                                {skill.proficiency}/5
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🌐</Text>
                          <Text style={currentStyles.sectionTitle}>
                            LANGUAGES
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {data.languages.map((language, index) => (
                            <View
                              key={language._id || index}
                              style={currentStyles.languageItem}
                            >
                              <Text style={currentStyles.languageName}>
                                {language.language}
                              </Text>
                              <Text style={currentStyles.languageLevel}>
                                {language.proficiency}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Attributes */}
                    {data.attributes && data.attributes.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>💪</Text>
                          <Text style={currentStyles.sectionTitle}>
                            ATTRIBUTES
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          <View style={currentStyles.attributesGrid}>
                            {data.attributes.map((attribute, index) => (
                              <View
                                key={attribute._id || index}
                                style={currentStyles.attributeTag}
                              >
                                <Text style={currentStyles.attributeText}>
                                  {attribute.attribute}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🎯</Text>
                          <Text style={currentStyles.sectionTitle}>
                            INTERESTS
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          <View style={currentStyles.interestsGrid}>
                            {data.interests.map((interest, index) => (
                              <View
                                key={interest._id || index}
                                style={currentStyles.interestTag}
                              >
                                <Text style={currentStyles.interestText}>
                                  {interest.interest}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* Footer */}
                <View style={currentStyles.footer}>
                  <Text style={currentStyles.footerText}>
                    Built for Industrial Excellence
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    )
  }

  return renderZoomedOut(currentStyles)
}

// Styles with 10px border radius as requested
const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
  },
  cvBed: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 10,
    width: 380,
    minHeight: 500,
    flex: 1,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logoSection: {
    flexShrink: 0,
  },
  logo: {
    width: 60,
    height: 60,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  logoText: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  titleSection: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: '#d4af37',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerDivider: {
    width: 80,
    height: 2,
    backgroundColor: '#d4af37',
    borderRadius: 1,
  },
  contactSection: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
    borderRadius: 10,
  },
  contactGrid: {
    flexDirection: 'column',
    gap: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  contactIcon: {
    fontSize: 16,
    width: 30,
    height: 30,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 30,
    color: '#1a1a1a',
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 12,
    color: '#2c2c2c',
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#d4af37',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
  },
  sectionIcon: {
    fontSize: 14,
    width: 25,
    height: 25,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 25,
    color: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContent: {
    paddingLeft: 5,
  },
  summaryBox: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#2c2c2c',
    textAlign: 'justify',
  },
  columns: {
    flexDirection: 'row',
    gap: 15,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  experienceHeader: {
    marginBottom: 6,
  },
  experienceName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  experienceCompany: {
    fontSize: 11,
    color: '#d4af37',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceDescription: {
    color: '#2c2c2c',
    lineHeight: 14,
    fontSize: 10,
  },
  educationItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  educationName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  educationInstitution: {
    fontSize: 10,
    color: '#d4af37',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  educationDescription: {
    color: '#2c2c2c',
    lineHeight: 13,
    fontSize: 9,
    fontStyle: 'italic',
  },
  educationAdditional: {
    color: '#666',
    lineHeight: 12,
    fontSize: 8,
    fontStyle: 'italic',
  },
  skillItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: 3,
    borderLeftColor: '#d4af37',
  },
  skillName: {
    fontWeight: '600',
    color: '#1a1a1a',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillLevel: {
    color: '#d4af37',
    fontWeight: '600',
    fontSize: 8,
  },
  languageItem: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: 3,
    borderLeftColor: '#d4af37',
  },
  languageName: {
    fontWeight: '600',
    color: '#1a1a1a',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  languageLevel: {
    color: '#d4af37',
    fontWeight: '600',
    fontSize: 8,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  attributeTag: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  attributeText: {
    color: '#d4af37',
    fontSize: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestTag: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  interestText: {
    color: '#1a1a1a',
    fontSize: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
  },
  footerText: {
    fontSize: 10,
    color: '#d4af37',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})

const stylesZoomedIn = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
  },
  cvBed: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 10,
    width: 760,
    minHeight: 1000,
    flex: 1,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    marginBottom: 20,
    borderRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  logoSection: {
    flexShrink: 0,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  logoText: {
    fontSize: 32,
    color: '#1a1a1a',
  },
  titleSection: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    color: '#d4af37',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerDivider: {
    width: 120,
    height: 3,
    backgroundColor: '#d4af37',
    borderRadius: 2,
  },
  contactSection: {
    backgroundColor: '#ffffff',
    padding: 25,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#d4af37',
    borderRadius: 10,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    minWidth: '45%',
    flex: 1,
  },
  contactIcon: {
    fontSize: 20,
    width: 40,
    height: 40,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 40,
    color: '#1a1a1a',
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 14,
    color: '#2c2c2c',
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#d4af37',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#d4af37',
  },
  sectionIcon: {
    fontSize: 18,
    width: 35,
    height: 35,
    backgroundColor: '#d4af37',
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 35,
    color: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sectionContent: {
    paddingLeft: 47,
  },
  summaryBox: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#d4af37',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2c2c2c',
    textAlign: 'justify',
  },
  columns: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderLeftWidth: 6,
    borderLeftColor: '#d4af37',
  },
  experienceHeader: {
    marginBottom: 8,
  },
  experienceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 13,
    color: '#d4af37',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceDescription: {
    color: '#2c2c2c',
    lineHeight: 16,
    fontSize: 12,
  },
  educationItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderLeftWidth: 6,
    borderLeftColor: '#d4af37',
  },
  educationName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  educationInstitution: {
    fontSize: 12,
    color: '#d4af37',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  educationDescription: {
    color: '#2c2c2c',
    lineHeight: 15,
    fontSize: 11,
    fontStyle: 'italic',
  },
  educationAdditional: {
    color: '#666',
    lineHeight: 14,
    fontSize: 10,
    fontStyle: 'italic',
  },
  skillItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  skillName: {
    fontWeight: '600',
    color: '#1a1a1a',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillLevel: {
    color: '#d4af37',
    fontWeight: '600',
    fontSize: 10,
  },
  languageItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  languageName: {
    fontWeight: '600',
    color: '#1a1a1a',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  languageLevel: {
    color: '#d4af37',
    fontWeight: '600',
    fontSize: 10,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attributeTag: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  attributeText: {
    color: '#d4af37',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  interestText: {
    color: '#1a1a1a',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#d4af37',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
})

export default Template09
