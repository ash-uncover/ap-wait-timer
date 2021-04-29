import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  Switch,
  Route
} from 'react-router-dom'

import Clock from './Clock'
import Wimhof from 'components/wimhof/Wimhof'

const Root = () => {
  const audio = new Audio('/assets/sound/Kurup - Joeira.flac')
  const { t } = useTranslation()
  const onPlay = () => {
    console.log('toto')
    audio.play()
  }
  return (
    <div
      className='root'
    >
      <Switch>
        <Route path='/wimhof'>
          <Wimhof />
        </Route>
        <Route path='/waitroom'>
          <Wimhof />
        </Route>
        <Route path='/'>
          {t('title')}
          <Clock
            date={Date.parse('04/29/2021 18:00:00')}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default Root
