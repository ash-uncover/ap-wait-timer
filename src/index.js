import React from 'react'
import { createRoot } from 'react-dom/client';

import {
    Provider
} from 'react-redux'

import App from 'components/commons/app/App'

// Should be imported before first access to the reducers
import store from 'store'

import Root from 'routes/__layout'

import './index.scss'
import './i18n'
import './index-icons'

const container = document.getElementById('react-root')
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <App>
            <Root />
        </App>
    </Provider>
)
