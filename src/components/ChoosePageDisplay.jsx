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

import ImageLibrary from 'lib/utils/ImageLibrary'

import './ChoosePageDisplay.scss'


const ChoosePageDisplay = () => {
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
    <div className='choose-background'>
    </div>
  )
}

export default ChoosePageDisplay
