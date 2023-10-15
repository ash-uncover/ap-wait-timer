import React from 'react'

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { RouteWait } from './wait'

import { AppShell } from 'components/AppShell'
import { Home } from 'components/home/Home'
import { App } from 'components/App'

export const RouteRoot = () => {

  // Rendering //

  return (
    <App>
      <Routes>
        <Route path='/wait' element={<RouteWait />} />
        <Route path='/' element={<AppShell><Home /></AppShell>} />
        <Route path='*' element={<Navigate replace to={`/`} />} />
      </Routes>
    </App>
  )
}
