import React, { useEffect, useState } from 'react'

import {
  formatAlarm
} from 'lib/utils/TimeUtils'

import './Alarm.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

type AlarmProperties = {
  alarm: number
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
  showMilliseconds?: boolean
}
export const Alarm = ({
  alarm
}: AlarmProperties) => {

  // Hooks //

  const [value, setValue] = useState(formatAlarm(alarm))

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = formatAlarm(alarm)
      setValue(newVal)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Events //

  // Rendering //

  return (
    <div className='alarm'>
      {value}
    </div>
  )
}
