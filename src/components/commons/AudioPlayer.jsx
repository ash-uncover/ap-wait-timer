/* globals Audio */

import React from 'react'

import {
  useEffect,
  useRef,
  useState
} from 'lib/hooks'

import './AudioPlayer.scss'

const AudioPlayer = ({
  title,
  src,
  onComplete
}) => {
  const audio = new Audio(src)

  // HOOKS

  const progressBar = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    play()
    const interval = setInterval(() => {
      const percentPlayed = audio.currentTime * 100 / audio.duration
      if (progressBar && progressBar.current) {
        progressBar.current.style.width = `${percentPlayed}%`
      }
      if (percentPlayed === 100) {
        onComplete()
        setPlaying(false)
      }
    }, 100)
    return () => clearInterval(interval)
  })

  // VIEW CALLBACKS

  const play = () => {
    if (!playing) {
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
    <div
      className='audio-player'
    >
      {!playing && <button onClick={play}>Play</button>}

      <div
        className='audio-player-header'
      >
        <div
          className='audio-player-title'
        >
          {title}
        </div>
      </div>

      <div
        className='audio-player-bar'
      >
        <div
          className='audio-player-progress'
          ref={progressBar}

        />
      </div>
    </div>
  )
}

export default AudioPlayer
