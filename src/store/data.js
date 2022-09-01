import { combineReducers } from 'redux'

import { reducer as images } from 'store/data/images'
import { reducer as songs } from 'store/data/songs'

export const reducer = combineReducers({
    images,
    songs,
})

export const selectors = {
    dataSelector: (state) => state.data,
}

export default {
    reducer,
    selectors,
}