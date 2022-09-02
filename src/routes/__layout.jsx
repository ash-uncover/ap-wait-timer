import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'

import Wait from 'routes/wait'
import Home from 'routes'

const Root = () => {
    return (
        <Router hashType='noslash'>
            <Routes>
                <Route path='/wait' element={<Wait />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default Root
