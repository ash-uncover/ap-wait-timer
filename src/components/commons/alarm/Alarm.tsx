import React from 'react'

import {
  useEffect,
  useState
} from 'lib/hooks'

import {
  formatAlarm
} from 'lib/utils/TimeUtils'

import './Alarm.css'

type AlarmProperties = {
  alarm: number
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
  showMilliseconds?: boolean
}
const Alarm = ({
  alarm
}: AlarmProperties) => {

  // HOOKS //

  const [value, setValue] = useState(formatAlarm(alarm))

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = formatAlarm(alarm)
      setValue(newVal)
    }, 100)
    return () => clearInterval(interval)
  })

  // RENDERING //

  return (
    <div className='alarm'>
      {value}
    </div>
  )
}

export default Alarm
