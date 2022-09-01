import React from 'react'

import {
  useDispatch,
  useState
} from 'lib/hooks'

import ChoosePageDisplay from 'components/ChoosePageDisplay';
import ChoosePageMusic from 'components/ChoosePageMusic';
import ChoosePageTimer from 'components/ChoosePageTimer';

import './ChooseDialog.scss'

const PAGES = {
  TIMER: 'timer',
  DISPLAY: 'display',
  MUSIC: 'music'
}

const ChooseDialog = ({}) => {

  // HOOKS

  const dispatch = useDispatch()

  const [page, setPage] = useState(PAGES.display)

  // VIEW CALLBACKS

  const onPageTimerNext = () => {
    setPage(PAGES.DISPLAY)
  }
  const onPageDisplayPrevious = () => {
    setPage(PAGES.TIMER)
  }
  const onPageDisplayNext = () => {
    setPage(PAGES.MUSIC)
  }
  const onPageMusicPrevious = () => {
    setPage(PAGES.DISPLAY)
  }
  const onPageMusicNext = () => {
    console.log('complete')
  }

  // RENDERING

  const renderContent = () => {
    switch (page) {
      case PAGES.TIMER: {
        return (
          <ChoosePageTimer
            onNext={onPageTimerNext}
          />
        )
      }
      case PAGES.DISPLAY: {
        return (
          <ChoosePageDisplay
            onNext={onPageDisplayNext}
            onPrevious={onPageDisplayPrevious}
          />
        )
      }
      case PAGES.MUSIC: {
        return (
          <ChoosePageMusic
            onNext={onPageMusicNext}
            onPrevious={onPageMusicPrevious}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className='choose-dialog'>
      {renderContent()}
    </div>
  );
}

export default ChooseDialog
