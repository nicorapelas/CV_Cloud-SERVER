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

const Template04 = ({
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
                {/* Header Section */}
                <View style={currentStyles.header}>
                  <View style={currentStyles.headerContent}>
                    <View style={currentStyles.photoSection}>
                      {data.assignedPhotoUrl &&
                        data.assignedPhotoUrl !== 'noneAssigned' && (
                          <Image
                            source={{ uri: data.assignedPhotoUrl }}
                            style={currentStyles.photo}
                            resizeMode="cover"
                          />
                        )}
                    </View>
                    <View style={currentStyles.infoSection}>
                      <Text style={currentStyles.name}>
                        {data.personalInfo?.fullName || 'Your Name'}
                      </Text>
                      <Text style={currentStyles.title}>Professional CV</Text>
                      <View style={currentStyles.contactGrid}>
                        {data.contactInfo?.email && (
                          <View style={currentStyles.contactItem}>
                            <Text style={currentStyles.contactIcon}>✉</Text>
                            <Text style={currentStyles.contactText}>
                              {data.contactInfo.email}
                            </Text>
                          </View>
                        )}
                        {data.contactInfo?.phone && (
                          <View style={currentStyles.contactItem}>
                            <Text style={currentStyles.contactIcon}>📱</Text>
                            <Text style={currentStyles.contactText}>
                              {data.contactInfo.phone}
                            </Text>
                          </View>
                        )}
                        {data.contactInfo?.address && (
                          <View style={currentStyles.contactItem}>
                            <Text style={currentStyles.contactIcon}>📍</Text>
                            <Text style={currentStyles.contactText}>
                              {data.contactInfo.address}
                              {data.contactInfo.unit &&
                                `, ${data.contactInfo.unit}`}
                              {data.contactInfo.suburb &&
                                `, ${data.contactInfo.suburb}`}
                              {data.contactInfo.city &&
                                `, ${data.contactInfo.city}`}
                              {data.contactInfo.province &&
                                `, ${data.contactInfo.province}`}
                              {data.contactInfo.postalCode &&
                                `, ${data.contactInfo.postalCode}`}
                              {data.contactInfo.country &&
                                `, ${data.contactInfo.country}`}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Main Content Grid */}
                <View style={currentStyles.mainContent}>
                  {/* Left Column */}
                  <View style={currentStyles.leftColumn}>
                    {/* Professional Summary */}
                    {data.personalSummary?.content && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>💼</Text>
                          <Text style={currentStyles.sectionTitle}>
                            Summary
                          </Text>
                        </View>
                        <View style={currentStyles.sectionContent}>
                          <Text style={currentStyles.summaryText}>
                            {data.personalSummary.content}
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Work Experience */}
                    {data.employHistorys && data.employHistorys.length > 0 && (
                      <View style={currentStyles.section}>
                        <View style={currentStyles.sectionHeader}>
                          <Text style={currentStyles.sectionIcon}>💼</Text>
                          <Text style={currentStyles.sectionTitle}>
                            Experience
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
                                {edu.subjects && edu.subjects.length > 0 && (
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
                                {edu.additionalInfo && (
                                  <Text
                                    style={currentStyles.educationDescription}
                                  >
                                    {edu.additionalInfo}
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
                              <View
                                key={index}
                                style={currentStyles.interestTag}
                              >
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

                {/* Bottom Section */}
                <View style={currentStyles.bottomSection}>
                  {/* Experience/Projects */}
                  {data.experiences && data.experiences.length > 0 && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionIcon}>🚀</Text>
                        <Text style={currentStyles.sectionTitle}>Projects</Text>
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
    backgroundColor: '#06b6d4',
    borderColor: '#06b6d4',
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
    backgroundColor: '#1e293b',
    marginTop: 5,
    marginLeft: 10,
    width: 380,
    minHeight: 500,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  // Header styles
  header: {
    backgroundColor: '#06b6d4',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  photoSection: {
    flexShrink: 0,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  contactGrid: {
    flexDirection: 'column',
    gap: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactIcon: {
    fontSize: 12,
    width: 16,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    flex: 1,
  },

  // Main content
  mainContent: {
    flexDirection: 'row',
    minHeight: 400,
  },
  leftColumn: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e293b',
    borderRightWidth: 1,
    borderRightColor: '#475569',
  },
  rightColumn: {
    flex: 1,
    padding: 20,
    backgroundColor: '#334155',
  },

  // Section styles
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#06b6d4',
  },
  sectionIcon: {
    fontSize: 16,
    width: 30,
    height: 30,
    backgroundColor: '#06b6d4',
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f8fafc',
  },
  sectionContent: {
    color: '#cbd5e1',
    lineHeight: 18,
  },

  // Summary
  summaryText: {
    backgroundColor: '#334155',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#06b6d4',
    fontSize: 12,
    lineHeight: 16,
    color: '#cbd5e1',
  },

  // Experience items
  experienceItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    borderLeftWidth: 3,
    borderLeftColor: '#06b6d4',
  },
  experienceHeader: {
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 3,
  },
  experienceDates: {
    fontSize: 10,
    color: '#94a3b8',
    backgroundColor: '#475569',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  experienceDescription: {
    color: '#cbd5e1',
    lineHeight: 16,
    fontSize: 11,
  },

  // Education items
  educationItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#475569',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#67e8f9',
  },
  educationHeader: {
    marginBottom: 8,
  },
  educationTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#67e8f9',
    marginBottom: 3,
  },
  educationDates: {
    fontSize: 10,
    color: '#94a3b8',
  },
  educationDescription: {
    color: '#cbd5e1',
    lineHeight: 14,
    marginBottom: 5,
    fontSize: 10,
  },
  educationSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  educationSubjectsLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
  },

  // Skills grid
  skillsGrid: {
    gap: 8,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1e293b',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  skillName: {
    fontWeight: '600',
    color: '#f8fafc',
    fontSize: 11,
  },

  // Languages list
  languagesList: {
    gap: 12,
  },
  languageItem: {
    padding: 12,
    backgroundColor: '#1e293b',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  languageName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 8,
  },
  languageProficiency: {
    gap: 4,
  },
  languageProficiencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageProficiencyLabel: {
    fontSize: 9,
    color: '#94a3b8',
    minWidth: 40,
  },

  // References list
  referencesList: {
    gap: 12,
  },
  referenceItem: {
    padding: 12,
    backgroundColor: '#1e293b',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  referenceName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 3,
  },
  referenceCompany: {
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 6,
    fontSize: 11,
  },
  referenceContact: {
    gap: 2,
  },
  referenceEmail: {
    fontSize: 9,
    color: '#94a3b8',
  },
  referencePhone: {
    fontSize: 9,
    color: '#94a3b8',
  },

  // Bottom section
  bottomSection: {
    padding: 20,
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#475569',
  },

  // Experience cards
  experiencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  experienceCard: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    backgroundColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    borderTopWidth: 3,
    borderTopColor: '#06b6d4',
  },
  experienceCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 6,
  },
  experienceCardDescription: {
    color: '#cbd5e1',
    lineHeight: 14,
    fontSize: 10,
  },

  // Interests
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestTag: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  interestTagText: {
    color: '#ffffff',
    fontSize: 9,
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
    backgroundColor: '#1e293b',
    marginTop: 5,
    marginLeft: 10,
    width: 570,
    minHeight: 750,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  // Header styles
  header: {
    backgroundColor: '#06b6d4',
    padding: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  photoSection: {
    flexShrink: 0,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 18,
  },
  contactGrid: {
    flexDirection: 'column',
    gap: 9,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    flex: 1,
  },

  // Main content
  mainContent: {
    flexDirection: 'row',
    minHeight: 600,
  },
  leftColumn: {
    flex: 1,
    padding: 30,
    backgroundColor: '#1e293b',
    borderRightWidth: 1,
    borderRightColor: '#475569',
  },
  rightColumn: {
    flex: 1,
    padding: 30,
    backgroundColor: '#334155',
  },

  // Section styles
  section: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#06b6d4',
  },
  sectionIcon: {
    fontSize: 24,
    width: 40,
    height: 40,
    backgroundColor: '#06b6d4',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#f8fafc',
  },
  sectionContent: {
    color: '#cbd5e1',
    lineHeight: 22,
  },

  // Summary
  summaryText: {
    backgroundColor: '#334155',
    padding: 25,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
    fontSize: 18,
    lineHeight: 26,
    color: '#cbd5e1',
  },

  // Experience items
  experienceItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#334155',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
  },
  experienceHeader: {
    marginBottom: 12,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 5,
  },
  experienceCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 5,
  },
  experienceDates: {
    fontSize: 15,
    color: '#94a3b8',
    backgroundColor: '#475569',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  experienceDescription: {
    color: '#cbd5e1',
    lineHeight: 22,
    fontSize: 16,
  },

  // Education items
  educationItem: {
    marginBottom: 18,
    padding: 18,
    backgroundColor: '#475569',
    borderRadius: 9,
    borderLeftWidth: 4,
    borderLeftColor: '#67e8f9',
  },
  educationHeader: {
    marginBottom: 12,
  },
  educationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#67e8f9',
    marginBottom: 5,
  },
  educationDates: {
    fontSize: 15,
    color: '#94a3b8',
  },
  educationDescription: {
    color: '#cbd5e1',
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
    fontSize: 15,
    color: '#94a3b8',
    fontWeight: '600',
  },

  // Skills grid
  skillsGrid: {
    gap: 12,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1e293b',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#475569',
  },
  skillName: {
    fontWeight: '600',
    color: '#f8fafc',
    fontSize: 16,
  },

  // Languages list
  languagesList: {
    gap: 18,
  },
  languageItem: {
    padding: 18,
    backgroundColor: '#1e293b',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#475569',
  },
  languageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 12,
  },
  languageProficiency: {
    gap: 6,
  },
  languageProficiencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageProficiencyLabel: {
    fontSize: 14,
    color: '#94a3b8',
    minWidth: 60,
  },

  // References list
  referencesList: {
    gap: 18,
  },
  referenceItem: {
    padding: 18,
    backgroundColor: '#1e293b',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#475569',
  },
  referenceName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 5,
  },
  referenceCompany: {
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 8,
    fontSize: 16,
  },
  referenceContact: {
    gap: 3,
  },
  referenceEmail: {
    fontSize: 14,
    color: '#94a3b8',
  },
  referencePhone: {
    fontSize: 14,
    color: '#94a3b8',
  },

  // Bottom section
  bottomSection: {
    padding: 30,
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#475569',
  },

  // Experience cards
  experiencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  experienceCard: {
    flex: 1,
    minWidth: '45%',
    padding: 18,
    backgroundColor: '#334155',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    borderTopWidth: 4,
    borderTopColor: '#06b6d4',
  },
  experienceCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 12,
  },
  experienceCardDescription: {
    color: '#cbd5e1',
    lineHeight: 20,
    fontSize: 15,
  },

  // Interests
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  interestTag: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  interestTagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
})

export default Template04
