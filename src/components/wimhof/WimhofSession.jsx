import React from 'react'

import {
  useParams
} from 'lib/hooks'

const WimhofSession = () => {
  const { sessionId } = useParams()

  const audio = new Audio('/sound/Kurup - Joeira.flac')
  audio.play()

  return (
    <div className='wimhof-session'>
      {atob(sessionId)}
    </div>
  )
}

export default WimhofSession
