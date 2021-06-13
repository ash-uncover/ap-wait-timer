const SOUNDS = {}

const SoundLibrary = {
  list: () => Object.keys(SOUNDS),
  listSounds: () => Object.keys(SOUNDS).map(title => ({
    title,
    ...SOUNDS[title]
  })),
  get: (title) => SOUNDS[title],
  add: (title, src) => {
    SOUNDS[title] = {
      src,
      tags: []
    }
  }
}

export default SoundLibrary
