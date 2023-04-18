import React from 'react'

import {
  useEffect,
  useMemo,
  useQuery,
  useState,
  useSelector
} from 'lib/hooks'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
  AppBackground,
  AppToolbar
} from 'components/commons/app'

import {
  Link
} from 'react-router-dom'

import Alarm from 'components/commons/alarm/Alarm'
import Button from 'components/commons/basic/Button'
import AudioPlayer from 'components/commons/audioplayer/AudioPlayer'

import './WaitSession.css'
import DataSelectors from 'store/data/data.selectors'

const STATE = {
  NOT_STARTED: 'NOT_STARTED',
  PLAYING: 'PLAYING',
  ENDED: 'ENDED',
}


const songlistDuration = (songlist) => {
  return songlist.reduce((acc, song) => {
    return acc + song.duration
  }, 0)
}

type WaitSessionProperties = {
  title?: string
  subTitle?: string
  date: number
  background: string
  songs: string[]
}
const WaitSession = ({
  title,
  subTitle,
  date,
  background,
  songs
}: WaitSessionProperties) => {



  console.log(title)
  console.log(subTitle)
  console.log(date)
  console.log(background)
  console.log(songs)

  // HOOKS

  const [idle, setIdle] = useState(false)
  const [playerState, setPlayerState] = useState(STATE.NOT_STARTED)
  const [playlist, setPlaylist] = useState([])
  const [playlistSong, setPlaylistSong] = useState(0)
  const [songCurrentTime, setSongCurrentTime] = useState(0)

  let idleTimeout
  useEffect(() => {
    idleTimeout = setTimeout(() => {
      setIdle(true)
    }, 1500)
    return () => {
      clearTimeout(idleTimeout)
    }
  }, [])

  // VIEW CALLBACKS

  const onClick = () => {
    setIdle(false)
  }

  const onMouseMove = () => {
    clearTimeout(idleTimeout)
    if (!idle) {
      idleTimeout = setTimeout(() => {
        setIdle(true)
      }, 1500)
    }
  }

  const onStartPlaying = () => {
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

  const onComplete = () => {
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

  const renderAlarmArea = () => {
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

  const renderAudioArea = () => {
    switch (playerState) {
      case STATE.NOT_STARTED: {
        return (

          <button
            className='button-start'
            onClick={onStartPlaying}
          >
            <FontAwesomeIcon icon={['fas', 'play']} />
          </button>
        );
      }
      case STATE.PLAYING: {
        return (
          <AudioPlayer
            title={playlist[playlistSong]?.name}
            src={playlist[playlistSong]?.url}
            time={songCurrentTime}
            onComplete={onComplete}
          />
        );
      }
      case STATE.ENDED:
      default: {
        return null;
      }
    }
  }

  const classes = ['waitsession']
  if (idle) {
    classes.push('waitsession-idle')
  }
  if (playerState === STATE.ENDED) {
    classes.push('waitsession-ended')
  }

  return (
    <>
      <AppBackground
        src={background}
      />
      <div
        className={classes.join(' ')}
        onClick={onClick}
        onMouseMove={onMouseMove}
      >
        <AppToolbar>
          <Link to='/'>
            <Button
              icon={['fas', 'home']}
            />
          </Link>
        </AppToolbar>
        <div className='overlay-header overlay'>
          <h1 className='text title'>
            <div>
              {title}
            </div>
            {renderAlarmArea()}
          </h1>
          <h2 className='text subtitle'>
            {subTitle}
          </h2>
        </div>

        <div className='overlay-audio overlay'>
          {renderAudioArea()}
        </div>
      </div>
    </>
  )
}

export default WaitSession
