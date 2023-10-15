import AppSlice from 'store/app/app.slice'
import DataSlice from 'store/data/data.slice'

import RestService from 'lib/services/RestService'

export const useSongs = async (dispatch) => {
  dispatch(DataSlice.actions.songsGetFetch())
  return RestService.api.songs.get()
    .then((payload) => {
      dispatch(DataSlice.actions.songsGetSuccess(payload))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.songsGetFailure(error))
      throw error
    })
}

export const useImages = async (dispatch) => {
  dispatch(DataSlice.actions.imagesGetFetch())
  return RestService.api.images.get()
    .then((payload) => {
      dispatch(DataSlice.actions.imagesGetSuccess(payload))
    })
    .catch((error) => {
      dispatch(DataSlice.actions.imagesGetFailure(error))
      throw error
    })
}

export const useAppData = async (dispatch) => {
  dispatch(AppSlice.actions.appLoadFetch())
  Promise.all([
    useSongs(dispatch),
    useImages(dispatch)
  ])
    .then(() => {
      dispatch(AppSlice.actions.appLoadSuccess())
    })
    .catch((error) => {
      dispatch(AppSlice.actions.appLoadFailure(error))
    })
}