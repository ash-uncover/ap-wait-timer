import RootState from '../state'

const base = (state: RootState) => state.app

const background = (state: RootState) => base(state).background
const language = (state: RootState) => base(state).language
const music = (state: RootState) => base(state).music
const title1 = (state: RootState) => base(state).title1
const title2 = (state: RootState) => base(state).title2
const showClock = (state: RootState) => base(state).showClock

const loadStatus = (state: RootState) => base(state).loadStatus
const loadError = (state: RootState) => base(state).loadError

const AppSelectors = {
  background,
  language,
  music,
  title1,
  title2,
  showClock,

  loadStatus,
  loadError,
}

export default AppSelectors
