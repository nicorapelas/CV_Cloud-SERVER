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

const Template03 = ({
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
  secondEdu,
  secondEduSample,
  tertEdus,
  tertEduSample,
  personalSummary,
  personalSummarySample,
  employHistorys,
  employHistorySample,
  experiences,
  experienceSample,
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
    secondEdu: showSample ? secondEduSample : secondEdu,
    tertEdus: showSample ? tertEduSample : tertEdus,
    personalSummary: showSample
      ? personalSummarySample?.[0]
      : personalSummary?.[0],
    employHistorys: showSample ? employHistorySample : employHistorys,
    experiences: showSample ? experienceSample : experiences,
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return ''

    // Handle "Month YYYY" format specifically
    if (
      typeof dateString === 'string' &&
      /^[A-Za-z]+ \d{4}$/.test(dateString)
    ) {
      const [month, year] = dateString.split(' ')
      const monthIndex = moment().month(month).format('M') - 1
      return moment([parseInt(year), monthIndex]).format('MMM YYYY')
    }

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString // Return original if can't parse
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    } catch (error) {
      return dateString // Return original if error
    }
  }

  // Helper function to render proficiency dots
  const renderProficiency = (level) => {
    const maxLevel = 5
    const filledDots = Math.min(level, maxLevel)
    const emptyDots = maxLevel - filledDots

    return (
      <View style={styles.proficiencyContainer}>
        {[...Array(filledDots)].map((_, i) => (
          <View
            key={`filled-${i}`}
            style={[styles.proficiencyDot, styles.proficiencyDotFilled]}
          />
        ))}
        {[...Array(emptyDots)].map((_, i) => (
          <View key={`empty-${i}`} style={styles.proficiencyDot} />
        ))}
      </View>
    )
  }

  // Helper function to render subjects array
  const renderSubjects = (subjects) => {
    if (!subjects || subjects.length === 0) return null

    if (Array.isArray(subjects)) {
      return subjects.map((subject, index) => (
        <Text key={index} style={styles.subjectText}>
          {typeof subject === 'object' ? subject.subject : subject}
          {index < subjects.length - 1 && ', '}
        </Text>
      ))
    }

    return <Text style={styles.subjectText}>{subjects}</Text>
  }

  const renderZoomedOut = (currentStyles = stylesZoomedOut) => {
    return (
      <View style={currentStyles.bed}>
        {headerWithZoom()}
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
          <ScrollView horizontal style={{ backgroundColor: '#ffffff' }}>
            <View style={currentStyles.cvBed}>
              <View style={currentStyles.container}>
                {/* Creative Header Section */}
                <View style={currentStyles.header}>
                  <View style={currentStyles.headerMain}>
                    <View style={currentStyles.nameSection}>
                      <Text style={currentStyles.name}>
                        {data.personalInfo?.fullName || 'Your Name'}
                      </Text>
                      <Text style={currentStyles.title}>Professional CV</Text>
                    </View>
                    {data.assignedPhotoUrl &&
                      data.assignedPhotoUrl !== 'noneAssigned' && (
                        <View style={currentStyles.photoSection}>
                          <Image
                            source={{ uri: data.assignedPhotoUrl }}
                            style={currentStyles.photo}
                            resizeMode="cover"
                          />
                        </View>
                      )}
                  </View>
                  <View style={currentStyles.contactSidebar}>
                    <View style={currentStyles.contactItem}>
                      <Text style={currentStyles.contactIcon}>📧</Text>
                      <Text style={currentStyles.contactText}>
                        {data.contactInfo?.email || 'email@example.com'}
                      </Text>
                    </View>
                    <View style={currentStyles.contactItem}>
                      <Text style={currentStyles.contactIcon}>📱</Text>
                      <Text style={currentStyles.contactText}>
                        {data.contactInfo?.phone || '+1 234 567 8900'}
                      </Text>
                    </View>
                    <View style={currentStyles.contactItem}>
                      <Text style={currentStyles.contactIcon}>📍</Text>
                      <Text style={currentStyles.contactText}>
                        {data.contactInfo?.address &&
                          `${data.contactInfo.address}, `}
                        {data.contactInfo?.city && `${data.contactInfo.city}, `}
                        {data.contactInfo?.country || 'Your Location'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Professional Summary */}
                {data.personalSummary?.content && (
                  <View style={currentStyles.summarySection}>
                    <View style={currentStyles.sectionHeader}>
                      <Text style={currentStyles.sectionIcon}>💼</Text>
                      <Text style={currentStyles.sectionTitle}>
                        Professional Summary
                      </Text>
                    </View>
                    <View style={currentStyles.summaryContent}>
                      <Text style={currentStyles.summaryText}>
                        {data.personalSummary.content}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Main Content Grid */}
                <View style={currentStyles.mainContent}>
                  {/* Left Column */}
                  <View style={currentStyles.leftColumn}>
                    {/* Work Experience */}
                    {data.employHistorys && data.employHistorys.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>💼</Text>
                          <Text style={currentStyles.sectionTitle}>
                            Work Experience
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {data.employHistorys.map((job, index) => (
                            <View
                              key={index}
                              style={currentStyles.experienceItem}
                            >
                              <View style={currentStyles.experienceHeader}>
                                <Text style={currentStyles.experienceTitle}>
                                  {job.position}
                                </Text>
                                <Text style={currentStyles.experienceCompany}>
                                  {job.company}
                                </Text>
                                <Text style={currentStyles.experienceDates}>
                                  {formatDate(job.startDate)}
                                  {job.endDate
                                    ? ` - ${formatDate(job.endDate)}`
                                    : ' - Present'}
                                </Text>
                              </View>
                              {job.description && (
                                <Text
                                  style={currentStyles.experienceDescription}
                                >
                                  {job.description}
                                </Text>
                              )}
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Education */}
                    {((data.tertEdus && data.tertEdus.length > 0) ||
                      (data.secondEdu && data.secondEdu.length > 0)) && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🎓</Text>
                          <Text style={currentStyles.sectionTitle}>
                            Education
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          {/* Tertiary Education */}
                          {data.tertEdus &&
                            data.tertEdus.map((edu, index) => (
                              <View
                                key={`tert-${index}`}
                                style={currentStyles.educationItem}
                              >
                                <View style={currentStyles.educationHeader}>
                                  <Text style={currentStyles.educationTitle}>
                                    {edu.certificationType} -{' '}
                                    {edu.instituteName}
                                  </Text>
                                  <Text style={currentStyles.educationDates}>
                                    {formatDate(edu.startDate)} -{' '}
                                    {formatDate(edu.endDate)}
                                  </Text>
                                </View>
                                {edu.description && (
                                  <Text
                                    style={currentStyles.educationDescription}
                                  >
                                    {edu.description}
                                  </Text>
                                )}
                              </View>
                            ))}

                          {/* Secondary Education */}
                          {data.secondEdu &&
                            data.secondEdu.map((edu, index) => (
                              <View
                                key={`second-${index}`}
                                style={currentStyles.educationItem}
                              >
                                <View style={currentStyles.educationHeader}>
                                  <Text style={currentStyles.educationTitle}>
                                    {edu.schoolName}
                                  </Text>
                                  <Text style={currentStyles.educationDates}>
                                    {formatDate(edu.startDate)} -{' '}
                                    {formatDate(edu.endDate)}
                                  </Text>
                                </View>
                                {edu.subjects && (
                                  <View style={currentStyles.educationSubjects}>
                                    <Text
                                      style={
                                        currentStyles.educationSubjectsLabel
                                      }
                                    >
                                      Subjects:{' '}
                                    </Text>
                                    {renderSubjects(edu.subjects)}
                                  </View>
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
                          <Text style={currentStyles.sectionIcon}>⚡</Text>
                          <Text style={currentStyles.sectionTitle}>Skills</Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          <View style={currentStyles.skillsGrid}>
                            {data.skills.map((skill, index) => (
                              <View key={index} style={currentStyles.skillItem}>
                                <Text style={currentStyles.skillName}>
                                  {skill.skill}
                                </Text>
                                {renderProficiency(skill.proficiency)}
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>🌍</Text>
                          <Text style={currentStyles.sectionTitle}>
                            Languages
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          <View style={currentStyles.languagesList}>
                            {data.languages.map((language, index) => (
                              <View
                                key={index}
                                style={currentStyles.languageItem}
                              >
                                <Text style={currentStyles.languageName}>
                                  {language.language}
                                </Text>
                                <View style={currentStyles.languageProficiency}>
                                  <View
                                    style={
                                      currentStyles.languageProficiencyItem
                                    }
                                  >
                                    <Text
                                      style={
                                        currentStyles.languageProficiencyLabel
                                      }
                                    >
                                      Read:{' '}
                                    </Text>
                                    {renderProficiency(language.read)}
                                  </View>
                                  <View
                                    style={
                                      currentStyles.languageProficiencyItem
                                    }
                                  >
                                    <Text
                                      style={
                                        currentStyles.languageProficiencyLabel
                                      }
                                    >
                                      Write:{' '}
                                    </Text>
                                    {renderProficiency(language.write)}
                                  </View>
                                  <View
                                    style={
                                      currentStyles.languageProficiencyItem
                                    }
                                  >
                                    <Text
                                      style={
                                        currentStyles.languageProficiencyLabel
                                      }
                                    >
                                      Speak:{' '}
                                    </Text>
                                    {renderProficiency(language.speak)}
                                  </View>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}

                    {/* References */}
                    {data.references && data.references.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>👥</Text>
                          <Text style={currentStyles.sectionTitle}>
                            References
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          <View style={currentStyles.referencesList}>
                            {data.references.map((reference, index) => (
                              <View
                                key={index}
                                style={currentStyles.referenceItem}
                              >
                                <Text style={currentStyles.referenceName}>
                                  {reference.name}
                                </Text>
                                <Text style={currentStyles.referenceCompany}>
                                  {reference.company}
                                </Text>
                                <View style={currentStyles.referenceContact}>
                                  {reference.email && (
                                    <Text style={currentStyles.referenceEmail}>
                                      {reference.email}
                                    </Text>
                                  )}
                                  {reference.phone && (
                                    <Text style={currentStyles.referencePhone}>
                                      {reference.phone}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* Bottom Section */}
                <View style={currentStyles.bottomSection}>
                  {/* Experience/Projects */}
                  {data.experiences && data.experiences.length > 0 && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionIcon}>🚀</Text>
                        <Text style={currentStyles.sectionTitle}>
                          Additional Experience
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <View style={currentStyles.experiencesGrid}>
                          {data.experiences.map((experience, index) => (
                            <View
                              key={index}
                              style={currentStyles.experienceCard}
                            >
                              <Text style={currentStyles.experienceCardTitle}>
                                {experience.title}
                              </Text>
                              {experience.description && (
                                <Text
                                  style={
                                    currentStyles.experienceCardDescription
                                  }
                                >
                                  {experience.description}
                                </Text>
                              )}
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
                          Interests
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <View style={currentStyles.interestsList}>
                          {data.interests.map((interest, index) => (
                            <View key={index} style={currentStyles.interestTag}>
                              <Text style={currentStyles.interestTagText}>
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
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    )
  }

  const currentStyles = zoom === 'zoomedOut' ? stylesZoomedOut : stylesZoomedIn
  return renderZoomedOut(currentStyles)
}

// Base styles
const styles = StyleSheet.create({
  proficiencyContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  proficiencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  proficiencyDotFilled: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  subjectText: {
    fontSize: 12,
    color: '#6b7280',
  },
})

// Styles for zoomed out view
const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 10,
    width: 380,
    minHeight: 500,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // Header styles
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  photoSection: {
    marginLeft: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contactSidebar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 10,
    width: 20,
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },

  // Summary section
  summarySection: {
    backgroundColor: '#f8fafb',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  summaryContent: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
  },

  // Main content
  mainContent: {
    flexDirection: 'row',
    minHeight: 400,
  },
  leftColumn: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  rightColumn: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafb',
  },

  // Section styles
  section: {
    marginBottom: 25,
  },
  sectionContent: {
    color: '#1f2937',
    lineHeight: 18,
  },

  // Experience items
  experienceItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  experienceHeader: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 3,
  },
  experienceDates: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  experienceDescription: {
    color: '#4b5563',
    lineHeight: 18,
    fontSize: 13,
  },

  // Education items
  educationItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8fafb',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  educationHeader: {
    marginBottom: 8,
  },
  educationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 3,
  },
  educationDates: {
    fontSize: 11,
    color: '#6b7280',
  },
  educationDescription: {
    color: '#4b5563',
    lineHeight: 16,
    marginBottom: 5,
    fontSize: 12,
  },
  educationSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  educationSubjectsLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },

  // Skills grid
  skillsGrid: {
    gap: 10,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  skillName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 13,
  },

  // Languages list
  languagesList: {
    gap: 15,
  },
  languageItem: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  languageName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 8,
  },
  languageProficiency: {
    gap: 6,
  },
  languageProficiencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageProficiencyLabel: {
    fontSize: 11,
    color: '#4b5563',
    minWidth: 40,
  },

  // References list
  referencesList: {
    gap: 15,
  },
  referenceItem: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  referenceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 3,
  },
  referenceCompany: {
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 6,
    fontSize: 12,
  },
  referenceContact: {
    gap: 2,
  },
  referenceEmail: {
    fontSize: 11,
    color: '#6b7280',
  },
  referencePhone: {
    fontSize: 11,
    color: '#6b7280',
  },

  // Bottom section
  bottomSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },

  // Experience cards
  experiencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  experienceCard: {
    flex: 1,
    minWidth: '45%',
    padding: 15,
    backgroundColor: '#f8fafb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderTopWidth: 3,
    borderTopColor: '#6366f1',
  },
  experienceCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 8,
  },
  experienceCardDescription: {
    color: '#4b5563',
    lineHeight: 16,
    fontSize: 12,
  },

  // Interests
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
})

// Styles for zoomed in view (same structure but larger)
const stylesZoomedIn = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 10,
    width: 570,
    minHeight: 750,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // Header styles
  header: {
    backgroundColor: '#6366f1',
    padding: 30,
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  photoSection: {
    marginLeft: 30,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contactSidebar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 24,
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },

  // Summary section
  summarySection: {
    backgroundColor: '#f8fafb',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 40,
    height: 40,
    backgroundColor: '#6366f1',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  summaryContent: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#f59e0b',
  },
  summaryText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#4b5563',
  },

  // Main content
  mainContent: {
    flexDirection: 'row',
    minHeight: 600,
  },
  leftColumn: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  rightColumn: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f8fafb',
  },

  // Section styles
  section: {
    marginBottom: 35,
  },
  sectionContent: {
    color: '#1f2937',
    lineHeight: 22,
  },

  // Experience items
  experienceItem: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  experienceHeader: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 5,
  },
  experienceCompany: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 5,
  },
  experienceDates: {
    fontSize: 14,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  experienceDescription: {
    color: '#4b5563',
    lineHeight: 22,
    fontSize: 16,
  },

  // Education items
  educationItem: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: '#f8fafb',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  educationHeader: {
    marginBottom: 12,
  },
  educationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 5,
  },
  educationDates: {
    fontSize: 14,
    color: '#6b7280',
  },
  educationDescription: {
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 8,
    fontSize: 15,
  },
  educationSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  educationSubjectsLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },

  // Skills grid
  skillsGrid: {
    gap: 15,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  skillName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 16,
  },

  // Languages list
  languagesList: {
    gap: 20,
  },
  languageItem: {
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  languageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 12,
  },
  languageProficiency: {
    gap: 8,
  },
  languageProficiencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageProficiencyLabel: {
    fontSize: 14,
    color: '#4b5563',
    minWidth: 50,
  },

  // References list
  referencesList: {
    gap: 20,
  },
  referenceItem: {
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  referenceName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 5,
  },
  referenceCompany: {
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
    fontSize: 15,
  },
  referenceContact: {
    gap: 3,
  },
  referenceEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  referencePhone: {
    fontSize: 14,
    color: '#6b7280',
  },

  // Bottom section
  bottomSection: {
    padding: 30,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },

  // Experience cards
  experiencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  experienceCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    backgroundColor: '#f8fafb',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderTopWidth: 4,
    borderTopColor: '#6366f1',
  },
  experienceCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 12,
  },
  experienceCardDescription: {
    color: '#4b5563',
    lineHeight: 20,
    fontSize: 15,
  },

  // Interests
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestTag: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestTagText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
})

export default Template03
