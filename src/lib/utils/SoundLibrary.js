const SOUNDS = {}

const SoundLibrary = {
  list: () => Object.keys(SOUNDS),
  listSounds: () => Object.keys(SOUNDS).map(title => ({
    title,
    src: SOUNDS[title]
  })),
  get: (title) => SOUNDS[title],
  add: (title, src) => {
    SOUNDS[title] = src
  }
}

export default SoundLibrary
