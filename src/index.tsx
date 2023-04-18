import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  BrowserRouter,
} from 'react-router-dom'

import store from 'store'
import Root from 'routes/__layout'

import './index.css'
import './i18n'
import './index-icons'

const container = document.getElementById('react-root')
const root = createRoot(container!)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
)
