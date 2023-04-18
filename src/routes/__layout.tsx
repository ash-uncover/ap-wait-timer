import React from 'react'

import {
  Route,
  Routes,
} from 'react-router-dom'

import RouteHome from 'routes'

const Root = () => {

  // Rendering //

  return (
    <Routes>
      <Route path='/' element={<RouteHome />} />
    </Routes>
  )
}

export default Root
