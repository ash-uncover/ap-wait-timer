/* globals Audio */

import React from 'react'

import {
  useRef,
  useEffect,
  useState
} from 'lib/hooks'

import './AudioPlayer.scss'

export const AudioPlayer = ({
  title,
  src,
  onComplete
}) => {
  // HOOKS

  const audio = new Audio(src)
  audio.addEventListener('ended', onComplete)

  const [percentage, setPercentage] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    play()
    const interval = setInterval(() => {
      const newPercentage = audio.currentTime * 100 / audio.duration
      setPercentage(newPercentage)
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [src])

  // VIEW CALLBACKS

  const play = () => {
    audio.play()
      .then(() => {
        setPlaying(true)
      })
      .catch(() => {
        setPlaying(false)
        setError(true)
      })
  }

  // RENDERING

  return (
    <div>
      {!playing && <button onClick={play}>Play</button>}
      <AudioPlayerRenderer
        title={title}
        percentage={percentage}
      />
    </div>
  )
}

export const AudioPlayerRenderer = ({
  title,
  percentage
}) => {
  return (
    <div className='audio-player'>
      <div className='audio-player-header'>
        <div className='audio-player-title'>
          {title}
        </div>
      </div>

      <div className='audio-player-bar'>
        <div
          className='audio-player-progress'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
