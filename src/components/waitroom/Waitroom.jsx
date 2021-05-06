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

import Alarm from 'components/commons/alarm/Alarm'
import AudioPlayer from 'components/commons/AudioPlayer'
import SoundLibrary from 'lib/utils/SoundLibrary'

import './Waitroom.scss'

const Waitroom = () => {
  let timeout

  // HOOKS

  const query = useQuery()
  const queryDate = query.get('date')
  const date = queryDate ? Number(queryDate) : 0
  const queryTitle = query.get('title')
  const title = queryTitle || ''

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
    console.log(nextAudioIndex + ' - ' + nextAudioTitle)
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
      <AppToolbar />

      <AppContent>
        <h1>
          {title}
        </h1>
        <Alarm
          alarm={date}
        />
        <AudioPlayer
          title={audioTitle}
          src={audioSource}
          onComplete={onComplete}
        />
      </AppContent>
    </AppPage>
  )
}

export default Waitroom
