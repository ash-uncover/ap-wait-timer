import { configureStore } from '@reduxjs/toolkit'

import { reducer as app } from 'store/app'
import { reducer as data } from 'store/data'

export default configureStore({
    reducer: {
        app,
        data,
    }
})
