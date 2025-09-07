import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const CertificateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, photoError: action.payload, loading: false }
    case 'ADD_UPLOAD_SIGNATURE':
      return { ...state, uploadSignature: action.payload }
    case 'CLEAR_UPLOAD_SIGNATURE':
      return { ...state, uploadSignature: action.payload }
    case 'FETCH_STATUS':
      return { ...state, certificateStatus: action.payload, loading: false }
    case 'FETCH_CERTIFICATES':
      return { ...state, certificates: action.payload, loading: false }
    case 'CREATE':
      return { ...state, certificates: action.payload, certificateStatusInitFetchDone: false, loading: false }
    case 'SET_CERTIFICATE_TO_EDIT':
      return { ...state, certificateToEdit: action.payload }
    case 'EDIT':
      return { ...state, certificates: action.payload, certificateStatusInitFetchDone: false, loading: false }
    case 'DELETE':
      return { ...state, certificates: action.payload, certificateStatusInitFetchDone: false, loading: false }
    case 'SET_CERTIFICATE_STATUS_INIT_FETCH_DONE':
      return { ...state, certificateStatusInitFetchDone: action.payload }
    default:
      return state
  }
}

// Actions
const fetchCertificateStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/certificate/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchCertificates = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/certificate')
    dispatch({ type: 'FETCH_CERTIFICATES', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createCertificate = (dispatch) => async (pdfData) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/certificate', pdfData)
    dispatch({ type: 'CREATE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteLargeCertificate = (dispatch) => async (imageFile) => {
  try {
    ngrokApi.post('/api/photo-service/delete-large-certificate', { imageFile })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const setCertificateToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_CERTIFICATE_TO_EDIT', payload: data })
}

const editCertificate = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(`/api/certificate/${id}`, formValues)
    dispatch({ type: 'EDIT', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteCertificate = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(`/api/certificate/delete`, data)
    dispatch({ type: 'DELETE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createUploadSignature = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/api/cloudinary/signature-request-no-preset'
    )
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'ADD_UPLOAD_SIGNATURE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const certificatePhotoUpload = (dispatch) => async (image) => {
  try {
    const response = await ngrokApi.post('/api/certificate/photo-upload', {
      body: JSON.stringify({
        data: image,
      }),
      header: { 'Content-type': 'application/json' },
    })
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearUploadSignature = (dispatch) => () => {
  dispatch({ type: 'CLEAR_UPLOAD_SIGNATURE', payload: null })
}

const setCertificateInitStatusFetchDone = (dispatch) => (value) => {
  dispatch({ type: 'SET_CERTIFICATE_STATUS_INIT_FETCH_DONE', payload: value })
}

export const { Context, Provider } = createDataContext(
  CertificateReducer,
  {
    fetchCertificateStatus,
    fetchCertificates,
    createCertificate,
    setCertificateToEdit,
    editCertificate,
    deleteCertificate,
    deleteLargeCertificate,
    certificatePhotoUpload,
    createUploadSignature,
    clearUploadSignature,
    setCertificateInitStatusFetchDone,
  },
  // Initial state
  {
    certificate: null,
    certificates: null,
    certificateStatus: null,
    certificateToEdit: null,
    uploadSignature: null,
    loading: null,
    photoError: null,
    certificateStatusInitFetchDone: false,
  }
)
