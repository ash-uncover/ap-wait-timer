import { combineReducers } from 'redux'

import { reducer as songs } from 'store/data/songs'
import { reducer as images } from 'store/data/images'

export const reducer = combineReducers({
    songs,
    images,
})

export const selectors = {
    dataSelector: (state) => state.data,
}

export default {
    reducer,
    selectors,
}