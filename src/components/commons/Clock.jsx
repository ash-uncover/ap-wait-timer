import React from 'react'

import {
  useEffect,
  useState
} from 'lib/hooks'

const formatHours = (duration) => {
  const hh = Math.floor(duration / 3600000)
  return `${hh < 10 ? '0' : ''}${hh}`
}
const formatMinutes = (duration) => {
  const mm = Math.floor(duration / 60000) % 60
  return `${mm < 10 ? '0' : ''}${mm}`
}
const formatSeconds = (duration) => {
  const ss = Math.floor((duration % 60000) / 1000)
  return `${ss < 10 ? '0' : ''}${ss}`
}
const formatAlarm = (alarm) => {
  const now = new Date().getTime()
  const duration = Math.max(0, alarm - now)
  if (duration > 0) {
    const hh = formatHours(duration)
    const mm = formatMinutes(duration)
    const ss = formatSeconds(duration)
    return `${hh}:${mm}:${ss}`
  }
  return '00:00:00'
}

const Clock = ({
  alarm,
  showHours,
  showMinutes,
  showSeconds,
  showMilliseconds
}) => {
  const [value, setValue] = useState(formatAlarm(alarm))
  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = formatAlarm(alarm)
      setValue(newVal)
    }, 100)
    return () => clearInterval(interval)
  })
  return (
    <div className='clock'>
      {value}
    </div>
  )
}

export default Clock
