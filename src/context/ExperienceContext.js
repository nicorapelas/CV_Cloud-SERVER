import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const ExperienceReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'FETCH_STATUS':
      return {
        ...state,
        experienceStatus: action.payload,
        loading: false,
      }
    case 'FETCH_SAMPLE':
      return { ...state, experienceSample: action.payload }
    case 'FETCH_EXPERIENCES':
      return { ...state, experiences: action.payload, loading: false }
    case 'CREATE':
      return { ...state, experiences: action.payload, experienceStatusInitFetchDone: false, loading: false }
    case 'SET_EXPERIENCE_TO_EDIT':
      return { ...state, experienceToEdit: action.payload }
    case 'EDIT':
      return { ...state, experiences: action.payload, experienceStatusInitFetchDone: false, loading: false }
    case 'DELETE':
      return { ...state, experiences: action.payload, experienceStatusInitFetchDone: false, loading: false }
    case 'SET_EXPERIENCE_STATUS_INIT_FETCH_DONE':
      return { ...state, experienceStatusInitFetchDone: action.payload }
    default:
      return state
  }
}

// Actions
const fetchExperienceSample = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/experience/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchExperienceStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/experience/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchExperiences = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/experience')
    dispatch({ type: 'FETCH_EXPERIENCES', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createExperience = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/experience', formValues)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const setExperienceToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_EXPERIENCE_TO_EDIT', payload: data })
  return
}

const editExperience = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      `/api/experience/${id.id}`,
      formValues
    )
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'EDIT', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteExperience = (dispatch) => async (id) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/experience/${id}`)
    dispatch({ type: 'DELETE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const addError = (dispatch) => (error) => {
  dispatch({ type: 'ADD_ERROR', payload: error })
}

const clearExperienceErrors = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
  return
}


const setExperienceStatusInitFetchDone = (dispatch) => (value) => {
  dispatch({ type: 'SET_EXPERIENCE_STATUS_INIT_FETCH_DONE', payload: value })
}


export const { Context, Provider } = createDataContext(
  ExperienceReducer,
  {
    fetchExperienceSample,
    fetchExperienceStatus,
    fetchExperiences,
    createExperience,
    setExperienceToEdit,
    editExperience,
    deleteExperience,
    addError,
    clearExperienceErrors,
    setExperienceStatusInitFetchDone,
  },
  // Initial state
  {
    experience: null,
    experiences: null,
    experienceSample: null,
    experienceStatus: null,
    experienceToEdit: null,
    loading: null,
    error: null,
    experienceStatusInitFetchDone: false,
  }
)
