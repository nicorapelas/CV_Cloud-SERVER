import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const PhotoReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'PHOTO_ASSIGN_LOADING':
      return { ...state, photoAssignLoading: true }
    case 'ADD_ERROR':
      return { ...state, photoError: action.payload, loading: false }
    case 'FETCH_SAMPLE':
      return { ...state, assignedPhotoUrlSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, photoStatus: action.payload, loading: false }
    case 'FETCH_PHOTOS':
      return { ...state, photos: action.payload, loading: false }
    case 'CREATE':
      return { ...state, photos: action.payload, photoStatusInitFetchDone: false, loading: false }
    case 'ADD_UPLOAD_SIGNATURE':
      return { ...state, uploadSignature: action.payload }
    case 'CLEAR_UPLOAD_SIGNATURE':
      return { ...state, uploadSignature: action.payload }
    case 'ASSIGN_PHOTO':
      return { ...state, photos: action.payload, photoAssignLoading: false }
    case 'SET_ASSIGNED_PHOTO_ID':
      return { ...state, assignedPhotoId: action.payload }
    case 'FETCH_ASSIGNED_PHOTO':
      return { ...state, assignedPhotoUrl: action.payload }
    case 'DELETE':
      return { ...state, photos: action.payload, photoStatusInitFetchDone: false, loading: false }
    case 'SET_PHOTO_TO_EDIT':
      return { ...state, photoToEdit: action.payload }
    case 'EDIT':
      return { ...state, photos: action.payload, photoStatusInitFetchDone: false, loading: false }
    case 'SET_PHOTO_STATUS_INIT_FETCH_DONE':
      return { ...state, photoStatusInitFetchDone: action.payload }
    default:
      return state
  }
}

// Actions
const fetchPhotoSample = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/photo/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchPhotoStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/photo/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const createPhoto = (dispatch) => async (imageData) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/photo', imageData)
    dispatch({ type: 'CREATE', payload: response.data })
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
      '/api/cloudinary/signature-request-photo-preset'
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

const clearUploadSignature = (dispatch) => () => {
  dispatch({ type: 'CLEAR_UPLOAD_SIGNATURE', payload: null })
}

const fetchAssignedPhoto = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/photo/assigned')
    dispatch({ type: 'FETCH_ASSIGNED_PHOTO', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchPhotos = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/photo')
    dispatch({ type: 'FETCH_PHOTOS', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteLargePhoto = (dispatch) => async (imageFile) => {
  try {
    ngrokApi.post('/api/photo-service/delete-large-photo', { imageFile })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteSmallPhoto = (dispatch) => async (imageFile) => {
  try {
    ngrokApi.post('/api/photo-service/delete-photo', { imageFile })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deletePhoto = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(`/api/photo/delete`, data)
    dispatch({ type: 'DELETE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const assignPhoto = (dispatch) => async (id) => {
  dispatch({ type: 'PHOTO_ASSIGN_LOADING' })
  try {
    const response = await ngrokApi.post('/api/photo/assign-photo', { id })
    dispatch({ type: 'ASSIGN_PHOTO', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const setAssignedPhotoId = (dispatch) => (value) => {
  dispatch({ type: 'SET_ASSIGNED_PHOTO_ID', payload: value })
}

const setPhotoToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_PHOTO_TO_EDIT', payload: data })
}

const editPhoto = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(`/api/photo/${id}`, formValues)
    dispatch({ type: 'EDIT', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const setPhotoStatusInitFetchDone = (dispatch) => (value) => {
  dispatch({ type: 'SET_PHOTO_STATUS_INIT_FETCH_DONE', payload: value })
}

export const { Context, Provider } = createDataContext(
  PhotoReducer,
  {
    fetchPhotoSample,
    fetchPhotoStatus,
    fetchAssignedPhoto,
    fetchPhotos,
    createPhoto,
    createUploadSignature,
    clearUploadSignature,
    setPhotoToEdit,
    editPhoto,
    deleteLargePhoto,
    deleteSmallPhoto,
    deletePhoto,
    assignPhoto,
    setAssignedPhotoId,
    setPhotoStatusInitFetchDone,
  },
  // Initial state
  {
    photo: null,
    photos: null,
    assignedPhotoUrlSample: null,
    photoStatus: null,
    uploadSignature: null,
    loading: null,
    photoToEdit: null,
    photoError: null,
    assignedPhotoId: null,
    assignedPhotoUrl: null,
    photoStatusInitFetchDone: false,
  }
)
