import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import App from 'components/App'

import './index.scss'

import './i18n'
import './index-icons'
import './index-sounds'

ReactDOM.render(
  <Router hashType='noslash'>
    <App />
  </Router>,
  document.getElementById('react-root')
)
