import React from 'react'

import {
    useNavigate,
    useState,
    useSelector,
} from 'lib/hooks'

import {
    selectors as ImagesSelectors
} from 'store/data/images'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './BreathWizard.scss'

const STEPS = {
    BACKGROUND: {
        index: 0,
        name: 'Visual',
    },
    TIMING: {
        index: 1,
        name: 'Timing',
    },
    ROUNDS: {
        index: 2,
        name: 'Rounds',
    }
}

const STEP_STATE = {
    DONE: 'done',
    CURRENT: 'current',
    FUTURE: 'future',
}

const WaitWizard = ({ onCancel }) => {

    const navigate = useNavigate()

    const [step, setStep] = useState(STEPS.BACKGROUND.index)

    const [background, setBackground] = useState('random')

    const now = new Date()
    const nowDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, 0)}`
    const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const [date, setDate] = useState(nowDate)
    const [time, setTime] = useState(nowTime)

    const [rounds, setRounds] = useState(nowTime)

    const handleStepChange = (index) => {
        setStep(index)
    }

    const handleComplete = () => {
        const targetDate = new Date(`${date}T${time}`).getTime();
        navigate(`/breath?background=${background}&date=${targetDate}&rounds=${rounds}`)
    }

    const renderStep = () => {
        switch (step) {
            case STEPS.BACKGROUND.index: {
                return (
                    <BreathWizardStepVisual
                        background={background}
                        onBackgroundChange={setBackground}
                        onCancel={onCancel}
                        onNext={() => handleStepChange(STEPS.TIMING.index)}
                    />
                )
            }
            case STEPS.TIMING.index: {
                return (
                    <BreathWizardStepTiming
                        date={date}
                        onDateChange={setDate}
                        time={time}
                        onTimeChange={setTime}
                        onCancel={onCancel}
                        onPrevious={() => handleStepChange(STEPS.BACKGROUND.index)}
                        onNext={() => handleStepChange(STEPS.ROUNDS.index)}
                    />
                )
            }
            case STEPS.ROUNDS.index: {
                return (
                    <BreathWizardStepRounds
                        songs={songs}
                        onSongsChange={setSongs}
                        onCancel={onCancel}
                        onPrevious={() => handleStepChange(STEPS.TIMING.index)}
                        onComplete={handleComplete}
                    />
                )
            }
            default: {
                return null
            }
        }
    }

    return (
        <div className='wait-wizard'>
            <WizardProgressSteps
                steps={Object.values(STEPS)}
                current={step}
                onStepChange={handleStepChange}
            />
            {renderStep()}
        </div>
    )
}

const BreathWizardStepVisual = ({ title, subTitle, background, onTitleChange, onSubTitleChange, onBackgroundChange, onCancel, onNext }) => {
    const images = useSelector(ImagesSelectors.imagesDataSelector)

    return (
        <>
            <div className='wait-wizard-step'>

                <div className='wait-wizard-step-section'>
                    <label className='wait-wizard-step-section-title' htmlFor='title'>
                        Title
                    </label>
                    <input
                        id='title'
                        className='wait-wizard-step-section-input'
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />
                </div>

                <div className='wait-wizard-step-section'>
                    <label className='wait-wizard-step-section-title' htmlFor='subtitle'>
                        Sub title
                    </label>
                    <input
                        id='subtitle'
                        className='wait-wizard-step-section-input'
                        value={subTitle}
                        onChange={(e) => onSubTitleChange(e.target.value)}
                    />
                </div>

                <div className='wait-wizard-step-section'>
                    <label className='wait-wizard-step-section-title'>
                        Background
                    </label>
                    <div className='thumbnails'>
                        <div
                            className={`thumbnail ${background === 'random' ? 'selected' : ''}`}
                            onClick={() => onBackgroundChange('random')}
                        >
                            <div className='thumbnail-icon'>
                                <FontAwesomeIcon icon={['fas', 'question']} />
                            </div>
                        </div>
                        {images.map((image) => {
                            const selected = image.id === background
                            return (
                                <div
                                    key={image.name}
                                    className={`thumbnail ${selected ? 'selected' : ''}`}
                                    onClick={() => onBackgroundChange(image.id)}
                                >
                                    <img
                                        alt={image.name}
                                        src={image.url}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='wait-wizard-footer'>
                <button onClick={onCancel}>
                    Cancel
                </button>
                <button onClick={onNext}>
                    Next
                </button>
            </div>
        </>
    )
}

const BreathWizardStepTiming = ({ date, onDateChange, time, onTimeChange, onCancel, onPrevious, onNext }) => {
    return (
        <>
            <div className='wait-wizard-step'>
                <div className='wait-wizard-step-section'>
                    <label className='wait-wizard-step-section-title' htmlFor='date'>
                        Choose end date
                    </label>
                    <input
                        id='date'
                        className='wait-wizard-step-section-input'
                        type='date'
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                    />
                </div>
                <div className='wait-wizard-step-section'>
                    <label className='wait-wizard-step-section-title' htmlFor='time'>
                        Choose end time
                    </label>
                    <input
                        id='time'
                        className='wait-wizard-step-section-input'
                        type='time'
                        value={time}
                        onChange={(e) => onTimeChange(e.target.value)}
                    />
                </div>
                <div className='wait-wizard-step-section'>
                    <label className='wait-wizard-step-section-title' htmlFor='time'>
                        Current selection
                    </label>
                    <label>
                        {date} {time}
                    </label>
                </div>
            </div>
            <div className='wait-wizard-footer'>
                <button onClick={onCancel}>
                    Cancel
                </button>
                <button onClick={onPrevious}>
                    Previous
                </button>
                <button onClick={onNext}>
                    Next
                </button>
            </div>
        </>
    )
}

const BreathWizardStepRounds = ({ songs, onSongsChange, onCancel, onPrevious, onComplete }) => {
    const allSongs = useSelector(SongsSelectors.songsDataSelector)

    const selectAll = songs.length === allSongs.length

    const onSelectAll = () => {
        if (selectAll) {
            onSongsChange([])
        } else {
            onSongsChange(allSongs.map(song => song.id))
        }
    }

    const onSelectSong = (songId) => {
        const index = songs.indexOf(songId)
        if (index > -1) {
            const newSongs = songs.slice()
            newSongs.splice(index, 1)
            onSongsChange(newSongs)
        } else {
            const newSongs = [...songs, songId]
            onSongsChange(newSongs)
        }
    }

    return (
        <>
            <div className='wait-wizard-step flex'>
                <div className='wait-wizard-step-section grow'>
                    <label className='wait-wizard-step-section-title'>
                        Choose Songs
                    </label>
                    <div className='checkbox list-header'>
                        <input
                            type='checkbox'
                            id='all'
                            name='all'
                            checked={selectAll}
                            onChange={() => onSelectAll()}
                        />
                        <label htmlFor='all'>
                            Select All
                        </label>
                    </div>
                    <div className='list'>
                        {allSongs.map((song) => {
                            const selected = songs.includes(song.id)
                            return (
                                <div className='checkbox' key={song.name}>
                                    <input
                                        type='checkbox'
                                        id={song.name}
                                        name={song.name}
                                        checked={selected}
                                        onChange={() => onSelectSong(song.id)}
                                    />
                                    <label htmlFor={song.name}>
                                        {song.name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='wait-wizard-footer'>
                <button onClick={onCancel}>
                    Cancel
                </button>
                <button onClick={onPrevious}>
                    Previous
                </button>
                <button onClick={onComplete}>
                    Done
                </button>
            </div>
        </>
    )
}

export default WaitWizard
