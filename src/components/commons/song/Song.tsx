import React, { ReactNode } from 'react'

import { Button, ButtonSemantics, ClassBuilder } from '@uncover/react-commons'

import './Song.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface SongProperties {
  className?: string

  selected?: boolean
  text: string
  onClick: () => void
}
export const Song = ({
  className,

  selected,
  text,
  onClick,
}: SongProperties) => {

  // Events //

  function handleClick() {
    onClick()
  }

  // Rendering //

  const classes = new ClassBuilder(['song', className])

  return (
    <Button
      className={classes.className}
      semantic={selected ? ButtonSemantics.PRINCIPAL : ButtonSemantics.DEFAULT}
      onClick={handleClick}
    >
      <input
        className='song_input'
        type='checkbox'
        id={text}
        name={text}
        checked={selected}
        tabIndex={-1}
        onChange={handleClick}
      />
      <label
        className='song_label'
        htmlFor={text}
      >
        {text}
      </label>
    </Button>
  )
}
