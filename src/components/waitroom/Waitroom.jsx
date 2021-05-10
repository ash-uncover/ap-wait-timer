import React from 'react'

import {
  useEffect,
  useQuery,
  useState
} from 'lib/hooks'

import {
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

import SoundLibrary from 'lib/utils/SoundLibrary'

import './Waitroom.scss'

const Waitroom = () => {
  let timeout

  // HOOKS

  const query = useQuery()
  const queryDate = query.get('date')
  const date = queryDate ? Number(queryDate) : 0
  const queryTitle1 = query.get('title1')
  const queryTitle2 = query.get('title2')
  const title1 = queryTitle1 || ''
  const title2 = queryTitle2 || ''

  const [idle, setIdle] = useState(false)
  const [audioIndex, setAudioIndex] = useState(0)
  const [audioTitle, setAudioTitle] = useState(SoundLibrary.listSounds()[audioIndex].title)
  const [audioSource, setAudioSource] = useState(SoundLibrary.listSounds()[audioIndex].src)

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
    const nextAudioIndex = (audioIndex + 1) % SoundLibrary.list().length
    const nextAudioTitle = SoundLibrary.listSounds()[nextAudioIndex].title
    const nextAudioSource = SoundLibrary.listSounds()[nextAudioIndex].src

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
            <Alarm
              alarm={date}
            />
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
