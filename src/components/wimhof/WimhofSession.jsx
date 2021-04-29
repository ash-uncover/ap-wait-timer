import React from 'react'

import {
  useParams
} from 'lib/hooks'

const WimhofSession = () => {
  const { sessionId } = useParams()

  return (
    <div className='wimhof-session'>
      {atob(sessionId)}
    </div>
  )
}

export default WimhofSession
