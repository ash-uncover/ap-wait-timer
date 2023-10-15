import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

import { Alarm } from 'components/commons/alarm/Alarm'
import { AudioPlayer } from 'components/commons/audioplayer/AudioPlayer'

import {
  Button,
  ClassBuilder,
  Shell,
  ShellBackground,
  Slider
} from '@uncover/react-commons'

import { WaitToolbar } from './WaitToolbar'
import { WaitOverlay } from './WaitOverlay'

import './Wait.css'

// ---------------------------------------------------
// Static Items
// ---------------------------------------------------

const STATE = {
  NOT_STARTED: 'NOT_STARTED',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING',
  ENDED: 'ENDED',
}

const songlistDuration = (songlist) => {
  return songlist.reduce((acc, song) => {
    return acc + song.duration
  }, 0)
}

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface WaitProperties {
  title?: string
  subTitle?: string
  date: number
  background: string
  songs: string[]
}
export const Wait = ({
  title,
  subTitle,
  date,
  background,
  songs
}: WaitProperties) => {

  // Hooks //

  const navigate = useNavigate()

  const [idle, setIdle] = useState(false)
  const [playerState, setPlayerState] = useState(STATE.NOT_STARTED)
  const [playlist, setPlaylist] = useState([])
  const [playlistSong, setPlaylistSong] = useState(0)
  const [songCurrentTime, setSongCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const [test, setTest] = useState(100)

  let idleTimeout
  useEffect(() => {
    idleTimeout = setTimeout(() => {
      setIdle(true)
    }, 1500)
    return () => {
      clearTimeout(idleTimeout)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  // Events //

  function onClick() {
    setIdle(false)
  }

  function onMouseMove() {
    clearTimeout(idleTimeout)
    if (!idle) {
      idleTimeout = setTimeout(() => {
        setIdle(true)
      }, 1500)
    }
  }

  function onVolumeChange(event) {
    setVolume(event.value);
  }

  function onStartPlaying(event: React.FormEvent<HTMLButtonElement>) {
    event.stopPropagation()
    // Compute playlist and starting point
    const now = new Date()
    const endDate = new Date(date)
    const duration = (endDate.getTime() - now.getTime()) / 1000
    const playlist = []

    if (duration < 0) {
      setPlayerState(STATE.ENDED)
    } else {
      let next = 0
      let resultDuration = songlistDuration(playlist)
      while (resultDuration < duration) {
        playlist.unshift(songs[next++ % songs.length])
        resultDuration = songlistDuration(playlist)
      }
      setPlaylist(playlist)
      setSongCurrentTime(resultDuration - duration)
      setPlayerState(STATE.PLAYING)
    }

  }

  function onComplete() {
    if (playlistSong + 1 === playlist.length) {
      setPlayerState(STATE.ENDED)
      setSongCurrentTime(0)
      setPlaylistSong(null)
    } else {
      const nextPlaylistSong = playlistSong + 1
      setSongCurrentTime(0)
      setPlaylistSong(nextPlaylistSong)
    }
  }

  function onPause(event: React.FormEvent<HTMLButtonElement>) {
    if (playerState === STATE.PLAYING) {
      setPlayerState(STATE.NOT_STARTED)
    } else {
      onStartPlaying(event)
    }
  }

  function onQuit() {
    navigate('/')
  }

  // Rendering //

  function renderAlarmArea() {
    switch (playerState) {
      case STATE.PLAYING: {
        return (
          <Alarm
            alarm={date}
            showHours={true}
            showMinutes={true}
            showSeconds={true}
          />
        );
      }
      case STATE.NOT_STARTED:
      case STATE.ENDED:
      default: {
        return null;
      }
    }
  }

  function renderAudioArea() {
    switch (playerState) {
      case STATE.NOT_STARTED: {
        return (
          <button
            className='button-start'
            onClick={onStartPlaying}
          >
            <FontAwesomeIcon icon={['fas', 'play']} />
          </button>
        )
      }
      case STATE.PLAYING: {
        return (
          <AudioPlayer
            title={playlist[playlistSong]?.name}
            src={playlist[playlistSong]?.url}
            time={songCurrentTime}
            volume={volume / 100}
            onComplete={onComplete}
          />
        )
      }
      case STATE.ENDED:
      default: {
        return null;
      }
    }
  }

  const classes = new ClassBuilder(['wait'])
  if (idle) {
    classes.add('wait--idle')
  }
  if (playerState === STATE.ENDED) {
    classes.add('wait--ended')
  }

  return (
    <Shell className={classes.className}>

      <ShellBackground>
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
          src={background}
        />
      </ShellBackground>

      <WaitToolbar show={!idle}>
        <Slider
          style={{
            width: '15rem',
            marginLeft: 'auto'
          }}
          min={0}
          max={100}
          value={volume}
          onChange={onVolumeChange}
        />
        <Button
          style={{ flexShrink: 0 }}
          icon={playerState === STATE.PLAYING ? faPause : faPlay}
          onClick={onPause}
        />
        <Button
          style={{ flexShrink: 0 }}
          icon={faStop}
          onClick={onQuit}
        />
      </WaitToolbar>

      <div
        className='ap-shell__content'
      >
        <WaitOverlay className='overlay-header'>
          <h1 className='text title'>
            <div>
              {title}
            </div>
            {renderAlarmArea()}
          </h1>
          <h2 className='text subtitle'>
            {subTitle}
          </h2>
        </WaitOverlay>

        <WaitOverlay className='overlay-audio'>
          <div className='overlay-audio__control'>
            {renderAudioArea()}
          </div>
        </WaitOverlay>
      </div>

    </Shell>
  )
}
