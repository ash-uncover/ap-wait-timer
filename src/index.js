import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import Root from 'components/Root'

import './index.css'

import './i18n'

ReactDOM.render(
  <Router hashType='noslash'>
    <Root />
  </Router>,
  document.getElementById('react-root')
)
