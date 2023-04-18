import React from 'react'
// Hooks
import {
  useSelector,
} from 'lib/hooks'
import { useAppData } from 'lib/services/ServiceHelper'
// Store
import AppSelectors from 'store/app/app.selectors'
// Utils
import { DataStates } from '@uncover/js-utils'
// Components
import AppBackground from 'components/commons/app/AppBackground'
import HomeLoading from 'components/home/HomeLoading'
import HomeError from 'components/home/HomeError'

import './App.css'

const App = ({
  children,
}) => {

  // Hooks //

  const appLoadStatus = useSelector(AppSelectors.loadStatus)
  const appBackground = useSelector(AppSelectors.background)

  useAppData()

  // Rendering //

  switch (appLoadStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return (
        <div className='app'>
          <AppBackground src={appBackground} />
          <HomeLoading />
        </div>
      )
    }
    case DataStates.SUCCESS: {
      return (
        <div className='app'>
          <AppBackground src={appBackground} />
          {children}
        </div>
      )
    }
    default: {
      return (
        <div className='app'>
          <AppBackground src={appBackground} />
          <HomeError />
        </div>
      )

    }
  }
}

export default App
