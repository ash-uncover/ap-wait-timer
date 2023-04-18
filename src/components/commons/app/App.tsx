import React from 'react'

import {
  useEffect,
  useSelector,
} from 'lib/hooks'
import { useAppData } from 'lib/services/ServiceHelper'

import AppSelectors from 'store/app/app.selectors'
import { AppBackground } from 'components/commons/app'

import { DataStates } from '@uncover/js-utils'
import HomeLoading from 'components/home/HomeLoading'
import HomeError from 'components/home/HomeError'

import './App.css'
import { useDispatch } from 'react-redux'
import Home from 'components/home/Home'

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
          <Home />
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
