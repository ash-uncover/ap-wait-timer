import React from 'react'

import {
  useEffect,
  useState
} from 'lib/hooks'

const formatHours = (seconds) => {
  const hh = Math.floor(seconds / 3600)
  return `${hh < 10 ? '0' : ''}${hh}`
}
const formatMinutes = (seconds) => {
  const mm = Math.floor(seconds / 60) % 60
  return `${mm < 10 ? '0' : ''}${mm}`
}
const formatSeconds = (seconds) => {
  const ss = seconds % 60
  return `${ss < 10 ? '0' : ''}${ss}`
}
const formatDuration = (seconds) => {
  if (seconds > 0) {
    const hh = formatHours(seconds)
    const mm = formatMinutes(seconds)
    const ss = formatSeconds(seconds)
    return `${hh}:${mm}:${ss}`
  }
  return '00:00:00'
}

const Clock = ({
  date
}) => {
  const [value, setValue] = useState(formatDuration(Math.floor((date - Date.now()) / 1000)))
  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = formatDuration(Math.floor((date - Date.now()) / 1000))
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
