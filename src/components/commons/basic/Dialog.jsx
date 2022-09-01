import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Dialog.scss'

const Dialog = ({ title }) => {
    return (
        <div className='dialog-layer'>
            <div className='dialog'>
                {title}
            </div>
        </div>
    )
}

export default Dialog
