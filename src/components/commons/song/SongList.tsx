import React, { ReactNode } from 'react'

import { ClassBuilder } from '@uncover/react-commons'

import './SongList.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface SongListProperties {
  className?: string

  children: ReactNode
}
export const SongList = ({
  className,

  children,
}: SongListProperties) => {

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['song-list', className])

  return (
    <div className={classes.className} >
      {children}
    </div>
  )
}
