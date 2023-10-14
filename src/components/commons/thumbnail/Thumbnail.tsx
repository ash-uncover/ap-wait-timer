import React from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './Thumbnail.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ThumbnailProperties {
  className?: string

  alt: string
  selected?: boolean
  src: string
  onClick: () => void
}
export const Thumbnail = ({
  className,

  alt,
  selected,
  src,
  onClick,
}: ThumbnailProperties) => {

  // Events //

  function handleClick() {
    onClick()
  }

  // Rendering //

  const classes = new ClassBuilder(['thumbnail', className])
  if (selected) {
    classes.add('thumbnail--selected')
  }

  return (
    <button
      className={classes.className}
      tabIndex={0}
      onClick={handleClick}
    >
      <img
        className='thumbnail_image'
        alt={alt}
        src={src}
      />
    </button>
  )
}
