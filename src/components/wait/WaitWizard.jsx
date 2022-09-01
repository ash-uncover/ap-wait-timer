import React from 'react'

import {
    useState,
    useSelector,
} from 'lib/hooks'

import {
    selectors as ImagesSelectors
} from 'store/data/images'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './WaitWizard.scss'

const STEPS = {
    BACKGROUND: {
        index: 0,
        name: 'Background',
    },
    TIMING: {
        index: 1,
        name: 'Timing',
    },
    MUSIC: {
        index: 2,
        name: 'Music',
    }
}

const STEP_STATE = {
    DONE: 'done',
    CURRENT: 'current',
    FUTURE: 'future',
}

const WaitWizard = ({ onCancel }) => {

    const [step, setStep] = useState(STEPS.BACKGROUND.index)

    const handleStepChange = (index) => {
        setStep(index)
    }

    const handleComplete = () => {
    }

    const renderStep = () => {
        switch (step) {
            case STEPS.BACKGROUND.index: {
                return (
                    <WaitWizardStepBackground
                        onCancel={onCancel}
                        onNext={() => handleStepChange(STEPS.TIMING.index)}
                    />
                )
            }
            case STEPS.TIMING.index: {
                return (
                    <WaitWizardStepTiming
                        onCancel={onCancel}
                        onPrevious={() => handleStepChange(STEPS.BACKGROUND.index)}
                        onNext={() => handleStepChange(STEPS.MUSIC.index)}
                    />
                )
            }
            case STEPS.MUSIC.index: {
                return (
                    <WaitWizardStepMusic
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
            <WaitWizardProgress
                steps={Object.values(STEPS)}
                current={step}
                onStepChange={handleStepChange}
            />
            {renderStep()}
        </div>
    )
}

const WaitWizardProgress = ({ steps, current, onStepChange }) => {
    return (
        <div className='wait-wizard-progress'>
            {steps.map((step, i) => {
                let state = i < current ? STEP_STATE.DONE : i === current ? STEP_STATE.CURRENT : STEP_STATE.FUTURE
                return (
                    <WaitWizardProgressStep
                        key={`step-${i}`}
                        step={step}
                        state={state}
                        last={i === steps.length - 1}
                        onClick={() => onStepChange(i)}
                    />
                )
            })}
        </div>
    )
}

const WaitWizardProgressStep = ({ step, state, last, onClick }) => {
    return (
        <div className={`wait-wizard-progress-step ${state}`} onClick={onClick}>
            <div className='wait-wizard-progress-step-info'>
                <div className='wait-wizard-progress-step-info-index'>
                    {step.index + 1}
                </div>
                <div className='wait-wizard-progress-step-info-name'>
                    {step.name}
                </div>
            </div>
        </div>
    )
}

const WaitWizardStepBackground = ({ onCancel, onNext }) => {
    const images = useSelector(ImagesSelectors.imagesDataSelector)

    return (
        <>
            <div className='wait-wizard-step'>
                {images.map((image) => {
                    return (
                        <div key={image.name}>{image.name}</div>
                    )
                })}
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

const WaitWizardStepTiming = ({ onCancel, onPrevious, onNext }) => {
    return (
        <>
            <div className='wait-wizard-step'>
                TIMING
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

const WaitWizardStepMusic = ({ onCancel, onPrevious, onComplete }) => {
    return (
        <>
            <div className='wait-wizard-step'>
                MUSIC
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
