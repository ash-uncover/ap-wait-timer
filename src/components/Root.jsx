import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  Switch,
  Route
} from 'react-router-dom'

import Clock from './commons/Clock'
import Wimhof from 'components/wimhof/Wimhof'

const Root = () => {
  const { t } = useTranslation()
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
        </Route>
      </Switch>
    </div>
  )
}

export default Root
