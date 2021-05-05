import React from 'react'

import { Link } from 'react-router-dom'

import {
  useRouteMatch,
  useState,
  useTranslation
} from 'lib/hooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './WimhofMenu.scss'

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
  DELAY: 'DELAY',
  DATE: 'DATE'
}

const STATE_HOW = {
  SHORT: 'SHORT',
  MEDIUM: 'MEDIUM',
  LONG: 'LONG',
  CUSTOM: 'CUSTOM'
}

const SESSIONS_DEFAULT = { breaths: 25, length: 1.2, hold: 90 }

const SESSIONS_SHORT = [
  { breaths: 20, length: 1, hold: 60 },
  { breaths: 20, length: 1, hold: 60 },
  { breaths: 25, length: 1, hold: 90 }
]
const SESSIONS_MEDIUM = [
  { breaths: 25, length: 1.2, hold: 90 },
  { breaths: 30, length: 1.2, hold: 120 },
  { breaths: 35, length: 1.2, hold: 150 }
]
const SESSIONS_LONG = [
  { breaths: 30, length: 1.2, hold: 90 },
  { breaths: 35, length: 1.2, hold: 120 },
  { breaths: 40, length: 1.2, hold: 150 },
  { breaths: 40, length: 1.2, hold: 180 }
]

const WimhofMenu = () => {
  const match = useRouteMatch()
  const { t } = useTranslation()

  const menuWhenTitle = t('wimhof.menu.when.title')
  const menuWhenNowTitle = t('wimhof.menu.when.now.title')
  const menuWhenDelayTitle = t('wimhof.menu.when.delay.title')
  const menuWhenDateTitle = t('wimhof.menu.when.date.title')
  const menuWhenDateLabel = t('wimhof.menu.when.date.label')

  const menuHowTitle = t('wimhof.menu.settings.title')
  const menuHowShortTitle = t('wimhof.menu.settings.short.title')
  const menuHowMediumTitle = t('wimhof.menu.settings.medium.title')
  const menuHowLongTitle = t('wimhof.menu.settings.long.title')
  const menuHowCustomTitle = t('wimhof.menu.settings.custom.title')

  const menuSubmitTitle = t('wimhof.menu.submit.title')
  const menuSubmitTooltip = t('wimhof.menu.submit.tooltip')

  const [delay, setDelay] = useState(300)
  const [date, setDate] = useState(formatDate(new Date()))
  const [when, setWhen] = useState(STATE_WHEN.NOW)
  const [sessionMode, setSessionMode] = useState(STATE_HOW.SHORT)
  const [sessions, setSessions] = useState(SESSIONS_SHORT.slice())

  const onDateChange = (event) => { setDate(event.target.value) }

  const onSubmit = (event) => {
    event.preventDefault()
  }
  const onSelectNow = () => { setWhen(STATE_WHEN.NOW) }
  const onSelectDelay = () => { setWhen(STATE_WHEN.DELAY) }
  const onSelectDate = () => { setWhen(STATE_WHEN.DATE) }

  const onHowShortClick = () => {
    setSessions(SESSIONS_SHORT.slice())
    setSessionMode(STATE_HOW.SHORT)
  }
  const onHowMediumClick = () => {
    setSessions(SESSIONS_MEDIUM.slice())
    setSessionMode(STATE_HOW.MEDIUM)
  }
  const onHowLongClick = () => {
    setSessions(SESSIONS_LONG.slice())
    setSessionMode(STATE_HOW.LONG)
  }

  const onChangeSession = (index, data) => {
    sessions[index] = data
    setSessions([].concat(sessions))
    setSessionMode(STATE_HOW.CUSTOM)
  }
  const onDeleteSession = (index) => {
    sessions.splice(index, 1)
    setSessions([].concat(sessions))
    setSessionMode(STATE_HOW.CUSTOM)
  }
  const onAddSession = () => {
    sessions.push(sessions.length ? sessions[sessions.length - 1] : SESSIONS_DEFAULT)
    setSessions([].concat(sessions))
    setSessionMode(STATE_HOW.CUSTOM)
  }

  let sessionId = ''
  switch (when) {
    case STATE_WHEN.NOW: {
      sessionId += `${STATE_WHEN.DELAY}|0|`
      break
    }
    case STATE_WHEN.DELAY: {
      sessionId += `${STATE_WHEN.DELAY}|${delay}|`
      break
    }
    case STATE_WHEN.DATE: {
      sessionId += `${STATE_WHEN.DATE}|${date}|`
      break
    }
  }
  sessions.forEach((session, index) => {
    if (index > 0) {
      sessionId += '-'
    }
    sessionId += `${session.breaths}_${session.length}_${session.hold}`
  })

  return (
    <div className='row'>
      <div className='col'>
        <form
          className='wimhof-menu'
          onSubmit={onSubmit}
        >

          <fieldset>
            <legend>{menuWhenTitle}</legend>

            <button
              className={`btn btn-block ${when === STATE_WHEN.NOW ? 'btn-primary' : 'btn-default'}`}
              type='button'
              checked={when === STATE_WHEN.NOW}
              onClick={onSelectNow}
            >
              {
              when === STATE_WHEN.NOW
                ? <FontAwesomeIcon icon={['fas', 'check-square']} />
                : <FontAwesomeIcon icon={['far', 'square']} />
              }&nbsp;&nbsp;&nbsp;{menuWhenNowTitle}
            </button>

            <button
              className={`btn btn-block ${when === STATE_WHEN.DELAY ? 'btn-primary' : 'btn-default'}`}
              type='button'
              checked={when === STATE_WHEN.DELAY}
              onClick={onSelectDelay}
            >
              {
              when === STATE_WHEN.DELAY
                ? <FontAwesomeIcon icon={['fas', 'check-square']} />
                : <FontAwesomeIcon icon={['fas', 'square']} />
              }&nbsp;&nbsp;&nbsp;{menuWhenDelayTitle}
            </button>

            <button
              className={`btn btn-block ${when === STATE_WHEN.DATE ? 'btn-primary' : 'btn-default'}`}
              type='button'
              checked={when === STATE_WHEN.DATE}
              onClick={onSelectDate}
            >
              {
              when === STATE_WHEN.DATE
                ? <FontAwesomeIcon icon={['fas', 'check-square']} />
                : <FontAwesomeIcon icon={['fas', 'square']} />
              }&nbsp;&nbsp;&nbsp;{menuWhenDateTitle}
            </button>

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
          </fieldset>

          <fieldset>
            <legend>{menuHowTitle}</legend>

            <div
              className='btn-group'
              role='group'
              aria-label='Basic example'
            >
              <button
                type='button'
                className={`btn ${sessionMode === STATE_HOW.SHORT ? 'btn-primary' : 'btn-secondary'}`}
                onClick={onHowShortClick}
              >
                {menuHowShortTitle}
              </button>
              <button
                type='button'
                className={`btn ${sessionMode === STATE_HOW.MEDIUM ? 'btn-primary' : 'btn-secondary'}`}
                onClick={onHowMediumClick}
              >
                {menuHowMediumTitle}
              </button>
              <button
                type='button'
                className={`btn ${sessionMode === STATE_HOW.LONG ? 'btn-primary' : 'btn-secondary'}`}
                onClick={onHowLongClick}
              >
                {menuHowLongTitle}
              </button>
              <button
                className={`btn ${sessionMode === STATE_HOW.CUSTOM ? 'btn-primary' : 'btn-secondary'}`}
                type='button'
              >
                {menuHowCustomTitle}
              </button>
            </div>
            <p>{sessions.length} Rounds</p>
            {sessions.map((session, index) => (
              <WimhofMenuSession
                key={`session-${index}`}
                {...session}
                onChange={(data) => onChangeSession(index, data)}
                onDelete={() => onDeleteSession(index)}
              />
            ))}

            <button
              className='btn btn-success'
              onClick={onAddSession}
            >
              <FontAwesomeIcon icon={['fas', 'plus']} />
            </button>

          </fieldset>

          <Link to={`${match.path}${btoa(sessionId)}`}>
            <button
              className='btn btn-block btn-primary'
              type='submit'
              title={menuSubmitTooltip}
            >
              <FontAwesomeIcon icon={['fas', 'coffee']} />
              {menuSubmitTitle}
            </button>
          </Link>

        </form>
      </div>
    </div>
  )
}

const WimhofMenuSession = ({
  breaths,
  length,
  hold,
  onChange,
  onDelete
}) => {
  const { t } = useTranslation()

  const breathsLabel = t('wimhof.menu.settings.session.breaths.label')
  const breathsTooltip = t('wimhof.menu.settings.session.breaths.tooltip')
  const lengthLabel = t('wimhof.menu.settings.session.length.label')
  const lengthTooltip = t('wimhof.menu.settings.session.length.tooltip')
  const holdLabel = t('wimhof.menu.settings.session.hold.label')
  const holdTooltip = t('wimhof.menu.settings.session.hold.tooltip')

  const onBreathsChange = (event) => { onChange({ breaths: Number(event.target.value), length, hold }) }
  const onLengthChange = (event) => { onChange({ breaths, length: Number(event.target.value), hold }) }
  const onHoldChange = (event) => { onChange({ breaths, length, hold: Number(event.target.value) }) }

  return (
    <p className='wimhof-menu-session'>
      <label
        htmlFor='breaths'
      >
        {breathsLabel}
      </label>
      <input
        id='breaths'
        type='number'
        min='10'
        max='100'
        step='1'
        value={breaths}
        size='16'
        onChange={onBreathsChange}
      />

      <label
        htmlFor='length'
      >
        {lengthLabel}
      </label>
      <input
        id='length'
        type='number'
        min='0.5'
        max='3'
        step='0.1'
        value={length}
        size='16'
        onChange={onLengthChange}
      />

      <label
        htmlFor='hold'
      >
        {holdLabel}
      </label>
      <input
        id='hold'
        type='number'
        min='30'
        max='300'
        step='10'
        value={hold}
        size='16'
        onChange={onHoldChange}
      />

      <button
        className='btn btn-default'
        type='button'
        onClick={onDelete}
      >
        <FontAwesomeIcon icon={['fas', 'trash']} />
      </button>
    </p>
  )
}

export default WimhofMenu
