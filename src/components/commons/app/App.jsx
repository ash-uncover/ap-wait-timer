import React from 'react'

import { AppBackground } from 'components/commons/app'

import './App.scss'

import mainBackground from 'assets/images/background.jpg'

const App = ({
    children,
}) => {
    return (
        <div className='app'>
            <AppBackground src={mainBackground} />
            {children}
        </div>
    )
}

export default App
