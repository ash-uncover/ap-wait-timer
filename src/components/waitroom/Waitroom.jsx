import React from 'react'

import {
  useEffect,
  useParams,
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

  const { date } = useParams()
  const now = new Date().getTime()
  const actualDate = date || now

  const [idle, setIdle] = useState(false)
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0)

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

  return (
    <AppPage
      className={idle ? 'waitroom waitroom-idle' : 'waitroom'}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <AppToolbar />

      <AppContent>
        <Alarm
          alarm={actualDate}
        />
        <AudioPlayer
          title={SoundLibrary.listSounds()[currentSoundIndex].title}
          src={SoundLibrary.listSounds()[currentSoundIndex].src}
          onComplete={() => setCurrentSoundIndex((currentSoundIndex + 1) % SoundLibrary.list().length)}
        />
      </AppContent>
    </AppPage>
  )
}

export default Waitroom
