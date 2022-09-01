import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {
  Provider
} from 'react-redux'

// Should be imported before first access to the reducers
import store from 'store'

import Root from 'routes/__layout'

import './index.scss'
import './i18n'
import './index-icons'

ReactDOM.render(
  <Provider store={store}>
    <Router hashType='noslash'>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('react-root')
)
