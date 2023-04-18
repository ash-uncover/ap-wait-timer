import RootState from '../state'

const base = (state: RootState) => state.data

const images = (state: RootState) => base(state).images
const imagesState = (state: RootState) => base(state).imagesState
const imagesError = (state: RootState) => base(state).imagesError

const songs = (state: RootState) => base(state).songs
const songsState = (state: RootState) => base(state).songsState
const songsError = (state: RootState) => base(state).songsError

const DataSelectors = {
  images,
  imagesState,
  imagesError,

  songs,
  songsState,
  songsError,
}

export default DataSelectors
