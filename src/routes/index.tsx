import React from 'react'

import App from 'components/commons/app/App'

import {
  Route,
  Routes,
} from 'react-router-dom'
import RouteWait from './wait'
import Home from 'components/home/Home'

const RouteRoot = () => {

  // Rendering //

  return (
    <App>
      <Routes>
        <Route path='/wait' element={<RouteWait />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </App>
  )
}

export default RouteRoot
