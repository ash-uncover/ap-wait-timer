import { configureStore } from '@reduxjs/toolkit'

import { reducer as app } from 'store/app'

export default configureStore({
  reducer: {
    app
  }
})
