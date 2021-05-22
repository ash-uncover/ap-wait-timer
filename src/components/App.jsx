import React from 'react'

import {
  useSelector
} from 'lib/hooks'

import {
  Switch,
  Route
} from 'react-router-dom'

import {
  selectors as AppSelectors
} from 'store/app'

import Home from 'components/Home'
import Wimhof from 'components/wimhof/Wimhof'
import Waitroom from 'components/waitroom/Waitroom'

import './App.scss'

const App = () => {
  const background = useSelector(AppSelectors.appBackgroundSelector)

  return (
    <div className='app'>
      <div className='app-background'>
        <img
          className='app-background-image'
          src={background}
        />
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
