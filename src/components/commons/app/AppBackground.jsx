import React from 'react'

import './AppBackground.scss'

const AppBackground = ({ src }) => {
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
