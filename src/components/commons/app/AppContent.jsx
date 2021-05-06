import React from 'react'

import './AppContent.scss'

const AppContent = ({ children }) => {
  return (
    <div className='app-content container'>
      {children}
    </div>
  )
}

export default AppContent
