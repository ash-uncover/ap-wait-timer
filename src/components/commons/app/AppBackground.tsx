import React from 'react'

import './AppBackground.css'

type AppBackgroundProperties = {
  src: string
}
const AppBackground = ({
  src
}: AppBackgroundProperties) => {

  // Rendering //

  return (
    <div className='app-background'>
      <img
        className='app-background-image'
        src={src}
      />
      <div className='app-background-mask' />
    </div>
  )
}

export default AppBackground
