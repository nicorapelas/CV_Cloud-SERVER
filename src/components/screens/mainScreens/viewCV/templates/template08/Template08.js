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

const Template08 = ({
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

  // Helper function to render proficiency stars
  const renderProficiency = (level) => {
    const maxStars = 5
    const filledStars = Math.min(level, maxStars)
    const emptyStars = maxStars - filledStars

    return (
      <View style={currentStyles.starsContainer}>
        {[...Array(filledStars)].map((_, i) => (
          <Text key={`filled-${i}`} style={currentStyles.starFilled}>
            ★
          </Text>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <Text key={`empty-${i}`} style={currentStyles.starEmpty}>
            ☆
          </Text>
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
        <ScrollView style={{ backgroundColor: '#f8f6f0' }}>
          <ScrollView horizontal style={{ backgroundColor: '#f8f6f0' }}>
            <View style={currentStyles.cvBed}>
              <View style={currentStyles.container}>
                {/* Restaurant Header */}
                <View style={currentStyles.header}>
                  <Text style={currentStyles.restaurantName}>
                    {data.personalInfo?.fullName || 'PROFESSIONAL PROFILE'}
                  </Text>
                  <Text style={currentStyles.restaurantTagline}>
                    {data.personalSummary?.content?.split('.')[0] ||
                      'Experienced Professional'}
                  </Text>
                  <View style={currentStyles.headerDivider} />
                </View>

                {/* Contact Information */}
                <View style={currentStyles.contactSection}>
                  <View style={currentStyles.contactGrid}>
                    {data.contactInfo?.email && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactLabel}>Email:</Text>
                        <Text style={currentStyles.contactValue}>
                          {data.contactInfo.email}
                        </Text>
                      </View>
                    )}
                    {data.contactInfo?.phone && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactLabel}>Phone:</Text>
                        <Text style={currentStyles.contactValue}>
                          {data.contactInfo.phone}
                        </Text>
                      </View>
                    )}
                    {(data.contactInfo?.address || data.contactInfo?.city) && (
                      <View style={currentStyles.contactItem}>
                        <Text style={currentStyles.contactLabel}>
                          Location:
                        </Text>
                        <Text style={currentStyles.contactValue}>
                          {[
                            data.contactInfo.address,
                            data.contactInfo.suburb,
                            data.contactInfo.city,
                            data.contactInfo.province,
                            data.contactInfo.country,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </Text>
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
                    <Text style={currentStyles.sectionTitle}>ABOUT US</Text>
                    <View style={currentStyles.sectionContent}>
                      <Text style={currentStyles.summaryText}>
                        {data.personalSummary.content}
                      </Text>
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
                        <Text style={currentStyles.sectionTitle}>
                          EXPERIENCE
                        </Text>
                        <View style={currentStyles.sectionContent}>
                          {data.experiences.map((experience, index) => (
                            <View
                              key={experience._id || index}
                              style={currentStyles.menuItem}
                            >
                              <View style={currentStyles.itemHeader}>
                                <Text style={currentStyles.itemName}>
                                  {experience.title}
                                </Text>
                                <Text style={currentStyles.itemPrice}>
                                  {formatDate(experience.startDate)} -{' '}
                                  {experience.endDate
                                    ? formatDate(experience.endDate)
                                    : 'Present'}
                                </Text>
                              </View>
                              <View style={currentStyles.itemDescription}>
                                <Text style={currentStyles.itemCompany}>
                                  {experience.company}
                                </Text>
                                {experience.description && (
                                  <Text
                                    style={currentStyles.itemDescriptionText}
                                  >
                                    {experience.description}
                                  </Text>
                                )}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Employment History */}
                    {data.employHistorys && data.employHistorys.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          EMPLOYMENT
                        </Text>
                        <View style={currentStyles.sectionContent}>
                          {data.employHistorys.map((employment, index) => (
                            <View
                              key={employment._id || index}
                              style={currentStyles.menuItem}
                            >
                              <View style={currentStyles.itemHeader}>
                                <Text style={currentStyles.itemName}>
                                  {employment.position}
                                </Text>
                                <Text style={currentStyles.itemPrice}>
                                  {formatDate(employment.startDate)} -{' '}
                                  {employment.endDate
                                    ? formatDate(employment.endDate)
                                    : 'Present'}
                                </Text>
                              </View>
                              <View style={currentStyles.itemDescription}>
                                <Text style={currentStyles.itemCompany}>
                                  {employment.company}
                                </Text>
                                {employment.description && (
                                  <Text
                                    style={currentStyles.itemDescriptionText}
                                  >
                                    {employment.description}
                                  </Text>
                                )}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Education */}
                    {(data.tertEdus && data.tertEdus.length > 0) ||
                    (data.secondEdu && data.secondEdu.length > 0) ? (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          EDUCATION
                        </Text>
                        <View style={currentStyles.sectionContent}>
                          {/* Tertiary Education */}
                          {data.tertEdus &&
                            data.tertEdus.map((education, index) => (
                              <View
                                key={education._id || index}
                                style={currentStyles.menuItem}
                              >
                                <View style={currentStyles.itemHeader}>
                                  <Text style={currentStyles.itemName}>
                                    {education.qualification}
                                  </Text>
                                  <Text style={currentStyles.itemPrice}>
                                    {formatDate(education.startDate)} -{' '}
                                    {education.endDate
                                      ? formatDate(education.endDate)
                                      : 'Present'}
                                  </Text>
                                </View>
                                <View style={currentStyles.itemDescription}>
                                  <Text style={currentStyles.itemCompany}>
                                    {education.institution}
                                  </Text>
                                  {education.subjects && (
                                    <View
                                      style={currentStyles.subjectsContainer}
                                    >
                                      <Text style={currentStyles.subjectsText}>
                                        Subjects:{' '}
                                        {renderSubjects(education.subjects)}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            ))}

                          {/* Secondary Education */}
                          {data.secondEdu &&
                            data.secondEdu.map((education, index) => (
                              <View
                                key={education._id || index}
                                style={currentStyles.menuItem}
                              >
                                <View style={currentStyles.itemHeader}>
                                  <Text style={currentStyles.itemName}>
                                    {education.qualification}
                                  </Text>
                                  <Text style={currentStyles.itemPrice}>
                                    {formatDate(education.startDate)} -{' '}
                                    {education.endDate
                                      ? formatDate(education.endDate)
                                      : 'Present'}
                                  </Text>
                                </View>
                                <View style={currentStyles.itemDescription}>
                                  <Text style={currentStyles.itemCompany}>
                                    {education.institution}
                                  </Text>
                                  {education.subjects && (
                                    <View
                                      style={currentStyles.subjectsContainer}
                                    >
                                      <Text style={currentStyles.subjectsText}>
                                        Subjects:{' '}
                                        {renderSubjects(education.subjects)}
                                      </Text>
                                    </View>
                                  )}
                                </View>
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
                        <Text style={currentStyles.sectionTitle}>SKILLS</Text>
                        <View style={currentStyles.sectionContent}>
                          {data.skills.map((skill, index) => (
                            <View
                              key={skill._id || index}
                              style={currentStyles.skillItem}
                            >
                              <View style={currentStyles.skillHeader}>
                                <Text style={currentStyles.skillName}>
                                  {skill.skill}
                                </Text>
                                {renderProficiency(skill.proficiency)}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          LANGUAGES
                        </Text>
                        <View style={currentStyles.sectionContent}>
                          {data.languages.map((language, index) => (
                            <View
                              key={language._id || index}
                              style={currentStyles.languageItem}
                            >
                              <View style={currentStyles.languageHeader}>
                                <Text style={currentStyles.languageName}>
                                  {language.language}
                                </Text>
                                <Text style={currentStyles.languageLevel}>
                                  {language.proficiency}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Personal Attributes */}
                    {data.attributes && data.attributes.length > 0 && (
                      <View style={currentStyles.section}>
                        <Text style={currentStyles.sectionTitle}>
                          ATTRIBUTES
                        </Text>
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
                        <Text style={currentStyles.sectionTitle}>
                          INTERESTS
                        </Text>
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

                {/* References */}
                {data.references && data.references.length > 0 && (
                  <View style={currentStyles.section}>
                    <Text style={currentStyles.sectionTitle}>REFERENCES</Text>
                    <View style={currentStyles.sectionContent}>
                      {data.references.map((reference, index) => (
                        <View
                          key={reference._id || index}
                          style={currentStyles.referenceItem}
                        >
                          <View style={currentStyles.referenceHeader}>
                            <Text style={currentStyles.referenceName}>
                              {reference.name}
                            </Text>
                          </View>
                          <View style={currentStyles.referenceDetails}>
                            <Text style={currentStyles.referenceDetailsText}>
                              <Text style={currentStyles.referencePosition}>
                                {reference.position}
                              </Text>
                              {' at '}
                              {reference.company}
                            </Text>
                            {reference.contact && (
                              <Text style={currentStyles.referenceContact}>
                                Contact: {reference.contact}
                              </Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Footer */}
                <View style={currentStyles.footer}>
                  <Text style={currentStyles.footerText}>
                    Thank you for your consideration
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

const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
  },
  cvBed: {
    width: 380,
    minHeight: 1000,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  container: {
    flex: 1,
    fontFamily: 'Georgia',
  },
  header: {
    backgroundColor: '#8b4513',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8f6f0',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  restaurantTagline: {
    fontSize: 14,
    color: '#f5deb3',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  headerDivider: {
    width: 100,
    height: 2,
    backgroundColor: '#f5deb3',
    borderRadius: 1,
  },
  contactSection: {
    backgroundColor: '#f5deb3',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  contactGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  contactItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#8b4513',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  contactValue: {
    color: '#2c1810',
    fontSize: 14,
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#8b4513',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b4513',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#8b4513',
    paddingBottom: 8,
  },
  sectionContent: {
    paddingHorizontal: 10,
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#2c1810',
    textAlign: 'justify',
    backgroundColor: '#f8f6f0',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d2b48c',
    fontStyle: 'italic',
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
  menuItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f6f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d2b48c',
    paddingBottom: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8b4513',
    flex: 1,
  },
  itemPrice: {
    fontSize: 11,
    color: '#a0522d',
    fontWeight: '600',
    fontStyle: 'italic',
    backgroundColor: '#f5deb3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  itemDescription: {
    color: '#2c1810',
    lineHeight: 16,
  },
  itemCompany: {
    color: '#8b4513',
    fontWeight: '600',
    fontSize: 13,
  },
  itemDescriptionText: {
    marginTop: 4,
    fontStyle: 'italic',
    fontSize: 12,
  },
  subjectsContainer: {
    marginTop: 6,
  },
  subjectsText: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
  },
  skillItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f6f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontWeight: '600',
    color: '#8b4513',
    fontSize: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  starFilled: {
    fontSize: 12,
    color: '#ffd700',
  },
  starEmpty: {
    fontSize: 12,
    color: '#d2b48c',
  },
  languageItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f6f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageName: {
    fontWeight: '600',
    color: '#8b4513',
    fontSize: 12,
  },
  languageLevel: {
    color: '#a0522d',
    fontStyle: 'italic',
    fontSize: 10,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attributeTag: {
    backgroundColor: '#8b4513',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#654321',
  },
  attributeText: {
    color: '#f8f6f0',
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
    backgroundColor: '#f5deb3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  interestText: {
    color: '#8b4513',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  referenceItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f6f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  referenceHeader: {
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#d2b48c',
    paddingBottom: 6,
  },
  referenceName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  referenceDetails: {
    color: '#2c1810',
    lineHeight: 16,
  },
  referenceDetailsText: {
    fontSize: 12,
  },
  referencePosition: {
    fontWeight: '600',
    color: '#8b4513',
  },
  referenceContact: {
    marginTop: 4,
    fontSize: 11,
  },
  footer: {
    backgroundColor: '#8b4513',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#f8f6f0',
    fontStyle: 'italic',
  },
})

const stylesZoomedIn = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
  },
  cvBed: {
    width: 760,
    minHeight: 1500,
    backgroundColor: '#ffffff',
    padding: 40,
  },
  container: {
    flex: 1,
    fontFamily: 'Georgia',
  },
  header: {
    backgroundColor: '#8b4513',
    padding: 50,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 12,
  },
  restaurantName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f8f6f0',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 12,
  },
  restaurantTagline: {
    fontSize: 18,
    color: '#f5deb3',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  headerDivider: {
    width: 150,
    height: 3,
    backgroundColor: '#f5deb3',
    borderRadius: 2,
  },
  contactSection: {
    backgroundColor: '#f5deb3',
    padding: 30,
    marginBottom: 30,
    borderRadius: 12,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  contactItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d2b48c',
    minWidth: '45%',
    flex: 1,
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#8b4513',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  contactValue: {
    color: '#2c1810',
    fontSize: 16,
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePhoto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#8b4513',
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b4513',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#8b4513',
    paddingBottom: 10,
  },
  sectionContent: {
    paddingHorizontal: 15,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c1810',
    textAlign: 'justify',
    backgroundColor: '#f8f6f0',
    padding: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d2b48c',
    fontStyle: 'italic',
  },
  columns: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  menuItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f8f6f0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d2b48c',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d2b48c',
    paddingBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b4513',
    flex: 1,
  },
  itemPrice: {
    fontSize: 13,
    color: '#a0522d',
    fontWeight: '600',
    fontStyle: 'italic',
    backgroundColor: '#f5deb3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  itemDescription: {
    color: '#2c1810',
    lineHeight: 20,
  },
  itemCompany: {
    color: '#8b4513',
    fontWeight: '600',
    fontSize: 15,
  },
  itemDescriptionText: {
    marginTop: 6,
    fontStyle: 'italic',
    fontSize: 14,
  },
  subjectsContainer: {
    marginTop: 8,
  },
  subjectsText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  skillItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f6f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontWeight: '600',
    color: '#8b4513',
    fontSize: 14,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  starFilled: {
    fontSize: 14,
    color: '#ffd700',
  },
  starEmpty: {
    fontSize: 14,
    color: '#d2b48c',
  },
  languageItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f6f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d2b48c',
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageName: {
    fontWeight: '600',
    color: '#8b4513',
    fontSize: 14,
  },
  languageLevel: {
    color: '#a0522d',
    fontStyle: 'italic',
    fontSize: 12,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  attributeTag: {
    backgroundColor: '#8b4513',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#654321',
  },
  attributeText: {
    color: '#f8f6f0',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestTag: {
    backgroundColor: '#f5deb3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d2b48c',
  },
  interestText: {
    color: '#8b4513',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  referenceItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f8f6f0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d2b48c',
  },
  referenceHeader: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d2b48c',
    paddingBottom: 8,
  },
  referenceName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  referenceDetails: {
    color: '#2c1810',
    lineHeight: 20,
  },
  referenceDetailsText: {
    fontSize: 14,
  },
  referencePosition: {
    fontWeight: '600',
    color: '#8b4513',
  },
  referenceContact: {
    marginTop: 6,
    fontSize: 13,
  },
  footer: {
    backgroundColor: '#8b4513',
    padding: 30,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#f8f6f0',
    fontStyle: 'italic',
  },
})

export default Template08
