import React from 'react'

import './AppToolbar.scss'

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
