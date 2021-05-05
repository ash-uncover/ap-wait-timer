import React from 'react'

import {
  useRouteMatch
} from 'lib/hooks'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './WimhofToolbar.scss'

const WimhofToolbar = () => {
  const match = useRouteMatch()

  return (
    <div className='wimhof-toolbar'>
      <div className='container'>
        <Link to={`${match.path.split('wimhof')[0]}wimhof`}>
          <button
            className='btn'
            type='submit'
          >
            <FontAwesomeIcon icon={['fas', 'home']} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WimhofToolbar
