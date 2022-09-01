import {
    createSlice
} from '@reduxjs/toolkit'

import {
    DataStates
} from 'lib/constants'

import {
    selectors as dataSelectors
} from 'store/data'

export const initialState = () => ({
    data: [],
    status: DataStates.NEVER,
    error: null
})

// SONGS GET REDUCER //

export const getSongsFetch = (state, { payload }) => {
    state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const getSongsSuccess = (state, { payload }) => {
    const { data } = payload
    state.data = data
    state.error = null
    state.status = DataStates.SUCCESS
}
export const getSongsFailure = (state, { payload }) => {
    const { error } = payload
    state.data = []
    state.error = error
    state.status = DataStates.FAILURE
}

// MAIN REDUCER //

const songsSlice = createSlice({
    name: 'songs',

    initialState: initialState(),

    reducers: {
        songsGetFetch: getSongsFetch,
        songsGetSuccess: getSongsSuccess,
        songsGetFailure: getSongsFailure,
    },
})

songsSlice.selectors = {
    restSongsSelector: (state) => dataSelectors.restSelector(state).songs,

    restSongsDataSelector: (state) => songsSlice.selectors.restSongsSelector(state).data,
    restSongsStatusSelector: (state) => songsSlice.selectors.restSongsSelector(state).status,
    restSongsErrorSelector: (state) => songsSlice.selectors.restSongsSelector(state).error,
}

export const {
    actions,
    reducer,
    selectors
} = songsSlice

export default songsSlice