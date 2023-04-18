import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { DataStates } from '@uncover/js-utils'

import AppState from './app.state'

const initialState: AppState = {
  loadStatus: DataStates.NEVER,

  background: '/images/background.jpg',
  title1: '',
  title2: '',
  showClock: true,
  music: []
}

// START //

const setBackground: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.background = action.payload
}

const setTitle1: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.title1 = action.payload
}

const setTitle2: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.title2 = action.payload
}

const setShowClock: CaseReducer<AppState, PayloadAction<boolean>> = (state, action) => {
  state.showClock = action.payload
}

const toggleMusicSelection: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  const music = action.payload
  const index = state.music.indexOf(music)
  if (index === -1) {
    state.music.push(music)
  } else {
    state.music.splice(index, 1)
  }
}

const appLoadFetch: CaseReducer<AppState> = (state) => {
  state.loadStatus = DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
const appLoadSuccess: CaseReducer<AppState> = (state) => {
  state.loadStatus = DataStates.SUCCESS
  delete state.loadError
}
const appLoadFailure: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.loadStatus = DataStates.FAILURE
  state.loadError = action.payload
}

// MAIN REDUCER //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    appLoadFetch,
    appLoadSuccess,
    appLoadFailure,

    setBackground,
    setTitle1,
    setTitle2,
    setShowClock,

    toggleMusicSelection
  }
})

export default AppSlice
