import React, { ReactNode } from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './ThumbnailContainer.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ThumbnailContainerProperties {
  className?: string

  children: ReactNode
}
export const ThumbnailContainer = ({
  className,

  children,
}: ThumbnailContainerProperties) => {

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['thumbnail-container', className])

  return (
    <div className={classes.className} >
      {children}
    </div>
  )
}
