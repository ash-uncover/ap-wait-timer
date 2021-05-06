import React from 'react'

import './AppPage.scss'

const AppPage = ({
  className,
  children,
  onClick,
  onMouseMove
}) => {
  let classNam = 'app-page'
  if (className) {
    classNam += ` ${className}`
  }
  return (
    <div
      className={classNam}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  )
}

export default AppPage
