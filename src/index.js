import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {
  Provider
} from 'react-redux'

import App from 'components/App'

import './index.scss'

import './i18n'
import './index-icons'
import Toto from './index-images'
import './index-sounds'

import store from 'store'

ReactDOM.render(
  <Provider store={store}>
    <Router hashType='noslash'>
      <App />
    </Router>
  </Provider>,
  document.getElementById('react-root')
)
