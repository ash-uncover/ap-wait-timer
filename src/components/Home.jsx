/* globals btoa */

import React from 'react'

import {
  useState,
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

import Button from 'components/commons/basic/Button'

import './Home.scss'

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

const Home = () => {
  // HOOKS

  const { t } = useTranslation()

  const menuWhenTitle = t('wimhof.menu.when.title')
  const menuWhenNowTitle = t('wimhof.menu.when.now.title')
  const menuWhenDelayTitle = t('wimhof.menu.when.delay.title')
  const menuWhenDateTitle = t('wimhof.menu.when.date.title')
  const menuWhenDateLabel = t('wimhof.menu.when.date.label')

  const menuSubmitTitle = t('wimhof.menu.submit.title')
  const menuSubmitTooltip = t('wimhof.menu.submit.tooltip')

  const [when, setWhen] = useState(STATE_WHEN.NOW)
  const [date, setDate] = useState(formatDate(new Date()))

  // VIEW CALLBACKS

  const onSelectNow = () => { setWhen(STATE_WHEN.NOW) }
  const onSelectDelay = () => { setWhen(STATE_WHEN.DELAY) }
  const onSelectDate = () => { setWhen(STATE_WHEN.DATE) }

  const onDateChange = (event) => { setDate(event.target.value) }

  const onSubmit = (e) => { e.preventDefault() }

  // RENDERING
  const sessionId = `${btoa(new Date(date).getTime())}`

  return (
    <AppPage className='home'>
      <AppToolbar>
        <Link to='/'>
          <Button
            icon={['fas', 'home']}
          />
        </Link>
      </AppToolbar>
      <AppContent>
        <form
          className='home-form'
          onSubmit={onSubmit}
        >
          <legend>{menuWhenTitle}</legend>

          <Button
            block
            primary={when === STATE_WHEN.NOW}
            def
            icon={when === STATE_WHEN.NOW ? ['fas', 'check-square'] : ['far', 'square']}
            label={menuWhenNowTitle}
            title={menuWhenNowTitle}
            onClick={onSelectNow}
          />

          <Button
            block
            primary={when === STATE_WHEN.DELAY}
            def
            icon={when === STATE_WHEN.DELAY ? ['fas', 'check-square'] : ['far', 'square']}
            label={menuWhenDelayTitle}
            title={menuWhenDelayTitle}
            onClick={onSelectDelay}
          />

          <Button
            block
            primary={when === STATE_WHEN.DATE}
            def
            icon={when === STATE_WHEN.DATE ? ['fas', 'check-square'] : ['far', 'square']}
            label={menuWhenDateTitle}
            title={menuWhenDateTitle}
            onClick={onSelectDate}
          />

          <label
            htmlFor='start'
          >
            {menuWhenDateLabel}
          </label>
          <input
            id='start'
            type='datetime-local'
            disabled={when !== STATE_WHEN.DATE}
            value={date}
            min='2021-01-01T00:00'
            max='2021-12-12T00:00'
            step='300'
            onChange={onDateChange}
          />

          <Link to={`/wait/${sessionId}`}>
            <Button
              block
              primary
              type='submit'
              icon={['fas', 'stopwatch']}
              label={menuSubmitTitle}
              title={menuSubmitTooltip}
            />
          </Link>

        </form>
      </AppContent>
    </AppPage>
  )
}

export default Home
