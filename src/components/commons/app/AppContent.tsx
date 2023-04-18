import React, { ReactNode } from 'react'

import './AppContent.css'

type AppContentProperties = {
  children?: ReactNode
}
const AppContent = ({
  children
}: AppContentProperties) => {
  return (
    <div className='app-content container'>
      {children}
    </div>
  )
}

export default AppContent
