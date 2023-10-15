import React, { useEffect, useMemo, useState } from 'react'

import { AudioPlayerProgress } from './AudioPlayerProgress'

import './AudioPlayer.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AudioPlayerProperties {
  src: string
  title: string
  time: number
  volume: number
  onComplete: () => void
}
export const AudioPlayer = ({
  title,
  src,
  time,
  volume,
  onComplete
}: AudioPlayerProperties) => {

  // Hooks //

  const [error, setError] = useState(null)

  const audio = useMemo(() => {
    return new Audio(src)
  }, [src])

  const playAudio = () => {
    audio.removeEventListener('canplay', playAudio)
    audio.volume = volume
    audio.play()
      .then(() => {
        audio.currentTime = time
        setError(null)
      })
      .catch((error) => {
        setError(error)
      })
  }

  useEffect(() => {
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  useEffect(() => {
    audio.addEventListener('ended', onComplete)
    audio.addEventListener('canplay', playAudio)

    return () => audio.pause()
  }, [src])

  // Rendering //

  if (error) {
    return (
      <div className='audio-player error'>
        Failed to start
      </div>
    )
  }

  return (
    <div className='audio-player'>
      <div className='audio-player-title'>
        <div className='audio-player-title__text'>
          {title}
        </div>
      </div>
      <AudioPlayerProgress audio={audio} />
    </div>
  )
}
