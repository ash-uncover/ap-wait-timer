import React from 'react'

import {
  useParams,
  useState
} from 'lib/hooks'

import {
  decode
} from 'lib/utils/SessionsUtils'

import Clock from 'components/commons/alarm/Alarm'
import AudioPlayer from 'components/commons/AudioPlayer'
import SoundLibrary from 'lib/utils/SoundLibrary'

const WimhofSession = () => {
  const { sessionId } = useParams()
  const session = decode(sessionId)

  const [currentSoundIndex, setCurrentSoundIndex] = useState(0)

  return (
    <div className='wimhof-session'>

      <Clock
        alarm={session.date}
      />
      <AudioPlayer
        title={SoundLibrary.listSounds()[currentSoundIndex].title}
        src={SoundLibrary.listSounds()[currentSoundIndex].src}
        onComplete={() => setCurrentSoundIndex((currentSoundIndex + 1) % SoundLibrary.list().length)}
      />
    </div>
  )
}

export default WimhofSession
