import React, { CSSProperties, ReactNode } from 'react'


import { ClassBuilder } from '@uncover/react-commons'

import './WaitToolbar.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface WaitToolbarProperties {
  className?: string
  style?: CSSProperties

  show: boolean

  children?: ReactNode
}
export const WaitToolbar = ({
  className,
  style,

  show,

  children,
}: WaitToolbarProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['wait-toolbar', className])

  if (show) {
    classes.add('wait-toolbar--show')
  } else {
    classes.add('wait-toolbar--hide')
  }

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}
