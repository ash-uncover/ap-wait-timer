export const formatHours = (duration) => {
  const hh = Math.floor(duration / 3600000)
  return String(hh).padStart(2, '0')
}

export const formatMinutes = (duration) => {
  const mm = Math.floor(duration / 60000) % 60
  return String(mm).padStart(2, '0')
}

export const formatSeconds = (duration) => {
  const ss = Math.floor((duration % 60000) / 1000)
  return String(ss).padStart(2, '0')
}

export const formatAlarm = (alarm, options) => {
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
