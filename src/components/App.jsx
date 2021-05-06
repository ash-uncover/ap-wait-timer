import React from 'react'

import {
  Switch,
  Route
} from 'react-router-dom'

import Home from 'components/Home'
import Wimhof from 'components/wimhof/Wimhof'
import Waitroom from 'components/waitroom/Waitroom'

import './App.scss'

const App = () => {
  return (
    <div className='app'>
      <div className='app-background'>
        <div className='app-background-image' />
        <div className='app-background-mask' />
      </div>
      <Switch>
        <Route path='/wimhof'>
          <Wimhof />
        </Route>
        <Route path='/wait'>
          <Waitroom />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
