import {
  createSlice
} from '@reduxjs/toolkit'

export const initialState = () => ({
  background: '/images/background.jpg',
  title1: '',
  title2: '',
  showClock: true
})

// START //

export const appChangeBackground = (state, { payload }) => {
  state.background = payload.background
}
export const appChangeTitle1 = (state, { payload }) => {
  state.title1 = payload.title1
}
export const appChangeTitle2 = (state, { payload }) => {
  state.title2 = payload.title2
}
export const appChangeShowClock = (state, { payload }) => {
  state.showClock = payload.showClock
}

// MAIN REDUCER //

const appSlice = createSlice({
  name: 'app',
  initialState: initialState(),

  reducers: {
    appChangeBackground,
    appChangeTitle1,
    appChangeTitle2,
    appChangeShowClock
  }
})

appSlice.selectors = {
  appSelector: (state) => state.app,

  appBackgroundSelector: (state) => appSlice.selectors.appSelector(state).background,
  appTitle1Selector: (state) => appSlice.selectors.appSelector(state).title1,
  appTitle2Selector: (state) => appSlice.selectors.appSelector(state).title2,
  appShowClockSelector: (state) => appSlice.selectors.appSelector(state).showClock
}

export const {
  actions,
  reducer,
  selectors
} = appSlice

export default appSlice
