const IMAGES = {}

const ImageLibrary = {
  list: () => Object.keys(IMAGES),
  listImages: () => Object.keys(IMAGES).map(title => ({
    title,
    src: IMAGES[title]
  })),
  get: (title) => IMAGES[title],
  add: (title, src) => {
    IMAGES[title] = src
  }
}

export default ImageLibrary
