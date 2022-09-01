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

// images GET REDUCER //

export const getImagesFetch = (state, { payload }) => {
    state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const getImagesSuccess = (state, { payload }) => {
    const { data } = payload
    state.data = data
    state.error = null
    state.status = DataStates.SUCCESS
}
export const getImagesFailure = (state, { payload }) => {
    const { error } = payload
    state.data = []
    state.error = error
    state.status = DataStates.FAILURE
}

// MAIN REDUCER //

const imagesSlice = createSlice({
    name: 'images',

    initialState: initialState(),

    reducers: {
        imagesGetFetch: getImagesFetch,
        imagesGetSuccess: getImagesSuccess,
        imagesGetFailure: getImagesFailure,
    },
})

imagesSlice.selectors = {
    imagesSelector: (state) => dataSelectors.restSelector(state).images,

    imagesDataSelector: (state) => imagesSlice.selectors.imagesSelector(state).data,
    imagesStatusSelector: (state) => imagesSlice.selectors.imagesSelector(state).status,
    imagesErrorSelector: (state) => imagesSlice.selectors.imagesSelector(state).error,
}

export const {
    actions,
    reducer,
    selectors
} = imagesSlice

export default imagesSlice