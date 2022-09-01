import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  Link
} from 'react-router-dom'

import {
  AppContent,
  AppPage,
  AppToolbar
} from 'components/commons/app'

import {
  Button,
  FieldSet
} from 'components/commons/basic'

import {
  actions as AppActions,
  selectors as AppSelectors
} from 'store/app'

import './ChoosePageTimer.scss'

const formatDate = (date) => {
  const YY = date.getYear() + 1900
  const MM = `${date.getMonth() + 1}`.padStart(2, '0')
  const DD = `${date.getDate()}`.padStart(2, '0')
  const hh = `${date.getHours()}`.padStart(2, '0')
  const mm = `${date.getMinutes()}`.padStart(2, '0')
  return `${YY}-${MM}-${DD}T${hh}:${mm}`
}

const STATE_WHEN = {
  NOW: 'NOW',
  DATE: 'DATE'
}

const ChoosePageTimer = () => {

  // HOOKS

  const dispatch = useDispatch()

  const background = useSelector(AppSelectors.appBackgroundSelector)

  const { t } = useTranslation()

  // VIEW CALLBACKS

  const onBackgroundSelect = (background) => {
    dispatch(AppActions.appChangeBackground({ background }))
  }

  // RENDERING

  const targetDate = `${new Date(date).getTime()}`

  return (
    <div className='choose-dialog-page choose-page-timer'>
      <div className='title'>
        Set up timer
      </div>
      <div className='body'>

      </div>
      <div className='footer'>
        <Button>
          Next
        </Button>
      </div>
    </div>
  )
}

export default ChoosePageTimer
