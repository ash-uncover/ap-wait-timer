import React from 'react'

import {
    useState,
} from 'lib/hooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './WaitWizard.scss'

const STEPS = {
    BACKGROUND: {
        index: 0,
        name: 'Background',
    },
    TIMER: {
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

const WaitWizard = ({ }) => {

    const [step, setStep] = useState(STEPS.BACKGROUND.index + 1)

    return (
        <div className='wait-wizard'>
            <WaitWizardProgress steps={Object.values(STEPS)} current={step} />
        </div>
    )
}

const WaitWizardProgress = ({ steps, current }) => {
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
                    />
                )
            })}
        </div>
    )
}

const WaitWizardProgressStep = ({ step, state, last }) => {
    return (
        <div className={`wait-wizard-progress-step ${state}`}>
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

const WaitWizardStepBackground = ({ }) => {
    return (
        <div>BACKGROUND</div>
    )
}

const WaitWizardStepTiming = ({ }) => {
    return (
        <div>TIMING</div>
    )
}

const WaitWizardStepMusic = ({ }) => {
    return (
        <div>MUSIC</div>
    )
}

export default WaitWizard
