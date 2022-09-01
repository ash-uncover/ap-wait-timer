import React from 'react'

import {
  useEffect,
  useQuery,
  useState,
  useSelector
} from 'lib/hooks'

import {
  AppContent,
  AppPage,
  AppToolbar
} from 'components/commons/app'

import {
  selectors as AppSelectors
} from 'store/app'

import {
  Link
} from 'react-router-dom'

import Alarm from 'components/commons/alarm/Alarm'
import Button from 'components/commons/basic/Button'
import AudioPlayer from 'components/commons/AudioPlayer'

import SoundLibrary from 'lib/utils/SoundLibrary'

import './Waitroom.scss'

const Waitroom = () => {
  let timeout

  // HOOKS

  const query = useQuery()
  const queryDate = query.get('date')
  const date = queryDate ? Number(queryDate) : 0
  const queryShowClock = Boolean(query.get('showClock'))
  const queryTitle1 = query.get('title1')
  const queryTitle2 = query.get('title2')
  const title1 = queryTitle1 || ''
  const title2 = queryTitle2 || ''
  const music = useSelector(AppSelectors.appMusicSelector)

  const [idle, setIdle] = useState(false)
  const [audioIndex, setAudioIndex] = useState(0)
  const [audioTitle, setAudioTitle] = useState(music[0])
  const [audioSource, setAudioSource] = useState(SoundLibrary.get(music[0]).src)

  useEffect(() => {
    timeout = setTimeout(() => {
      setIdle(true)
    }, 1500)
    return () => clearTimeout(timeout)
  })

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
    const nextAudioIndex = (audioIndex + 1) % music.length
    const nextAudioTitle = music[nextAudioIndex]
    const nextAudioSource = SoundLibrary.get(music[nextAudioIndex]).src

    setAudioIndex(nextAudioIndex)
    setAudioTitle(nextAudioTitle)
    setAudioSource(nextAudioSource)
  }

  return (
    <AppPage
      className={idle ? 'waitroom waitroom-idle' : 'waitroom'}
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

      <AppContent>
        <div
          className='waitroom-header'
        >
          <h1 className='title'>
            <div>
              {title1}
            </div>
            {queryShowClock && <Alarm alarm={date} showHours={true} showMinutes={true} showSeconds={true} />}
          </h1>
          <h2 className='subtitle'>
            {title2}
          </h2>
        </div>

        <div
          className='waitroom-audio'
        >
          <AudioPlayer
            title={audioTitle}
            src={audioSource}
            onComplete={onComplete}
          />
        </div>

      </AppContent>
    </AppPage>
  )
}

export default Waitroom
