import React from 'react'

import {
  useRouteMatch
} from 'lib/hooks'

import {
  Switch,
  Route
} from 'react-router-dom'

import WimhofMenu from './WimhofMenu'
import WimhofSession from './WimhofSession'

import './Wimhof.scss'

const Wimhof = () => {
  const match = useRouteMatch()

  return (
    <div className='wimhof'>
      <Switch>
        <Route path={`${match.path}/:sessionId`}>
          <WimhofSession />
        </Route>
        <Route path={`${match.path}/`}>
          <WimhofMenu />
        </Route>
      </Switch>
    </div>
  )
}

export default Wimhof
