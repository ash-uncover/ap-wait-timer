import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({
  icon,
  label,
  title,
  type,
  block,
  primary,
  def,
  onClick
}) => {
  let className = 'btn'
  if (block) className += ' btn-block'
  if (primary) {
    className += ' btn-primary'
  } else if (def) {
    className += ' btn-default'
  }

  return (
    <button
      className={className}
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
