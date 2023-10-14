import React, { CSSProperties, ReactNode } from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './FormGroup.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

export type FormGroupDirection = 'Vertical' | 'Horizontal'
export const FormGroupDirections: {
  HORIZONTAL: FormGroupDirection
  VERTICAL: FormGroupDirection
} = {
  HORIZONTAL: 'Horizontal',
  VERTICAL: 'Vertical',
}

interface FormGroupProperties {
  className?: string
  style?: CSSProperties

  direction?: FormGroupDirection

  children: ReactNode
}
export const FormGroup = ({
  className,
  style,

  direction = FormGroupDirections.VERTICAL,

  children,
}: FormGroupProperties) => {

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['ap-form-group', className])

  classes.add(`ap-form-group--${direction.toLowerCase()}`)

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}
