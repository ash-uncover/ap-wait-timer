import React from 'react'

import { AppBackground } from 'components/commons/app'

import './App.scss'

const App = ({
    children,
}) => {
    return (
        <div className='app'>
            <AppBackground src='http://localhost:8080/assets/images/wait-background-color.jpg' />
            {children}
        </div>
    )
}

export default App
