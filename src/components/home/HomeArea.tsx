import React, { CSSProperties, ReactNode } from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './HomeArea.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface HomeAreaProperties {
  className?: string
  style?: CSSProperties

  children: ReactNode
}
export const HomeArea = ({
  className,
  style,

  children
}: HomeAreaProperties) => {

  // Rendering //

  const classes = new ClassBuilder(['home-area', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}
