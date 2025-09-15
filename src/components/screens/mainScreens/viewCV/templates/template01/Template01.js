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

const Template01 = ({
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

    // Handle different date formats more robustly
    let momentDate
    try {
      // Check if it's a "Month YYYY" format first to avoid warnings
      if (
        typeof dateString === 'string' &&
        dateString.includes(' ') &&
        !dateString.includes('-') &&
        !dateString.includes('/')
      ) {
        momentDate = moment(dateString, 'MMMM YYYY')
      } else {
        // Try parsing with moment for other formats
        momentDate = moment(dateString)
      }

      // If moment can't parse it properly, try some common formats
      if (!momentDate.isValid()) {
        // Try ISO format
        momentDate = moment(dateString, moment.ISO_8601)

        // If still invalid, try other common formats
        if (!momentDate.isValid()) {
          momentDate = moment(dateString, [
            'YYYY-MM-DD',
            'MM/DD/YYYY',
            'DD/MM/YYYY',
          ])
        }
      }

      // If still invalid, return the original string
      if (!momentDate.isValid()) {
        return dateString
      }

      return momentDate.format('MMM YYYY')
    } catch (error) {
      console.warn('Date formatting error:', error, 'for date:', dateString)
      return dateString
    }
  }

  // Helper function to render proficiency dots
  const renderProficiency = (level) => {
    const maxLevel = 5
    const filledDots = Math.min(level, maxLevel)
    const emptyDots = maxLevel - filledDots

    return (
      <View style={currentStyles.skillLevel}>
        {[...Array(filledDots)].map((_, i) => (
          <View
            key={`filled-${i}`}
            style={[currentStyles.skillDot, currentStyles.skillDotFilled]}
          />
        ))}
        {[...Array(emptyDots)].map((_, i) => (
          <View key={`empty-${i}`} style={currentStyles.skillDot} />
        ))}
      </View>
    )
  }

  // Helper function to render subjects array
  const renderSubjects = (subjects) => {
    if (!subjects || !Array.isArray(subjects)) return ''
    return subjects.map((subject) => subject.subject || subject).join(', ')
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
                    {data.assignedPhotoUrl &&
                      data.assignedPhotoUrl !== 'noneAssigned' && (
                        <Image
                          source={{ uri: data.assignedPhotoUrl }}
                          style={currentStyles.photo}
                          resizeMode="cover"
                        />
                      )}

                    <Text style={currentStyles.name}>
                      {data.personalInfo?.fullName || 'Your Name'}
                    </Text>

                    {/* Contact Info */}
                    <View style={currentStyles.contactGrid}>
                      {data.contactInfo?.email && (
                        <View style={currentStyles.contactItem}>
                          <Text style={currentStyles.contactIcon}>📧</Text>
                          <Text style={currentStyles.contactText}>
                            {data.contactInfo.email}
                          </Text>
                        </View>
                      )}
                      {data.contactInfo?.phone && (
                        <View style={currentStyles.contactItem}>
                          <Text style={currentStyles.contactIcon}>📞</Text>
                          <Text style={currentStyles.contactText}>
                            {data.contactInfo.phone}
                          </Text>
                        </View>
                      )}
                      {(data.contactInfo?.address ||
                        data.contactInfo?.suburb ||
                        data.contactInfo?.city) && (
                        <View style={currentStyles.contactItem}>
                          <Text style={currentStyles.contactIcon}>📍</Text>
                          <Text style={currentStyles.contactText}>
                            {[
                              data.contactInfo?.address,
                              data.contactInfo?.suburb,
                              data.contactInfo?.city,
                              data.contactInfo?.province,
                              data.contactInfo?.country,
                            ]
                              .filter(Boolean)
                              .join(', ')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={currentStyles.content}>
                  {/* Personal Information */}
                  {data.personalInfo && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>👤</Text>{' '}
                          Personal Information
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <View style={currentStyles.personalGrid}>
                          {data.personalInfo.dateOfBirth && (
                            <View style={currentStyles.personalItem}>
                              <Text style={currentStyles.personalIcon}>📅</Text>
                              <Text style={currentStyles.personalLabel}>
                                Date of Birth:
                              </Text>
                              <Text style={currentStyles.personalValue}>
                                {moment(data.personalInfo.dateOfBirth).format(
                                  'MMMM D, YYYY'
                                )}
                              </Text>
                            </View>
                          )}
                          {data.personalInfo.gender && (
                            <View style={currentStyles.personalItem}>
                              <Text style={currentStyles.personalIcon}>👤</Text>
                              <Text style={currentStyles.personalLabel}>
                                Gender:
                              </Text>
                              <Text style={currentStyles.personalValue}>
                                {data.personalInfo.gender}
                              </Text>
                            </View>
                          )}
                          {data.personalInfo.nationality && (
                            <View style={currentStyles.personalItem}>
                              <Text style={currentStyles.personalIcon}>🌍</Text>
                              <Text style={currentStyles.personalLabel}>
                                Nationality:
                              </Text>
                              <Text style={currentStyles.personalValue}>
                                {data.personalInfo.nationality}
                              </Text>
                            </View>
                          )}
                          {data.personalInfo.driversLicense && (
                            <View style={currentStyles.personalItem}>
                              <Text style={currentStyles.personalIcon}>🚗</Text>
                              <Text style={currentStyles.personalLabel}>
                                Driver's License:
                              </Text>
                              <Text style={currentStyles.personalValue}>
                                {data.personalInfo.licenseCode || 'Yes'}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Personal Summary */}
                  {data.personalSummary && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>📝</Text>{' '}
                          Professional Summary
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <Text style={currentStyles.itemDescription}>
                          {data.personalSummary?.content}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Employment History */}
                  {data.employHistorys && data.employHistorys.length > 0 && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>💼</Text>{' '}
                          Employment History
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        {data.employHistorys.map((history, index) => (
                          <View key={index} style={currentStyles.item}>
                            <View style={currentStyles.itemHeader}>
                              <Text style={currentStyles.itemTitle}>
                                {history.position}
                              </Text>
                              <Text style={currentStyles.itemDate}>
                                {formatDate(history.startDate)} -{' '}
                                {history.endDate
                                  ? formatDate(history.endDate)
                                  : 'Present'}
                              </Text>
                            </View>
                            <Text style={currentStyles.itemSubtitle}>
                              {history.company}
                            </Text>
                            {history.description && (
                              <Text style={currentStyles.itemDescription}>
                                {history.description}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Experience */}
                  {data.experiences && data.experiences.length > 0 && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>🎯</Text>{' '}
                          Experience
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        {data.experiences.map((experience, index) => (
                          <View key={index} style={currentStyles.item}>
                            <View style={currentStyles.itemHeader}>
                              <Text style={currentStyles.itemTitle}>
                                {experience.title}
                              </Text>
                              <Text style={currentStyles.itemDate}>
                                {formatDate(experience.startDate)} -{' '}
                                {experience.endDate
                                  ? formatDate(experience.endDate)
                                  : 'Present'}
                              </Text>
                            </View>
                            <Text style={currentStyles.itemSubtitle}>
                              {experience.company}
                            </Text>
                            {experience.description && (
                              <Text style={currentStyles.itemDescription}>
                                {experience.description}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Education */}
                  {(data.secondEdu?.length > 0 ||
                    data.tertEdus?.length > 0) && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>🎓</Text>{' '}
                          Education
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        {data.tertEdus?.map((edu, index) => (
                          <View
                            key={`tert-${index}`}
                            style={currentStyles.item}
                          >
                            <View style={currentStyles.itemHeader}>
                              <Text style={currentStyles.itemTitle}>
                                {edu.schoolName}
                              </Text>
                              <Text style={currentStyles.itemDate}>
                                {formatDate(edu.startDate)} -{' '}
                                {edu.endDate
                                  ? formatDate(edu.endDate)
                                  : 'Present'}
                              </Text>
                            </View>
                            <Text style={currentStyles.itemSubtitle}>
                              {edu.schoolName}
                            </Text>
                            {edu.subjects && (
                              <Text style={currentStyles.itemDescription}>
                                Subjects: {renderSubjects(edu.subjects)}
                              </Text>
                            )}
                          </View>
                        ))}
                        {data.secondEdu?.map((edu, index) => (
                          <View
                            key={`second-${index}`}
                            style={currentStyles.item}
                          >
                            <View style={currentStyles.itemHeader}>
                              <Text style={currentStyles.itemTitle}>
                                {edu.schoolName}
                              </Text>
                              <Text style={currentStyles.itemDate}>
                                {formatDate(edu.startDate)} -{' '}
                                {edu.endDate
                                  ? formatDate(edu.endDate)
                                  : 'Present'}
                              </Text>
                            </View>
                            <Text style={currentStyles.itemSubtitle}>
                              {edu.schoolName}
                            </Text>
                            {edu.subjects && (
                              <Text style={currentStyles.itemDescription}>
                                Subjects: {renderSubjects(edu.subjects)}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Skills */}
                  {data.skills && data.skills.length > 0 && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>🛠️</Text>{' '}
                          Skills
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <View style={currentStyles.skillsGrid}>
                          {data.skills.map((skill, index) => (
                            <View key={index} style={currentStyles.skillItem}>
                              <Text style={currentStyles.skillName}>
                                {skill.skill}
                              </Text>
                              {renderProficiency(skill.level || 3)}
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
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>🌐</Text>{' '}
                          Languages
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <View style={currentStyles.skillsGrid}>
                          {data.languages.map((language, index) => (
                            <View key={index} style={currentStyles.skillItem}>
                              <Text style={currentStyles.skillName}>
                                {language.language}
                              </Text>
                              {renderProficiency(language.level || 3)}
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
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>🎨</Text>{' '}
                          Interests
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        <Text style={currentStyles.itemDescription}>
                          {data.interests
                            .map((interest) => interest.interest)
                            .join(', ')}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* References */}
                  {data.references && data.references.length > 0 && (
                    <View style={currentStyles.section}>
                      <View style={currentStyles.sectionHeader}>
                        <Text style={currentStyles.sectionTitle}>
                          <Text style={currentStyles.sectionIcon}>👥</Text>{' '}
                          References
                        </Text>
                      </View>
                      <View style={currentStyles.sectionContent}>
                        {data.references.map((reference, index) => (
                          <View key={index} style={currentStyles.item}>
                            <Text style={currentStyles.itemTitle}>
                              {reference.name}
                            </Text>
                            <Text style={currentStyles.itemSubtitle}>
                              {reference.position}
                            </Text>
                            <Text style={currentStyles.itemSubtitle}>
                              {reference.company}
                            </Text>
                            {reference.phone && (
                              <Text style={currentStyles.itemDescription}>
                                Phone: {reference.phone}
                              </Text>
                            )}
                            {reference.email && (
                              <Text style={currentStyles.itemDescription}>
                                Email: {reference.email}
                              </Text>
                            )}
                          </View>
                        ))}
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
    width: '100%',
  },
  header: {
    backgroundColor: '#278acd',
    padding: 16,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  contactGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  contactIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  contactText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#f8fafc',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#278acd',
  },
  sectionIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  sectionContent: {
    paddingHorizontal: 8,
  },
  personalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  personalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    minWidth: '45%',
    flex: 1,
    marginBottom: 4,
  },
  personalIcon: {
    fontSize: 12,
    marginRight: 8,
    width: 16,
    color: '#278acd',
  },
  personalLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748b',
    minWidth: 60,
  },
  personalValue: {
    fontSize: 10,
    color: '#1e293b',
    fontWeight: '500',
    flex: 1,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  itemDate: {
    fontSize: 7,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 8,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 7,
    color: '#64748b',
    lineHeight: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    minWidth: '45%',
  },
  skillName: {
    fontSize: 8,
    color: '#1e293b',
    marginRight: 6,
    flex: 1,
  },
  skillLevel: {
    flexDirection: 'row',
    gap: 2,
  },
  skillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
  },
  skillDotFilled: {
    backgroundColor: '#f59e0b',
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
    width: 760,
    minHeight: 1000,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  header: {
    backgroundColor: '#278acd',
    padding: 24,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  contactText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#278acd',
  },
  sectionIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  sectionContent: {
    paddingHorizontal: 12,
  },
  personalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  personalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    minWidth: '45%',
    flex: 1,
    marginBottom: 6,
  },
  personalIcon: {
    fontSize: 16,
    marginRight: 10,
    width: 20,
    color: '#278acd',
  },
  personalLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    minWidth: 80,
  },
  personalValue: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '500',
    flex: 1,
  },
  item: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  itemDate: {
    fontSize: 10,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 9,
    color: '#64748b',
    lineHeight: 12,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    minWidth: '45%',
  },
  skillName: {
    fontSize: 10,
    color: '#1e293b',
    marginRight: 8,
    flex: 1,
  },
  skillLevel: {
    flexDirection: 'row',
    gap: 3,
  },
  skillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
  },
  skillDotFilled: {
    backgroundColor: '#f59e0b',
  },
})

export default Template01
