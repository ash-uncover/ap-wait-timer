import React from 'react'

import './AudioPlayerTitle.css'

export const AudioPlayerTitle = ({
  title,
}) => {

  // HOOKS //

  // RENDERING

  return (
    <div className='audio-player-title'>
      <div className='audio-player-title__text'>
        {title}
      </div>
    </div>

  )
}

export default AudioPlayerTitle
