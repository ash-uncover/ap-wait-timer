import React from 'react'

import {
  useRouteMatch
} from 'lib/hooks'

import {
  Switch,
  Route
} from 'react-router-dom'

import WimhofToolbar from './WimhofToolbar'
import WimhofMenu from './WimhofMenu'
import WimhofSession from './WimhofSession'

import './Wimhof.scss'

const Wimhof = () => {
  const match = useRouteMatch()

  return (
    <div className='wimhof'>
      <div className='wimhof-background'>
        <div className='wimhof-background-image' />
        <div className='wimhof-background-mask' />
      </div>
      <div className='wimhof-main'>
        <WimhofToolbar />
        <div className='wimhof-content container'>
          <Switch>
            <Route path={`${match.path}/:sessionId`}>
              <WimhofSession />
            </Route>
            <Route path={`${match.path}/`}>
              <WimhofMenu />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Wimhof
