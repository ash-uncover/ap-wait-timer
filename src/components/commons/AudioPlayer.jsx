/* globals Audio */

import React from 'react'

import {
  useEffect,
  useState
} from 'lib/hooks'

import './AudioPlayer.scss'

const AudioPlayer = ({
  title,
  src,
  onComplete
}) => {
  // HOOKS

  const [audio, setAudio] = useState(new Audio(src))

  const [playing, setPlaying] = useState(false)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    play()
    const interval = setInterval(() => {
      const newPercentage = audio.currentTime * 100 / audio.duration
      setPercentage(newPercentage)
      console.log(newPercentage)
      if (newPercentage >= 100) {
        setAudio(null)
        setPercentage(0)
        setPlaying(false)
        onComplete()
      }
    }, 100)
    return () => clearInterval(interval)
  })

  // VIEW CALLBACKS

  const play = () => {
    if (audio === null) {
      setAudio(new Audio(src))
    }
    if (audio !== null && !playing) {
      audio.play()
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {
          console.log('couldnt start playing')
          setPlaying(false)
        })
    }
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
