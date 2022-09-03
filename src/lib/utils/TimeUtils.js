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
  const duration = Math.max(0, Math.abs(alarm - now))
  if (duration > 0) {
    const hh = formatHours(duration)
    const mm = formatMinutes(duration)
    const ss = formatSeconds(duration)
    return `${hh}:${mm}:${ss}`
  }
  return '00:00:00'
}

const formatDate = (date) => {
  const YY = date.getYear() + 1900
  const MM = `${date.getMonth() + 1}`.padStart(2, '0')
  const DD = `${date.getDate()}`.padStart(2, '0')
  const hh = `${date.getHours()}`.padStart(2, '0')
  const mm = `${date.getMinutes()}`.padStart(2, '0')
  return `${YY}-${MM}-${DD}T${hh}:${mm}`
}
