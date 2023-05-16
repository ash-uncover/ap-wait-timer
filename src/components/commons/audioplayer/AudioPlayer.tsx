/* globals Audio */

import React from 'react'

import {
  useEffect,
  useMemo,
  useState
} from 'lib/hooks'

import AudioPlayerTitle from './AudioPlayerTitle'
import AudioPlayerProgress from './AudioPlayerProgress'

import './AudioPlayer.css'

export const AudioPlayer = ({
  title,
  src,
  time,
  onComplete
}) => {

  // HOOKS //
  const [error, setError] = useState(null)

  const audio = useMemo(() => {
    return new Audio(src)
  }, [src])

  const playAudio = () => {
    audio.removeEventListener('canplay', playAudio)
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
    audio.addEventListener('ended', onComplete)
    audio.addEventListener('canplay', playAudio)

    return audio.pause
  }, [src])

  // RENDERING //

  if (error) {
    return (
      <div className='audio-player error'>
        Failed to start
      </div>
    )
  }

  return (
    <div className='audio-player'>
      <AudioPlayerTitle title={title} />
      <AudioPlayerProgress audio={audio} />
    </div>
  )
}

export default AudioPlayer
