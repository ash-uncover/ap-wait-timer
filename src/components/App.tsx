import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAppData } from 'lib/services/ServiceHelper'
import AppSelectors from 'store/app/app.selectors'
import { DataStates } from '@uncover/js-utils'

import { AppError } from './AppError'
import { AppLoading } from './AppLoading'
import { AppShell } from './AppShell'

import './App.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AppProperties {
  children: ReactNode
}
export const App = ({
  children,
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const appLoadStatus = useSelector(AppSelectors.loadStatus)

  useEffect(() => {
    if (appLoadStatus === DataStates.NEVER) {
      useAppData(dispatch)
    }
  }, [appLoadStatus])

  // Rendering //

  switch (appLoadStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING_FIRST:
    case DataStates.FETCHING: {
      return (
        <AppLoading />
      )
    }
    case DataStates.SUCCESS: {
      return (
        <AppShell>
          {children}
        </AppShell>
      )
    }
    default: {
      return (
        <AppError />
      )

    }
  }
}