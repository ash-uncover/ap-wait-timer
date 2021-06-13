import React from 'react'

const FieldSet = ({
  className,
  title,
  children
}) => {
  return (
    <fieldset
      className={className}
    >
      <legend>{title}</legend>
      {children}
    </fieldset>
  )
}

export default FieldSet
