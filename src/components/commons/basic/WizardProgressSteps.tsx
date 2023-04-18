import React from 'react'

import './WizardProgressSteps.css'

export const STEP_STATE = {
  DONE: 'done',
  CURRENT: 'current',
  FUTURE: 'future',
}

const WizardProgressSteps = ({ steps, current, onStepChange }) => {
  return (
    <div className='wizard-progress-steps'>
      {steps.map((step, i) => {
        let state = i < current ? STEP_STATE.DONE : i === current ? STEP_STATE.CURRENT : STEP_STATE.FUTURE
        return (
          <WizardProgressStep
            key={`step-${i}`}
            step={step}
            state={state}
            onClick={() => onStepChange(i)}
          />
        )
      })}
    </div>
  )
}

const WizardProgressStep = ({ step, state, onClick }) => {
  return (
    <div className={`wizard-progress-step ${state}`} onClick={onClick}>
      <div className='wizard-progress-step-info'>
        <div className='wizard-progress-step-info-index'>
          {step.index + 1}
        </div>
        <div className='wizard-progress-step-info-name'>
          {step.name}
        </div>
      </div>
    </div>
  )
}

export default WizardProgressSteps
