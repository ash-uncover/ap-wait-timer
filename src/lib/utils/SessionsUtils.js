export const encode = (date, sessions) => {
  let code = `${date ? new Date(date).getTime() : 0}|`
  sessions.forEach((session, index) => {
    if (index > 0) {
      code += '-'
    }
    code += `${session.breaths}_${session.length}_${session.hold}`
  })
  return btoa(code)
}

export const decode = (code) => {
  const codeArray = atob(code).split('|')
  const codeDate = Number(codeArray[0])
  const codeSessions = codeArray[1]

  const date = codeDate || 0
  const sessions = codeSessions.split('-').map(codeSession => {
    const codeSessionArray = codeSession.split('_')
    const breaths = Number(codeSessionArray[0])
    const length = Number(codeSessionArray[1])
    const hold = Number(codeSessionArray[2])
    return {
      breaths,
      length,
      hold
    }
  })

  return {
    date,
    sessions
  }
}
