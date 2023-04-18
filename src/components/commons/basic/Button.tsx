import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type ButtonProperties = {
  icon?: IconProp
  label?: string
  title?: string
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  primary?: boolean
  def?: boolean
  onClick?: () =>  void
}
const Button = ({
  icon,
  label,
  title,
  type,
  block,
  primary,
  def,
  onClick
}: ButtonProperties) => {

  // Rendering //

  const classes = ['btn']
  if (block) {
    classes.push('btn-block')
  }
  if (primary) {
    classes.push('btn-primary')
  } else if (def) {
    classes.push('btn-default')
  }

  return (
    <button
      className={classes.join(' ')}
      title={title}
      type={type || 'button'}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </button>
  )
}

export default Button
