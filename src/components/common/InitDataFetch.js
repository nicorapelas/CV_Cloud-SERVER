import { useContext, useEffect } from 'react'

import { Context as AttributeContext } from '../../context/AttributeContext'
import { Context as CertificateContext } from '../../context/CertificateContext'
import { Context as ContactInfoContext } from '../../context/ContactInfoContext'
import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { Context as ExperienceContext } from '../../context/ExperienceContext'
import { Context as FirstImpressionContext } from '../../context/FirstImpressionContext'
import { Context as InterestContext } from '../../context/InterestContext'
import { Context as LanguageContext } from '../../context/LanguageContext'
import { Context as PersonalInfoContext } from '../../context/PersonalInfoContext'
import { Context as PersonalSummaryContext } from '../../context/PersonalSummaryContext'
import { Context as PhotoContext } from '../../context/PhotoContext'
import { Context as ReferenceContext } from '../../context/ReferenceContext'
import { Context as SecondEduContext } from '../../context/SecondEduContext'
import { Context as SkillContext } from '../../context/SkillContext'
import { Context as TertEduContext } from '../../context/TertEduContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const InitDataFetch = () => {
  const { fetchAttributes } = useContext(AttributeContext)
  const { fetchCertificates } = useContext(CertificateContext)
  const { fetchContactInfo } = useContext(ContactInfoContext)
  const { fetchEmployHistorys } = useContext(EmployHistoryContext)
  const { fetchExperiences } = useContext(ExperienceContext)
  const { fetchFirstImpression } = useContext(FirstImpressionContext)
  const { fetchInterests } = useContext(InterestContext)
  const { fetchLanguages } = useContext(LanguageContext)
  const { fetchPersonalInfo } = useContext(PersonalInfoContext)
  const { fetchPersonalSummary } = useContext(PersonalSummaryContext)
  const { fetchPhotos } = useContext(PhotoContext)
  const { fetchReferences } = useContext(ReferenceContext)
  const { fetchSecondEdu } = useContext(SecondEduContext)
  const { fetchSkills } = useContext(SkillContext)
  const { fetchTertEdus } = useContext(TertEduContext)
  const {
    state: { initDataFetchDone },
    setInitDataFetchDone,
  } = useContext(UniversalContext)

  useEffect(() => {
    if (!initDataFetchDone) {
      fetchAttributes()
      fetchCertificates()
      fetchContactInfo()
      fetchEmployHistorys()
      fetchExperiences()
      fetchFirstImpression()
      fetchInterests()
      fetchLanguages()
      fetchPersonalInfo()
      fetchPersonalSummary()
      fetchPhotos()
      fetchReferences()
      fetchSecondEdu()
      fetchSkills()
      fetchTertEdus()
      setInitDataFetchDone(true)
    }
  }, [initDataFetchDone])

  return null
}

export default InitDataFetch
