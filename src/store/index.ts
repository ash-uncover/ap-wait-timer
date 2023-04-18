import { configureStore } from '@reduxjs/toolkit'

import AppSlice from './app/app.slice'
import DataSlice from './data/data.slice'

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    data: DataSlice.reducer,
  }
})
