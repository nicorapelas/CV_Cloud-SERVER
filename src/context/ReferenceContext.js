import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const ReferenceReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'FETCH_SAMPLE':
      return { ...state, referenceSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, referenceStatus: action.payload, loading: false }
    case 'FETCH_REFERENCES':
      return { ...state, references: action.payload, loading: false }
    case 'CREATE':
      return { ...state, references: action.payload, referenceStatusInitFetchDone: false, loading: false }
    case 'SET_REFERENCE_TO_EDIT':
      return { ...state, referenceToEdit: action.payload }
    case 'EDIT':
      return { ...state, references: action.payload, referenceStatusInitFetchDone: false, loading: false }
    case 'DELETE':
      return { ...state, references: action.payload, referenceStatusInitFetchDone: false, loading: false }
    case 'SET_REFERENCE_STATUS_INIT_FETCH_DONE':
      return { ...state, referenceStatusInitFetchDone: action.payload }
    default:
      return state
  }
}

// Actions
const fetchReferenceSample = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/reference/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchReferenceStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/reference/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchReferences = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/reference')
    dispatch({ type: 'FETCH_REFERENCES', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createReference = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/reference', data)
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

const setReferenceToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_REFERENCE_TO_EDIT', payload: data })
}

const editReference = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(`/api/reference/${id.id}`, formValues)
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

const deleteReference = (dispatch) => async (id) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/reference/${id}`)
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

const clearReferenceErrors = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
  return
}

const setReferenceStatusInitFetchDone = (dispatch) => (data) => {
  dispatch({ type: 'SET_REFERENCE_STATUS_INIT_FETCH_DONE', payload: data })
}

export const { Context, Provider } = createDataContext(
  ReferenceReducer,
  {
    fetchReferenceSample,
    fetchReferenceStatus,
    fetchReferences,
    createReference,
    setReferenceToEdit,
    editReference,
    deleteReference,
    addError,
    clearReferenceErrors,
    setReferenceStatusInitFetchDone,
  },
  // Initial state
  {
    references: null,
    referenceSample: null,
    referenceStatus: null,
    referenceToEdit: null,
    loading: null,
    error: null,
    referenceStatusInitFetchDone: false
  }
)
