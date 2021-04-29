import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import Root from 'components/Root'

import './index.scss'

import './i18n'
import './index-icons'

ReactDOM.render(
  <Router hashType='noslash'>
    <Root />
  </Router>,
  document.getElementById('react-root')
)
