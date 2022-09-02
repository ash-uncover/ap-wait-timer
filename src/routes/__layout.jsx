import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'

import RouteWait from 'routes/wait'
import RouteHome from 'routes'

const Root = () => {
    return (
        <Router hashType='noslash'>
            <Routes>
                <Route path='/wait' element={<RouteWait />} />
                <Route path='/' element={<RouteHome />} />
            </Routes>
        </Router>
    )
}

export default Root
