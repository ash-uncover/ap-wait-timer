import React from 'react'

import './AppToolbar.css'

const AppToolbar = ({ children }) => {
  return (
    <div className='app-toolbar'>
      <div className='container'>
        {children}
      </div>
    </div>
  )
}

export default AppToolbar
