import React, { ReactNode } from 'react'

import './AppPage.css'

type AppPageProperties = {
  className?: string
  children: ReactNode
  onClick?: () => void
  onMouseMove?: () => void
}

const AppPage = ({
  className,
  children,
  onClick,
  onMouseMove
}: AppPageProperties) => {
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
