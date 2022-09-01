import React from 'react'

import {
    Switch,
    Route
} from 'react-router-dom'

import App from 'components/commons/app/App'

import Wait from 'routes/wait'
import Home from 'routes'

const Root = () => {
    return (
        <App>
            <Switch>
                <Route path='/wait'>
                    <Wait />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </App>
    )
}

export default Root
