import React, { CSSProperties, ReactNode } from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './WaitOverlay.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface WaitOverlayProperties {
  className?: string
  style?: CSSProperties

  children: ReactNode
}
export const WaitOverlay = ({
  className,
  style,

  children,
}: WaitOverlayProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['wait-overlay', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}
