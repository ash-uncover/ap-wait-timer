import React from 'react'

import {
    useEffect,
    useQuery,
    useState,
    useSelector
} from 'lib/hooks'

import {
    AppBackground,
    AppContent,
    AppPage,
    AppToolbar
} from 'components/commons/app'

import {
    Link
} from 'react-router-dom'

import Alarm from 'components/commons/alarm/Alarm'
import Button from 'components/commons/basic/Button'
import AudioPlayer from 'components/commons/AudioPlayer'

import {
    selectors as ImagesSelectors
} from 'store/data/images'

import {
    selectors as SongsSelectors
} from 'store/data/songs'

import './WaitSession.scss'

const extractTitle = (queryTitle) => {
    return queryTitle || ''
}

const extractSubTitle = (querySubTitle) => {
    return querySubTitle || ''
}

const extractBackground = (queryBackground) => {
    if (isNaN(queryBackground)) {
        return 0
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

const WaitSession = () => {
    let timeout

    // HOOKS

    const dataImages = useSelector(ImagesSelectors.imagesDataSelector)
    const dataSongs = useSelector(SongsSelectors.songsDataSelector)

    const query = useQuery()

    const title = extractTitle(query.get('title'))
    const subTitle = extractSubTitle(query.get('subTitle'))
    const background = dataImages[extractBackground(query.get('background'))]
    const date = extractDate(query.get('date'))
    const songs = extractSongs(query.get('songs')).map(i => dataSongs[i])
    const playlist = []

    const songlistDuration = (songlist) => {
        return songlist.reduce((acc, song) => {
            return acc + song.duration
        }, 0)
    }

    const now = new Date()
    const endDate = new Date(date)
    const duration = (endDate.getTime() - now.getTime()) / 1000

    let next = 0
    let playlistDuration = songlistDuration(playlist)
    while (playlistDuration < duration) {
        playlist.unshift(songs[next++ % songs.length])
        playlistDuration = songlistDuration(playlist)
    }

    const [idle, setIdle] = useState(false)
    const [song, setSong] = useState(0)
    const [songCurrentTime, setSongCurrentTime] = useState(playlistDuration - duration)

    useEffect(() => {
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

    const onComplete = () => {
        const nextSong = (song + 1) % songs.length
        setSongCurrentTime(0)
        setSong(nextSong)
    }

    return (
        <>
            <AppBackground
                src={background.url}
            />
            <AppToolbar>
                <Link to='/'>
                    <Button
                        icon={['fas', 'home']}
                    />
                </Link>
            </AppToolbar>
            <AppPage
                className={idle ? 'waitsession waitsession-idle' : 'waitsession'}
                onClick={onClick}
                onMouseMove={onMouseMove}
            >
                <div
                    className='waitsession-header'
                >
                    <h1 className='title'>
                        <div>
                            {title}
                        </div>
                        <Alarm
                            alarm={date}
                            showHours={true}
                            showMinutes={true}
                            showSeconds={true}
                        />
                    </h1>
                    <h2 className='subtitle'>
                        {subTitle}
                    </h2>
                </div>

                <div
                    className='waitsession-audio'
                >
                    <AudioPlayer
                        title={playlist[song]?.name}
                        src={playlist[song]?.url}
                        time={songCurrentTime}
                        onComplete={onComplete}
                    />
                </div>
            </AppPage>
        </>
    )
}

export default WaitSession
