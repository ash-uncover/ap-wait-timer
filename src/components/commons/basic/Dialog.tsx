import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Dialog.css'

const Dialog = ({ title, children, onClose }) => {

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className='dialog-layer'>
      <div className='dialog'>
        <div className='dialog-header'>
          {title}
          <button className='transparent' onClick={handleClose}>
            <FontAwesomeIcon icon={['fas', 'times']} />
          </button>
        </div>
        <div className='dialog-content'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog
