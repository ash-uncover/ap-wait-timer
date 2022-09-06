import React from 'react'

import {
    useEffect,
    useMemo,
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

    const dataImages = useSelector(ImagesSelectors.imagesDataSelector)
    const dataSongs = useSelector(SongsSelectors.songsDataSelector)

    const query = useQuery()
    const queryString = String(query)

    console.log('rerender')
    console.log(queryString)

    const {
        title,
        subTitle,
        background,
        date,
        playlist,
        songInitialTime
    } = useMemo(() => {
        const titleMemo = extractTitle(query.get('title'))
        const subTitleMemo = extractSubTitle(query.get('subTitle'))
        const backgroundMemo = dataImages[extractBackground(query.get('background'), dataImages.length)]
        const dateMemo = extractDate(query.get('date'))
        const songsMemo = extractSongs(query.get('songs')).map(i => dataSongs[i])

        const playlistMemo = []
        const now = new Date()
        const endDate = new Date(dateMemo)
        const duration = (endDate.getTime() - now.getTime()) / 1000

        console.log(dateMemo)
        console.log(endDate)
        console.log(now)

        let next = 0
        let resultDuration = songlistDuration(playlistMemo)
        while (resultDuration < duration) {
            playlistMemo.unshift(songsMemo[next++ % songsMemo.length])
            resultDuration = songlistDuration(playlistMemo)
        }
        const result = {
            title: titleMemo,
            subTitle: subTitleMemo,
            background: backgroundMemo,
            date: dateMemo,
            playlist: playlistMemo,
            songInitialTime: resultDuration - duration
        }
        console.log('WaitSession - useMemo')
        console.log(result)
        return result
    }, [queryString])

    const [idle, setIdle] = useState(false)
    const [playlistSong, setPlaylistSong] = useState(0)
    const [songCurrentTime, setSongCurrentTime] = useState(songInitialTime)

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

    const onComplete = () => {
        console.log('WaitSession - onComplete')
        const nextPlaylistSong = (playlistSong + 1) % playlist.length
        setSongCurrentTime(0)
        setPlaylistSong(nextPlaylistSong)
    }

    return (
        <>
            <AppBackground
                src={background.url}
            />
            <div
                className={idle ? 'waitsession waitsession-idle' : 'waitsession'}
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
                <div
                    className='overlay-header overlay'
                >
                    <h1 className='text title'>
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
                    <h2 className='text subtitle'>
                        {subTitle}
                    </h2>
                </div>

                <div
                    className='overlay-audio overlay'
                >
                    <AudioPlayer
                        title={playlist[playlistSong]?.name}
                        src={playlist[playlistSong]?.url}
                        time={songCurrentTime}
                        onComplete={onComplete}
                    />
                </div>
            </div>
        </>
    )
}

export default WaitSession
