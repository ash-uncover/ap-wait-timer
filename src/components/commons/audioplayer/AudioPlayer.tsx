/* globals Audio */

import React from 'react'

import {
  useEffect,
  useMemo,
  useState
} from 'lib/hooks'


import AudioPlayerTitle from './AudioPlayerTitle'

import './AudioPlayer.css'
import AudioPlayerProgress from './AudioPlayerProgress'

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

  const [playing, setPlaying] = useState(false)
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
        setPlaying(true)
        setError(null)
      })
      .catch((error) => {
        setPlaying(false)
        setError(error)
      })
  }

  // RENDERING //

  return (
    <AudioPlayerRenderer
      className={error ? 'error' : ''}
      title={error ? 'Failed to start' : title}
      audio={audio}
    />
  )
}

export const AudioPlayerRenderer = ({
  className,
  title,
  audio,
}) => {

  // RENDERING //
  return (
    <div className={`audio-player ${className}`}>
      <AudioPlayerTitle title={title} />
      <AudioPlayerProgress audio={audio} />
    </div>
  )
}

export default AudioPlayer
