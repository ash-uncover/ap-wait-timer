import React from 'react'

import {
    useState,
} from 'lib/hooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const STEPS = {
    BACKGROUND: 0,
    TIMER: 1,
    MUSIC: 2
}

const WaitWizard = ({ }) => {

    const [step, setStep] = useState(STEPS.BACKGROUND)

    return (
        <div className='wait-wizard'>
            WIZARD
        </div>
    )
}

export default WaitWizard
