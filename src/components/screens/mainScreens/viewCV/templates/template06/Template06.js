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

const Template06 = ({
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

  // Determine current styles based on zoom
  const currentStyles = zoom === 'zoomedIn' ? stylesZoomedIn : stylesZoomedOut

  const renderZoomedOut = (currentStyles) => {
    return (
      <View style={currentStyles.bed}>
        {headerWithZoom()}
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
          <ScrollView horizontal style={{ backgroundColor: '#ffffff' }}>
            <View style={currentStyles.cvBed}>
              <View style={currentStyles.container}>
                {/* Newspaper Masthead */}
                <View style={currentStyles.masthead}>
                  <Text style={currentStyles.mastheadTitle}>
                    THE CURRICULUM VITAE
                  </Text>
                  <View style={currentStyles.mastheadDate}>
                    <Text style={currentStyles.dateText}>
                      {moment().format('MMMM D, YYYY')}
                    </Text>
                    <Text style={currentStyles.volumeText}>Vol. 1, No. 1</Text>
                  </View>
                </View>

                {/* Front Page Headlines */}
                <View style={currentStyles.frontPage}>
                  <View style={currentStyles.headlineSection}>
                    <Text style={currentStyles.name}>
                      {data.personalInfo?.fullName || 'PROFESSIONAL PROFILE'}
                    </Text>
                    <Text style={currentStyles.subheadline}>
                      {data.personalSummary?.summary ||
                        'Experienced Professional Seeking New Opportunities'}
                    </Text>
                  </View>

                  {/* Photo Section */}
                  {data.assignedPhotoUrl &&
                    data.assignedPhotoUrl !== 'noneAssigned' && (
                      <View style={currentStyles.photoSection}>
                        <Image
                          source={{ uri: data.assignedPhotoUrl }}
                          style={currentStyles.photo}
                          resizeMode="cover"
                        />
                        <Text style={currentStyles.photoCaption}>
                          Professional Headshot
                        </Text>
                      </View>
                    )}
                </View>

                {/* Contact Information */}
                <View style={currentStyles.contactSection}>
                  <Text style={currentStyles.sectionTitle}>
                    CONTACT INFORMATION
                  </Text>
                  <View style={currentStyles.contactGrid}>
                    {data.contactInfo?.email && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactText}>
                          <Text style={currentStyles.contactLabel}>Email:</Text>{' '}
                          {data.contactInfo.email}
                        </Text>
                      </View>
                    )}
                    {data.contactInfo?.phone && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactText}>
                          <Text style={currentStyles.contactLabel}>Phone:</Text>{' '}
                          {data.contactInfo.phone}
                        </Text>
                      </View>
                    )}
                    {(data.contactInfo?.address || data.contactInfo?.city) && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactText}>
                          <Text style={currentStyles.contactLabel}>
                            Location:
                          </Text>{' '}
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

                {/* Personal Information Section */}
                {data.personalInfo && (
                  <View style={currentStyles.section}>
                    <View style={currentStyles.sectionHeader}>
                      <Text style={currentStyles.sectionTitle}>
                        PERSONAL DETAILS
                      </Text>
                    </View>
                    <View style={currentStyles.sectionContent}>
                      <View style={currentStyles.personalGrid}>
                        {data.personalInfo?.dateOfBirth && (
                          <View style={currentStyles.personalItem}>
                            <Text style={currentStyles.personalLabel}>
                              Date of Birth:
                            </Text>
                            <Text style={currentStyles.personalValue}>
                              {formatDate(data.personalInfo.dateOfBirth)}
                            </Text>
                          </View>
                        )}
                        {data.personalInfo?.nationality && (
                          <View style={currentStyles.personalItem}>
                            <Text style={currentStyles.personalLabel}>
                              Nationality:
                            </Text>
                            <Text style={currentStyles.personalValue}>
                              {data.personalInfo.nationality}
                            </Text>
                          </View>
                        )}
                        {data.personalInfo?.gender && (
                          <View style={currentStyles.personalItem}>
                            <Text style={currentStyles.personalLabel}>
                              Gender:
                            </Text>
                            <Text style={currentStyles.personalValue}>
                              {data.personalInfo.gender}
                            </Text>
                          </View>
                        )}
                        {data.personalInfo?.driversLicense && (
                          <View style={currentStyles.personalItem}>
                            <Text style={currentStyles.personalLabel}>
                              Driver's License:
                            </Text>
                            <Text style={currentStyles.personalValue}>
                              {data.personalInfo.licenseCode || 'Valid'}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                )}

                {/* Two Column Layout */}
                <View style={currentStyles.columns}>
                  {/* Left Column */}
                  <View style={currentStyles.leftColumn}>
                    {/* Professional Summary */}
                    {data.personalSummary?.summary && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          PROFESSIONAL SUMMARY
                        </Text>
                        <Text style={currentStyles.summaryText}>
                          {data.personalSummary.summary}
                        </Text>
                      </View>
                    )}

                    {/* Work Experience */}
                    {data.experiences && data.experiences.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          WORK EXPERIENCE
                        </Text>
                        {data.experiences.map((experience, index) => (
                          <View
                            key={index}
                            style={currentStyles.experienceItem}
                          >
                            <Text style={currentStyles.experienceTitle}>
                              {experience.title}
                            </Text>
                            {experience.description && (
                              <Text style={currentStyles.experienceDescription}>
                                {experience.description}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Employment History */}
                    {data.employHistorys && data.employHistorys.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          EMPLOYMENT HISTORY
                        </Text>
                        {data.employHistorys.map((employment, index) => (
                          <View
                            key={index}
                            style={currentStyles.employmentItem}
                          >
                            <View style={currentStyles.employmentHeader}>
                              <Text style={currentStyles.employmentTitle}>
                                {employment.position}
                              </Text>
                              <Text style={currentStyles.employmentCompany}>
                                {employment.company}
                              </Text>
                              <Text style={currentStyles.employmentDates}>
                                {employment.startDate} -{' '}
                                {employment.current
                                  ? 'Present'
                                  : employment.endDate}
                              </Text>
                            </View>
                            {employment.description && (
                              <Text style={currentStyles.employmentDescription}>
                                {employment.description}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Right Column */}
                  <View style={currentStyles.rightColumn}>
                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>SKILLS</Text>
                        {data.skills.map((skill, index) => (
                          <View key={index} style={currentStyles.skillItem}>
                            <Text style={currentStyles.skillName}>
                              {skill.skill}
                            </Text>
                            {renderProficiency(skill.proficiency)}
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          LANGUAGES
                        </Text>
                        {data.languages.map((language, index) => (
                          <View key={index} style={currentStyles.languageItem}>
                            <Text style={currentStyles.languageName}>
                              {language.language}
                            </Text>
                            <Text style={currentStyles.languageProficiency}>
                              Read: {language.read}/5 | Write: {language.write}
                              /5 | Speak: {language.speak}/5
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Personal Attributes */}
                    {data.attributes && data.attributes.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          PERSONAL ATTRIBUTES
                        </Text>
                        <View style={currentStyles.attributesGrid}>
                          {data.attributes.map((attribute, index) => (
                            <View
                              key={index}
                              style={currentStyles.attributeTag}
                            >
                              <Text style={currentStyles.attributeText}>
                                {attribute.attribute}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          INTERESTS
                        </Text>
                        <View style={currentStyles.interestsGrid}>
                          {data.interests.map((interest, index) => (
                            <View key={index} style={currentStyles.interestTag}>
                              <Text style={currentStyles.interestText}>
                                {interest.interest}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                {/* Education Section */}
                {(data.tertEdus && data.tertEdus.length > 0) ||
                (data.secondEdu && data.secondEdu.length > 0) ? (
                  <View style={currentStyles.section}>
                    <View style={currentStyles.sectionHeader}>
                      <Text style={currentStyles.sectionTitle}>EDUCATION</Text>
                    </View>
                    <View style={currentStyles.sectionContent}>
                      {/* Tertiary Education */}
                      {data.tertEdus &&
                        data.tertEdus.map((education, index) => (
                          <View key={index} style={currentStyles.item}>
                            <View style={currentStyles.itemHeader}>
                              <Text style={currentStyles.itemTitle}>
                                {education.qualification}
                              </Text>
                              <Text style={currentStyles.itemDate}>
                                {formatDate(education.startDate)} -{' '}
                                {education.endDate
                                  ? formatDate(education.endDate)
                                  : 'Present'}
                              </Text>
                            </View>
                            <Text style={currentStyles.itemSubtitle}>
                              {education.institution}
                            </Text>
                            {education.subjects && (
                              <Text style={currentStyles.itemDescription}>
                                Subjects: {renderSubjects(education.subjects)}
                              </Text>
                            )}
                          </View>
                        ))}

                      {/* Secondary Education */}
                      {data.secondEdu &&
                        data.secondEdu.map((education, index) => (
                          <View key={index} style={currentStyles.item}>
                            <View style={currentStyles.itemHeader}>
                              <Text style={currentStyles.itemTitle}>
                                {education.qualification}
                              </Text>
                              <Text style={currentStyles.itemDate}>
                                {formatDate(education.startDate)} -{' '}
                                {education.endDate
                                  ? formatDate(education.endDate)
                                  : 'Present'}
                              </Text>
                            </View>
                            <Text style={currentStyles.itemSubtitle}>
                              {education.institution}
                            </Text>
                            {education.subjects && (
                              <Text style={currentStyles.itemDescription}>
                                Subjects: {renderSubjects(education.subjects)}
                              </Text>
                            )}
                          </View>
                        ))}
                    </View>
                  </View>
                ) : null}

                {/* Interests Section */}
                {data.interests && data.interests.length > 0 && (
                  <View style={currentStyles.section}>
                    <View style={currentStyles.sectionHeader}>
                      <Text style={currentStyles.sectionIcon}>🎯</Text>
                      <Text style={currentStyles.sectionTitle}>INTERESTS</Text>
                    </View>
                    <View style={currentStyles.sectionContent}>
                      <View style={currentStyles.interestsGrid}>
                        {data.interests.map((interest, index) => (
                          <View key={index} style={currentStyles.interestTag}>
                            <Text style={currentStyles.interestText}>
                              {interest.interest}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                )}

                {/* References Section */}
                {data.references && data.references.length > 0 && (
                  <View style={currentStyles.section}>
                    <View style={currentStyles.sectionHeader}>
                      <Text style={currentStyles.sectionTitle}>REFERENCES</Text>
                    </View>
                    <View style={currentStyles.sectionContent}>
                      {data.references.map((reference, index) => (
                        <View key={index} style={currentStyles.item}>
                          <Text style={currentStyles.itemTitle}>
                            {reference.name}
                          </Text>
                          <Text style={currentStyles.itemSubtitle}>
                            {reference.position} at {reference.company}
                          </Text>
                          {reference.contact && (
                            <Text style={currentStyles.itemDescription}>
                              Contact: {reference.contact}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Footer */}
                <View style={currentStyles.footer}>
                  <Text style={currentStyles.footerText}>
                    Published by CV Cloud - Professional CV Services
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

// Styles following Template01's proven patterns but with newspaper theme
const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    width: 380,
    minHeight: 500,
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Times New Roman',
  },
  masthead: {
    backgroundColor: '#000000',
    padding: 20,

    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
  },
  mastheadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  mastheadDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  dateText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  volumeText: {
    fontSize: 10,
    color: '#ffffff',
    fontStyle: 'italic',
  },
  subheadline: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  frontPage: {
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    paddingBottom: 20,
    marginBottom: 20,
  },
  headlineSection: {
    textAlign: 'center',
    marginBottom: 15,
  },
  photoSection: {
    alignItems: 'center',
    marginTop: 15,
  },
  photoCaption: {
    fontSize: 9,
    fontStyle: 'italic',
    marginTop: 8,
    color: '#666666',
    textAlign: 'center',
  },
  contactSection: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 15,
    marginBottom: 20,
  },
  contactLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 0,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#000000',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactGrid: {
    marginTop: 15,
  },
  contactItem: {
    marginBottom: 8,
  },
  contactText: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 16,
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
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    margin: 0,
  },
  sectionContent: {
    paddingHorizontal: 12,
  },
  columns: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftColumn: {
    flex: 2,
    marginRight: 20,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 14,
  },
  employmentItem: {
    marginBottom: 20,
  },
  employmentHeader: {
    marginBottom: 4,
  },
  employmentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  employmentCompany: {
    fontSize: 10,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 2,
  },
  employmentDates: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
  },
  employmentDescription: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 14,
  },
  languageItem: {
    marginBottom: 12,
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  languageProficiency: {
    fontSize: 9,
    color: '#666666',
  },
  personalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  personalItem: {
    minWidth: '45%',
    flex: 1,
    marginBottom: 6,
  },
  personalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  personalValue: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 16,
  },
  summaryText: {
    fontSize: 12,
    color: '#333333',
    lineHeight: 17,
    textAlign: 'justify',
    marginTop: 15,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attributeTag: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
  },
  attributeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
  },
  interestText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '500',
  },
  item: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    color: '#000000',
    flex: 1,
  },
  itemDate: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 9,
    color: '#666666',
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
    color: '#000000',
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
    backgroundColor: '#e0e0e0',
  },
  skillDotFilled: {
    backgroundColor: '#000000',
  },
  footer: {
    backgroundColor: '#000000',
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#ffffff',
    fontStyle: 'italic',
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
    width: 760,
    minHeight: 1000,
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Times New Roman',
  },
  masthead: {
    backgroundColor: '#000000',
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
  },
  mastheadTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 3,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  mastheadDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  dateText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  volumeText: {
    fontSize: 15,
    color: '#ffffff',
    fontStyle: 'italic',
  },
  subheadline: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
    lineHeight: 27,
  },
  frontPage: {
    borderBottomWidth: 3,
    borderBottomColor: '#000000',
    paddingBottom: 30,
    marginBottom: 30,
  },
  headlineSection: {
    textAlign: 'center',
    marginBottom: 22,
  },
  photoSection: {
    alignItems: 'center',
    marginTop: 22,
  },
  photoCaption: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 12,
    color: '#666666',
    textAlign: 'center',
  },
  contactSection: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 22,
    marginBottom: 30,
  },
  contactLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 0,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#000000',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  contactGrid: {
    marginTop: 22,
  },
  contactItem: {
    marginBottom: 12,
  },
  contactText: {
    fontSize: 18,
    color: '#000000',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 30,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 2,
    margin: 0,
  },
  sectionContent: {
    paddingHorizontal: 18,
  },
  columns: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  leftColumn: {
    flex: 2,
    marginRight: 30,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 30,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 21,
  },
  employmentItem: {
    marginBottom: 30,
  },
  employmentHeader: {
    marginBottom: 6,
  },
  employmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  employmentCompany: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 3,
  },
  employmentDates: {
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
  },
  employmentDescription: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 21,
  },
  languageItem: {
    marginBottom: 18,
  },
  languageName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  languageProficiency: {
    fontSize: 13,
    color: '#666666',
  },
  personalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  personalItem: {
    minWidth: '30%',
    flex: 1,
    marginBottom: 9,
  },
  personalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  personalValue: {
    fontSize: 18,
    color: '#000000',
    lineHeight: 24,
  },
  summaryText: {
    fontSize: 18,
    color: '#333333',
    lineHeight: 25,
    textAlign: 'justify',
    marginTop: 15,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  attributeTag: {
    backgroundColor: '#000000',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000000',
  },
  attributeText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000000',
  },
  interestText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
  },
  item: {
    marginBottom: 18,
    paddingBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  itemDate: {
    fontSize: 15,
    color: '#666666',
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    minWidth: '45%',
  },
  skillName: {
    fontSize: 15,
    color: '#000000',
    marginRight: 12,
    flex: 1,
  },
  skillLevel: {
    flexDirection: 'row',
    gap: 4,
  },
  skillDot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  skillDotFilled: {
    backgroundColor: '#000000',
  },
  footer: {
    backgroundColor: '#000000',
    padding: 18,
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#ffffff',
    fontStyle: 'italic',
  },
})

export default Template06
