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

  const audio = useMemo(() => {
    return new Audio(src)
  }, [src])
  audio.addEventListener('ended', onComplete)

  const [error, setError] = useState(null)

  const startAudio = () => {
    audio.removeEventListener('canplay', startAudio)
    play()
  }

  let progressInterval;

  useEffect(() => {
    audio.addEventListener('canplay', startAudio)
    return () => {
      clearInterval(progressInterval)
      audio.pause()
    }
  }, [src])

  // VIEW CALLBACKS //

  const play = () => {
    audio.play()
      .then(() => {
        audio.currentTime = time
        setError(null)
      })
      .catch((error) => {
        setError(error)
      })
  }

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
