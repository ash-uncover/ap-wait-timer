import React, { useEffect, useState } from 'react'

import './AudioPlayerProgress.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AudioPlayerProgressProperties {
  audio: any
}
export const AudioPlayerProgress = ({
  audio
}: AudioPlayerProgressProperties) => {

  // HOOKS //

  const [percentage, setPercentage] = useState(0)

  let progressInterval

  useEffect(() => {
    progressInterval = setInterval(() => {
      const newPercentage = audio.currentTime * 100 / audio.duration
      setPercentage(newPercentage)
    }, 100)
    return () => clearInterval(progressInterval)
  }, [audio])

  // RENDERING

  return (
    <div className='audio-player-progress'>
      <div
        className='audio-player-progress__bar'
        style={{ width: `${percentage}%` }}
      />
    </div>

  )
}
