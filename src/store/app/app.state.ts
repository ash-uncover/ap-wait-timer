interface AppState {
  language?: string

  loadStatus: string
  loadError?: string

  background: string
  title1: string
  title2: string
  showClock: boolean
  music: string[]
}

export default AppState