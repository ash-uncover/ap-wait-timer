import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { DataStates } from '@uncover/js-utils'

import DataState from './data.state'

const initialState: DataState = {
  images: [],
  imagesState: DataStates.NEVER,

  songs: [],
  songsState: DataStates.NEVER,
}

// Get images

const imagesGetFetch: CaseReducer<DataState> = (state) => {
  state.imagesState = state.imagesState === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
interface PayloadimagesSuccess {
  data: any[]
}
const imagesGetSuccess: CaseReducer<DataState, PayloadAction<PayloadimagesSuccess>> = (state, action) => {
  state.images = action.payload.data.map((entry, i) => ({
    ...entry,
    id: i,
  }))
  delete state.imagesError
  state.imagesState = DataStates.SUCCESS
}
const imagesGetFailure: CaseReducer<DataState, PayloadAction<string>> = (state, action) => {
  state.images = []
  state.imagesError = action.payload
  state.imagesState = DataStates.FAILURE
}

// Get songs

const songsGetFetch: CaseReducer<DataState> = (state) => {
  state.songsState = state.songsState === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
interface PayloadSongsSuccess {
  data: any[]
}
const songsGetSuccess: CaseReducer<DataState, PayloadAction<PayloadSongsSuccess>> = (state, action) => {
  state.songs = action.payload.data.map((entry, i) => ({
    ...entry,
    name: entry.name.split('.')[0],
    id: i,
  }))
  delete state.songsError
  state.songsState = DataStates.SUCCESS
}
const songsGetFailure: CaseReducer<DataState, PayloadAction<string>> = (state, action) => {
  state.songs = []
  state.songsError = action.payload
  state.songsState = DataStates.FAILURE
}

// MAIN REDUCER //

const DataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {
    imagesGetFetch,
    imagesGetSuccess,
    imagesGetFailure,

    songsGetFetch,
    songsGetSuccess,
    songsGetFailure,
  }
})

export default DataSlice