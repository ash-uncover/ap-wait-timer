import React from 'react'
import App from 'components/commons/app/App'
import { Outlet } from 'react-router-dom'

const RouteRoot = () => {

  // Rendering //

  return (
    <App>
      <Outlet />
    </App>
  )
}

export default RouteRoot
