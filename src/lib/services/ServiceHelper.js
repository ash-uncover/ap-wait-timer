import {
    actions as AppActions,
} from 'store/app'

import {
    actions as SongsActions,
} from 'store/data/songs'

import {
    actions as ImagesActions,
} from 'store/data/images'

import RestService from 'lib/services/RestService'

export const loadSongs = (dispatch) => {
    dispatch(SongsActions.songsGetFetch())
    return RestService.api.songs.get()
        .then((payload) => {
            dispatch(SongsActions.songsGetSuccess(payload))
        })
        .catch((error) => {
            dispatch(SongsActions.songsGetFailure({ error }))
        })
}

export const loadImages = (dispatch) => {
    dispatch(ImagesActions.imagesGetFetch())
    return RestService.api.pictures.get()
        .then((payload) => {
            dispatch(ImagesActions.imagesGetSuccess(payload))
        })
        .catch((error) => {
            dispatch(ImagesActions.imagesGetFailure({ error }))
        })
}

export const loadData = (dispatch) => {
    dispatch(AppActions.appLoadFetch())
    return Promise.all([
        loadSongs(dispatch),
        loadImages(dispatch)
    ])
        .then(() => {
            dispatch(AppActions.appLoadSuccess())
        })
        .catch((error) => {
            dispatch(AppActions.appLoadFailure({ error }))
        })
}