ximport React from 'react'

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

import './Home.scss'
import SoundLibrary from '../lib/utils/SoundLibrary'

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
  const dispatch = useDispatch()

  const background = useSelector(AppSelectors.appBackgroundSelector)
  const title1 = useSelector(AppSelectors.appTitle1Selector)
  const title2 = useSelector(AppSelectors.appTitle2Selector)
  const showClock = useSelector(AppSelectors.appShowClockSelector)
  const music = useSelector(AppSelectors.appMusicSelector)

  const { t } = useTranslation()

  const menuWhenTitle = t('home.form.when.title')
  const menuWhenNowTitle = t('home.form.when.now.title')
  const menuWhenDelayTitle = t('home.form.when.delay.title')
  const menuWhenDateTitle = t('home.form.when.date.title')
  const menuWhenDateLabel = t('home.form.when.date.label')
  const menuInfosTitle = t('home.form.infos.title')
  const menuInfosTitle1Label = t('home.form.infos.title1.label')
  const menuInfosTitle1Tooltip = t('home.form.infos.title1.tooltip')
  const menuInfosTitle2Label = t('home.form.infos.title2.label')
  const menuInfosTitle2Tooltip = t('home.form.infos.title2.tooltip')
  const menuInfosShowClockLabel = t('home.form.infos.showclock.label')
  const menuInfosShowClockTooltip = t('home.form.infos.showclock.tooltip')

  const menuSubmitLabel = t('home.form.submit.label')
  const menuSubmitTooltip = t('home.form.submit.tooltip')

  const [when, setWhen] = useState(STATE_WHEN.NOW)
  const [date, setDate] = useState(formatDate(new Date()))

  // VIEW CALLBACKS

  const onSelectNow = () => { setWhen(STATE_WHEN.NOW) }
  const onSelectDelay = () => { setWhen(STATE_WHEN.DELAY) }
  const onSelectDate = () => { setWhen(STATE_WHEN.DATE) }

  const onDateChange = (event) => {
    setDate(event.target.value)
  }
  const onTitle1Change = (event) => {
    const title1 = event.target.value
    dispatch(AppActions.appChangeTitle1({ title1 }))
  }
  const onTitle2Change = (event) => {
    const title2 = event.target.value
    dispatch(AppActions.appChangeTitle2({ title2 }))
  }
  const onShowClockChange = (event) => {
    const showClock = event.target.checked
    dispatch(AppActions.appChangeShowClock({ showClock }))
  }
  const onBackgroundSelect = (background) => {
    dispatch(AppActions.appChangeBackground({ background }))
  }
  const onMusicToggle = (music) => {
    dispatch(AppActions.appToggleMusicSelection({ music }))
  }

  const onSubmit = (e) => { e.preventDefault() }

  // RENDERING

  const targetDate = `${new Date(date).getTime()}`

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

          <FieldSet title={menuWhenTitle}>
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
          </FieldSet>

          <FieldSet title={menuInfosTitle}>
            <div
              className='form-group row'
            >
              <label
                className='col-sm-2 col-form-label'
                htmlFor='title1'
              >
                {menuInfosTitle1Label}
              </label>
              <div className='col-sm-10'>
                <input
                  id='title1'
                  className='form-control'
                  value={title1}
                  onChange={onTitle1Change}
                />
              </div>
            </div>

            <div
              className='form-group row'
            >
              <label
                className='col-sm-2 col-form-label'
                htmlFor='title2'
              >
                {menuInfosTitle2Label}
              </label>
              <div className='col-sm-10'>
                <input
                  id='title2'
                  className='form-control'
                  value={title2}
                  onChange={onTitle2Change}
                />
              </div>
            </div>

            <div className='form-group row'>
              <div className='col-sm-2'>
                {menuInfosShowClockLabel}
              </div>
              <div className='col-sm-10'>
                <div className='form-check'>
                  <input
                    id='showClock'
                    className='form-check-input'
                    type='checkbox'
                    checked={showClock}
                    onChange={onShowClockChange}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='showClock'
                  >
                    {menuInfosShowClockTooltip}
                  </label>
                </div>
              </div>
            </div>

            <div className='row'>
              <HomeThumbnail
                src={ImageLibrary.get('Background1')}
                selected={background === ImageLibrary.get('Background1')}
                onClick={() => onBackgroundSelect(ImageLibrary.get('Background1'))}
              />
              <HomeThumbnail
                src={ImageLibrary.get('Background2')}
                selected={background === ImageLibrary.get('Background2')}
                onClick={() => onBackgroundSelect(ImageLibrary.get('Background2'))}
              />
              <HomeThumbnail
                src={ImageLibrary.get('Background3')}
                selected={background === ImageLibrary.get('Background3')}
                onClick={() => onBackgroundSelect(ImageLibrary.get('Background3'))}
              />
              <HomeThumbnail
                src={ImageLibrary.get('Background4')}
                selected={background === ImageLibrary.get('Background4')}
                onClick={() => onBackgroundSelect(ImageLibrary.get('Background4'))}
              />
            </div>

            <br />

          </FieldSet>

          <FieldSet title={t('home.form.musik.title')}>
            <div className='home-sound-list'>
              {SoundLibrary.listSounds().map(sound => {
                return (
                  <HomeSound
                    key={sound.title}
                    selected={music.includes(sound.title)}
                    {...sound}
                    title={sound.title}
                    onChange={() => onMusicToggle(sound.title)}
                  />
                )
              })}
            </div>
          </FieldSet>

          <Link to={`/wait?date=${targetDate}&title1=${title1}&title2=${title2}&showClock=${showClock}`}>
            <Button
              block
              primary
              type='submit'
              icon={['fas', 'stopwatch']}
              label={menuSubmitLabel}
              title={menuSubmitTooltip}
            />
          </Link>

        </form>
      </AppContent>
    </AppPage>
  )
}

const HomeThumbnail = ({
  src,
  selected,
  onClick
}) => {
  const className = `home-thumbnail col-sm-6 col-md-4 col-lg-3 ${selected ? 'selected' : ''}`
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img
        className='img-thumbnail'
        src={src}
      />
    </div>
  )
}

const HomeSound = ({
  title,
  selected,
  onChange
}) => {
  const className = `home-sound form-check ${selected ? 'selected' : ''}`
  return (
    <div className={className}>
      <input
        className='form-check-input'
        type='checkbox'
        checked={selected}
        onChange={onChange}
      />
      <label
        className='form-check-label'
      >
        {title}
      </label>
    </div>
  )
}

export default Home
