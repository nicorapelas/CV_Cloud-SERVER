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

const Template10 = ({
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

  const renderZoomedOut = (currentStyles = stylesZoomedOut) => {
    return (
      <View style={currentStyles.bed}>
        {headerWithZoom()}
        <ScrollView style={{ backgroundColor: '#f8f9fa' }}>
          <ScrollView horizontal style={{ backgroundColor: '#f8f9fa' }}>
            <View style={currentStyles.cvBed}>
              <View style={currentStyles.container}>
                {/* Agriculture Header */}
                <View style={currentStyles.header}>
                  <View style={currentStyles.headerContent}>
                    <View style={currentStyles.logoSection}>
                      <View style={currentStyles.logo}>
                        <Text style={currentStyles.logoText}>🚜</Text>
                      </View>
                    </View>
                    <View style={currentStyles.titleSection}>
                      <Text style={currentStyles.name}>
                        {data.personalInfo?.fullName ||
                          'AGRICULTURAL PROFESSIONAL'}
                      </Text>
                      <Text style={currentStyles.title}>
                        {data.personalSummary?.content?.split('.')[0] ||
                          'Farming & Agriculture Specialist'}
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
                    {data.contactInfo?.address && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactIcon}>📍</Text>
                        <View style={currentStyles.contactDetails}>
                          <Text style={currentStyles.contactLabel}>
                            Location
                          </Text>
                          <Text style={currentStyles.contactValue}>
                            {data.contactInfo.address}
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
                      <Text style={currentStyles.sectionIcon}>🌱</Text>
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
                          <Text style={currentStyles.sectionIcon}>🚜</Text>
                          <Text style={currentStyles.sectionTitle}>
                            AGRICULTURAL EXPERIENCE
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
                                {(experience.startDate ||
                                  experience.endDate) && (
                                  <Text style={currentStyles.experienceDates}>
                                    {formatDate(experience.startDate)} -{' '}
                                    {formatDate(experience.endDate) ||
                                      'Present'}
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
                            EDUCATION & TRAINING
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
                                    'Agricultural Education'}
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
                                {education.additionalInfo && (
                                  <Text
                                    style={currentStyles.educationAdditional}
                                  >
                                    {education.additionalInfo}
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

                    {/* References */}
                    {data.references && data.references.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🤝</Text>
                          <Text style={currentStyles.sectionTitle}>
                            REFERENCES
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {data.references.map((reference, index) => (
                            <View
                              key={reference._id || index}
                              style={currentStyles.referenceItem}
                            >
                              <Text style={currentStyles.referenceName}>
                                {reference.name}
                              </Text>
                              {reference.position && (
                                <Text style={currentStyles.referencePosition}>
                                  {reference.position}
                                </Text>
                              )}
                              {reference.email && (
                                <Text style={currentStyles.referenceContact}>
                                  📧 {reference.email}
                                </Text>
                              )}
                              {reference.phone && (
                                <Text style={currentStyles.referenceContact}>
                                  📞 {reference.phone}
                                </Text>
                              )}
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Right Column */}
                  <View style={currentStyles.rightColumn}>
                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>⚙️</Text>
                          <Text style={currentStyles.sectionTitle}>
                            AGRICULTURAL SKILLS
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
                              <View style={currentStyles.skillLevel}>
                                <View style={currentStyles.skillBar}>
                                  <View
                                    style={[
                                      currentStyles.skillProgress,
                                      {
                                        width: `${
                                          (skill.proficiency / 5) * 100
                                        }%`,
                                      },
                                    ]}
                                  />
                                </View>
                                <Text style={currentStyles.skillRating}>
                                  {skill.proficiency}/5
                                </Text>
                              </View>
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
                            PERSONAL ATTRIBUTES
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
                          <Text style={currentStyles.sectionIcon}>🌾</Text>
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
                  <View style={currentStyles.footerContent}>
                    <Text style={currentStyles.footerIcon}>🌱</Text>
                    <Text style={currentStyles.footerText}>
                      Cultivating Excellence in Agriculture
                    </Text>
                  </View>
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

// Styles with 8px border radius as requested
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
    borderRadius: 8,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2d5016',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
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
    backgroundColor: '#ffd700',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  logoText: {
    fontSize: 24,
    color: '#2d5016',
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
    color: '#ffd700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerDivider: {
    width: 80,
    height: 2,
    backgroundColor: '#ffd700',
    borderRadius: 1,
  },
  contactSection: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2d5016',
    borderRadius: 8,
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
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  contactIcon: {
    fontSize: 16,
    width: 30,
    height: 30,
    backgroundColor: '#2d5016',
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 30,
    color: '#ffffff',
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 12,
    color: '#2c3e50',
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#2d5016',
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
    borderBottomColor: '#2d5016',
  },
  sectionIcon: {
    fontSize: 14,
    width: 25,
    height: 25,
    backgroundColor: '#2d5016',
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 25,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContent: {
    paddingLeft: 10,
  },
  summaryBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2d5016',
    borderLeftWidth: 4,
    borderLeftColor: '#ffd700',
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#2c3e50',
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
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderLeftWidth: 4,
    borderLeftColor: '#2d5016',
  },
  experienceHeader: {
    marginBottom: 6,
  },
  experienceName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  experienceCompany: {
    fontSize: 11,
    color: '#ffd700',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  experienceDates: {
    fontSize: 10,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  experienceDescription: {
    color: '#2c3e50',
    lineHeight: 14,
    fontSize: 10,
  },
  educationItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderLeftWidth: 4,
    borderLeftColor: '#4a7c59',
  },
  educationName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  educationInstitution: {
    fontSize: 10,
    color: '#4a7c59',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  educationDescription: {
    color: '#2c3e50',
    lineHeight: 13,
    fontSize: 9,
    fontStyle: 'italic',
  },
  educationAdditional: {
    color: '#6c757d',
    lineHeight: 12,
    fontSize: 8,
    fontStyle: 'italic',
  },
  referenceItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderLeftWidth: 4,
    borderLeftColor: '#ffd700',
  },
  referenceName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  referencePosition: {
    fontSize: 10,
    color: '#4a7c59',
    fontWeight: '600',
    marginBottom: 4,
  },
  referenceContact: {
    fontSize: 9,
    color: '#6c757d',
    marginBottom: 1,
  },
  skillItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderLeftWidth: 3,
    borderLeftColor: '#2d5016',
  },
  skillName: {
    fontWeight: '600',
    color: '#2d5016',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  skillLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  skillBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    backgroundColor: '#2d5016',
    borderRadius: 3,
  },
  skillRating: {
    fontSize: 8,
    color: '#2d5016',
    fontWeight: '600',
    minWidth: 25,
  },
  languageItem: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderLeftWidth: 3,
    borderLeftColor: '#4a7c59',
  },
  languageName: {
    fontWeight: '600',
    color: '#2d5016',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  languageLevel: {
    color: '#4a7c59',
    fontWeight: '600',
    fontSize: 8,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  attributeTag: {
    backgroundColor: '#2d5016',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  attributeText: {
    color: '#ffffff',
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
    backgroundColor: '#ffd700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2d5016',
  },
  interestText: {
    color: '#2d5016',
    fontSize: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    backgroundColor: '#2d5016',
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 8,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerIcon: {
    fontSize: 16,
    color: '#ffd700',
  },
  footerText: {
    fontSize: 10,
    color: '#ffffff',
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
    borderRadius: 8,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2d5016',
    padding: 30,
    marginBottom: 20,
    borderRadius: 8,
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
    backgroundColor: '#ffd700',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  logoText: {
    fontSize: 32,
    color: '#2d5016',
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
    color: '#ffd700',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerDivider: {
    width: 120,
    height: 3,
    backgroundColor: '#ffd700',
    borderRadius: 2,
  },
  contactSection: {
    backgroundColor: '#ffffff',
    padding: 25,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2d5016',
    borderRadius: 8,
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
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
    minWidth: '45%',
    flex: 1,
  },
  contactIcon: {
    fontSize: 20,
    width: 40,
    height: 40,
    backgroundColor: '#2d5016',
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 40,
    color: '#ffffff',
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 6,
    borderColor: '#2d5016',
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
    borderBottomColor: '#2d5016',
  },
  sectionIcon: {
    fontSize: 18,
    width: 35,
    height: 35,
    backgroundColor: '#2d5016',
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 35,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sectionContent: {
    paddingLeft: 47,
  },
  summaryBox: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#2d5016',
    borderLeftWidth: 6,
    borderLeftColor: '#ffd700',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2c3e50',
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
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderLeftWidth: 6,
    borderLeftColor: '#2d5016',
  },
  experienceHeader: {
    marginBottom: 8,
  },
  experienceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 13,
    color: '#ffd700',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  experienceDates: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  experienceDescription: {
    color: '#2c3e50',
    lineHeight: 16,
    fontSize: 12,
  },
  educationItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderLeftWidth: 6,
    borderLeftColor: '#4a7c59',
  },
  educationName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  educationInstitution: {
    fontSize: 12,
    color: '#4a7c59',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  educationDescription: {
    color: '#2c3e50',
    lineHeight: 15,
    fontSize: 11,
    fontStyle: 'italic',
  },
  educationAdditional: {
    color: '#6c757d',
    lineHeight: 14,
    fontSize: 10,
    fontStyle: 'italic',
  },
  referenceItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderLeftWidth: 6,
    borderLeftColor: '#ffd700',
  },
  referenceName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2d5016',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  referencePosition: {
    fontSize: 12,
    color: '#4a7c59',
    fontWeight: '600',
    marginBottom: 6,
  },
  referenceContact: {
    fontSize: 11,
    color: '#6c757d',
    marginBottom: 2,
  },
  skillItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderLeftWidth: 4,
    borderLeftColor: '#2d5016',
  },
  skillName: {
    fontWeight: '600',
    color: '#2d5016',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  skillLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  skillBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    backgroundColor: '#2d5016',
    borderRadius: 4,
  },
  skillRating: {
    fontSize: 10,
    color: '#2d5016',
    fontWeight: '600',
    minWidth: 30,
  },
  languageItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderLeftWidth: 4,
    borderLeftColor: '#4a7c59',
  },
  languageName: {
    fontWeight: '600',
    color: '#2d5016',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  languageLevel: {
    color: '#4a7c59',
    fontWeight: '600',
    fontSize: 10,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attributeTag: {
    backgroundColor: '#2d5016',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  attributeText: {
    color: '#ffffff',
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
    backgroundColor: '#ffd700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2d5016',
  },
  interestText: {
    color: '#2d5016',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    backgroundColor: '#2d5016',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerIcon: {
    fontSize: 20,
    color: '#ffd700',
  },
  footerText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
})

export default Template10
