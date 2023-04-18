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

const extractTitle = (queryTitle) => {
  return queryTitle || ''
}

const extractSubTitle = (querySubTitle) => {
  return querySubTitle || ''
}

const extractBackground = (queryBackground, size) => {
  if (isNaN(queryBackground)) {
    return Math.floor(Math.random() * size);
  }
  return Number(queryBackground)
}

const extractDate = (queryDate) => {
  if (isNaN(queryDate)) {
    return new Date().getTime()
  }
  return Number(queryDate)
}

const extractSongs = (querySongs) => {
  const list = (querySongs || '').split(',')
  return list.map(Number)
}

const songlistDuration = (songlist) => {
  return songlist.reduce((acc, song) => {
    return acc + song.duration
  }, 0)
}

const WaitSession = () => {
  let timeout

  // HOOKS

  const [idle, setIdle] = useState(false)
  const [playerState, setPlayerState] = useState(STATE.NOT_STARTED)
  const [playlist, setPlaylist] = useState([])
  const [playlistSong, setPlaylistSong] = useState(0)
  const [songCurrentTime, setSongCurrentTime] = useState(0)

  const dataImages = useSelector(DataSelectors.images)
  const dataSongs = useSelector(DataSelectors.songs)

  const query = useQuery()
  const queryString = String(query)

  console.log('WaitSession - rerender')
  console.log(queryString)

  const {
    title,
    subTitle,
    background,
    date,
    songs,
  } = useMemo(() => {
    const titleMemo = extractTitle(query.get('title'))
    const subTitleMemo = extractSubTitle(query.get('subTitle'))
    const backgroundMemo = dataImages[extractBackground(query.get('background'), dataImages.length)]
    const dateMemo = extractDate(query.get('date'))
    const songsMemo = extractSongs(query.get('songs')).map(i => dataSongs[i])

    const result = {
      title: titleMemo,
      subTitle: subTitleMemo,
      background: backgroundMemo,
      date: dateMemo,
      songs: songsMemo
    }
    console.log('WaitSession - useMemo')
    console.log(result)
    return result
  }, [queryString])



  useEffect(() => {
    console.log('WaitSession - useEffect')
    timeout = setTimeout(() => {
      setIdle(true)
    }, 1500)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // VIEW CALLBACKS

  const onClick = () => {
    setIdle(false)
  }
  const onMouseMove = () => {
    clearTimeout(timeout)
    if (!idle) {
      timeout = setTimeout(() => {
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
        src={background.url}
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
