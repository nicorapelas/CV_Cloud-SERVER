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

const Template07 = ({
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
      // Silently fall back to original string if date formatting fails
      return dateString
    }
  }

  // Helper function to render proficiency bars
  const renderProficiency = (level) => {
    const percentage = Math.min((level / 5) * 100, 100)
    return (
      <View style={currentStyles.proficiencyContainer}>
        <View style={currentStyles.proficiencyBar}>
          <View
            style={[currentStyles.proficiencyFill, { width: `${percentage}%` }]}
          />
        </View>
        <Text style={currentStyles.proficiencyText}>{level}/5</Text>
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
                {/* Header Section */}
                <View style={currentStyles.header}>
                  <View style={currentStyles.headerContent}>
                    <View style={currentStyles.headerLeft}>
                      <Text style={currentStyles.name}>
                        {data.personalInfo?.fullName || 'Professional Name'}
                      </Text>
                      <Text style={currentStyles.title}>
                        {data.personalSummary?.summary?.split('.')[0] ||
                          'Financial Professional'}
                      </Text>
                      <View style={currentStyles.headerContact}>
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
                            <Text style={currentStyles.contactIcon}>📞</Text>
                            <Text style={currentStyles.contactText}>
                              {data.contactInfo.phone}
                            </Text>
                          </View>
                        )}
                        {(data.contactInfo?.address ||
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
                    {data.assignedPhotoUrl &&
                      data.assignedPhotoUrl !== 'noneAssigned' && (
                        <View style={currentStyles.headerRight}>
                          <Image
                            source={{ uri: data.assignedPhotoUrl }}
                            style={currentStyles.photo}
                            resizeMode="cover"
                          />
                        </View>
                      )}
                  </View>
                </View>

                {/* Main Content */}
                <View style={currentStyles.main}>
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

                  {/* Two Column Layout */}
                  <View style={currentStyles.columns}>
                    {/* Left Column */}
                    <View style={currentStyles.leftColumn}>
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
                              <View style={currentStyles.experienceHeader}>
                                <Text style={currentStyles.experienceTitle}>
                                  {experience.title}
                                </Text>
                                <Text style={currentStyles.experienceDate}>
                                  {formatDate(experience.startDate)} -{' '}
                                  {experience.endDate
                                    ? formatDate(experience.endDate)
                                    : 'Present'}
                                </Text>
                              </View>
                              <Text style={currentStyles.experienceCompany}>
                                {experience.company}
                              </Text>
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
                      )}

                      {/* Employment History */}
                      {data.employHistorys &&
                        data.employHistorys.length > 0 && (
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
                                  <Text style={currentStyles.employmentDate}>
                                    {formatDate(employment.startDate)} -{' '}
                                    {employment.endDate
                                      ? formatDate(employment.endDate)
                                      : 'Present'}
                                  </Text>
                                </View>
                                <Text style={currentStyles.employmentCompany}>
                                  {employment.company}
                                </Text>
                                {employment.description && (
                                  <Text
                                    style={currentStyles.employmentDescription}
                                  >
                                    {employment.description}
                                  </Text>
                                )}
                              </View>
                            ))}
                          </View>
                        )}

                      {/* Education */}
                      {(data.tertEdus && data.tertEdus.length > 0) ||
                      (data.secondEdu && data.secondEdu.length > 0) ? (
                        <View style={currentStyles.section}>
                          <Text style={currentStyles.sectionTitle}>
                            EDUCATION
                          </Text>
                          {/* Tertiary Education */}
                          {data.tertEdus &&
                            data.tertEdus.map((education, index) => (
                              <View
                                key={index}
                                style={currentStyles.educationItem}
                              >
                                <View style={currentStyles.educationHeader}>
                                  <Text style={currentStyles.educationTitle}>
                                    {education.qualification}
                                  </Text>
                                  <Text style={currentStyles.educationDate}>
                                    {formatDate(education.startDate)} -{' '}
                                    {education.endDate
                                      ? formatDate(education.endDate)
                                      : 'Present'}
                                  </Text>
                                </View>
                                <Text
                                  style={currentStyles.educationInstitution}
                                >
                                  {education.institution}
                                </Text>
                                {education.subjects && (
                                  <Text style={currentStyles.educationSubjects}>
                                    Subjects:{' '}
                                    {renderSubjects(education.subjects)}
                                  </Text>
                                )}
                              </View>
                            ))}

                          {/* Secondary Education */}
                          {data.secondEdu &&
                            data.secondEdu.map((education, index) => (
                              <View
                                key={index}
                                style={currentStyles.educationItem}
                              >
                                <View style={currentStyles.educationHeader}>
                                  <Text style={currentStyles.educationTitle}>
                                    {education.qualification}
                                  </Text>
                                  <Text style={currentStyles.educationDate}>
                                    {formatDate(education.startDate)} -{' '}
                                    {education.endDate
                                      ? formatDate(education.endDate)
                                      : 'Present'}
                                  </Text>
                                </View>
                                <Text
                                  style={currentStyles.educationInstitution}
                                >
                                  {education.institution}
                                </Text>
                                {education.subjects && (
                                  <Text style={currentStyles.educationSubjects}>
                                    Subjects:{' '}
                                    {renderSubjects(education.subjects)}
                                  </Text>
                                )}
                              </View>
                            ))}
                        </View>
                      ) : null}
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
                              {renderProficiency(skill.proficiency || 0)}
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
                            <View
                              key={index}
                              style={currentStyles.languageItem}
                            >
                              <Text style={currentStyles.languageName}>
                                {language.language}
                              </Text>
                              <Text style={currentStyles.languageProficiency}>
                                {language.proficiency}
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
                              <View
                                key={index}
                                style={currentStyles.interestTag}
                              >
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

                  {/* References */}
                  {data.references && data.references.length > 0 && (
                    <View style={currentStyles.section}>
                      <Text style={currentStyles.sectionTitle}>REFERENCES</Text>
                      {data.references.map((reference, index) => (
                        <View key={index} style={currentStyles.referenceItem}>
                          <Text style={currentStyles.referenceName}>
                            {reference.name}
                          </Text>
                          <Text style={currentStyles.referencePosition}>
                            {reference.position} at {reference.company}
                          </Text>
                          {reference.contact && (
                            <Text style={currentStyles.referenceContact}>
                              Contact: {reference.contact}
                            </Text>
                          )}
                        </View>
                      ))}
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

  return renderZoomedOut(currentStyles)
}

// Styles following Template01's proven patterns but with finance theme
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
    fontFamily: 'Segoe UI',
  },
  header: {
    backgroundColor: '#1e3c72',
    padding: 20,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: '#e8f4fd',
    marginBottom: 12,
    opacity: 0.9,
  },
  headerContact: {
    flexDirection: 'column',
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactIcon: {
    fontSize: 12,
    marginRight: 8,
    width: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  contactText: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.9,
  },
  headerRight: {
    flexShrink: 0,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  main: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3c72',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3c72',
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 10,
    color: '#2c3e50',
    lineHeight: 14,
    textAlign: 'justify',
  },
  columns: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftColumn: {
    flex: 2,
    marginRight: 15,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  experienceDate: {
    fontSize: 8,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  experienceCompany: {
    fontSize: 9,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 8,
    color: '#7f8c8d',
    lineHeight: 12,
  },
  employmentItem: {
    marginBottom: 15,
  },
  employmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  employmentTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  employmentDate: {
    fontSize: 8,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  employmentCompany: {
    fontSize: 9,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 4,
  },
  employmentDescription: {
    fontSize: 8,
    color: '#7f8c8d',
    lineHeight: 12,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  educationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  educationDate: {
    fontSize: 8,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  educationInstitution: {
    fontSize: 9,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 2,
  },
  educationSubjects: {
    fontSize: 8,
    color: '#7f8c8d',
    lineHeight: 12,
  },
  skillItem: {
    marginBottom: 8,
  },
  skillName: {
    fontSize: 9,
    color: '#2c3e50',
    marginBottom: 4,
    fontWeight: '600',
  },
  proficiencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proficiencyBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#ecf0f1',
    borderRadius: 2,
    marginRight: 8,
  },
  proficiencyFill: {
    height: '100%',
    backgroundColor: '#1e3c72',
    borderRadius: 2,
  },
  proficiencyText: {
    fontSize: 7,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  languageProficiency: {
    fontSize: 8,
    color: '#7f8c8d',
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  attributeTag: {
    backgroundColor: '#1e3c72',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  attributeText: {
    fontSize: 7,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestTag: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  interestText: {
    fontSize: 7,
    color: '#2c3e50',
    fontWeight: '500',
  },
  referenceItem: {
    marginBottom: 10,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  referencePosition: {
    fontSize: 9,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 2,
  },
  referenceContact: {
    fontSize: 8,
    color: '#7f8c8d',
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
    fontFamily: 'Segoe UI',
  },
  header: {
    backgroundColor: '#1e3c72',
    padding: 30,
    marginBottom: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#e8f4fd',
    marginBottom: 18,
    opacity: 0.9,
  },
  headerContact: {
    flexDirection: 'column',
    gap: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
    color: '#ffffff',
  },
  contactText: {
    fontSize: 15,
    color: '#ffffff',
    opacity: 0.9,
  },
  headerRight: {
    flexShrink: 0,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  main: {
    padding: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3c72',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3c72',
    paddingBottom: 6,
  },
  summaryText: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 21,
    textAlign: 'justify',
  },
  columns: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  leftColumn: {
    flex: 2,
    marginRight: 22,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 22,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  experienceDate: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  experienceCompany: {
    fontSize: 13,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  employmentItem: {
    marginBottom: 22,
  },
  employmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  employmentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  employmentDate: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  employmentCompany: {
    fontSize: 13,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 6,
  },
  employmentDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  educationItem: {
    marginBottom: 18,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  educationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  educationDate: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  educationInstitution: {
    fontSize: 13,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 3,
  },
  educationSubjects: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  skillItem: {
    marginBottom: 12,
  },
  skillName: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 6,
    fontWeight: '600',
  },
  proficiencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proficiencyBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    marginRight: 12,
  },
  proficiencyFill: {
    height: '100%',
    backgroundColor: '#1e3c72',
    borderRadius: 3,
  },
  proficiencyText: {
    fontSize: 10,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  languageItem: {
    marginBottom: 12,
  },
  languageName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  languageProficiency: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  attributeTag: {
    backgroundColor: '#1e3c72',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  attributeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  interestTag: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#bdc3c7',
  },
  interestText: {
    fontSize: 10,
    color: '#2c3e50',
    fontWeight: '500',
  },
  referenceItem: {
    marginBottom: 15,
  },
  referenceName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  referencePosition: {
    fontSize: 13,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 3,
  },
  referenceContact: {
    fontSize: 12,
    color: '#7f8c8d',
  },
})

export default Template07
