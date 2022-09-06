/* globals Audio */

import React from 'react'

import {
    useEffect,
    useState
} from 'lib/hooks'

import './AudioPlayer.scss'

export const AudioPlayer = ({
    title,
    src,
    time,
    onComplete
}) => {
    // HOOKS

    const audio = new Audio(src)
    audio.addEventListener('ended', onComplete)

    const [percentage, setPercentage] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [error, setError] = useState(null)

    const startAudio = () => {
        console.log('AudioPlayer - startAudio')
        audio.removeEventListener('canplay', startAudio)
        play()
    }

    let progressInterval;

    useEffect(() => {
        console.log('AudioPlayer - useEffect')
        audio.addEventListener('canplay', startAudio)
        return () => {
            console.log('AudioPlayer - useEffect return')
            clearInterval(progressInterval)
            audio.pause()
        }
    }, [src])

    // VIEW CALLBACKS

    const play = () => {
        console.log('AudioPlayer - play')
        audio.play()
            .then(() => {
                audio.currentTime = time
                progressInterval = setInterval(() => {
                    const newPercentage = audio.currentTime * 100 / audio.duration
                    setPercentage(newPercentage)
                }, 100)
                setPlaying(true)
                setError(null)
            })
            .catch((error) => {
                setPlaying(false)
                setError(error)
            })
    }

    // RENDERING

    console.log('AudioPlayer - render')
    return (
        <div style={{ display: 'flex' }}>
            {!playing && <button onClick={play}>Play</button>}
            <AudioPlayerRenderer
                className={error ? 'error' : ''}
                title={error ? 'Failed to start' : title}
                percentage={percentage}
            />
        </div>
    )
}

export const AudioPlayerRenderer = ({
    className,
    title,
    percentage,
}) => {
    return (
        <div className={`audio-player ${className}`}>
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
