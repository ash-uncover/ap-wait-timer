const getSongs = async () => {
  const response = await fetch(
    'http://localhost:8090/api/songs',
    { method: 'GET' }
  )
  const data = await response.json()
  return data
}

const getImages = async () => {
  const response = await fetch(
    'http://localhost:8090/api/images',
    { method: 'GET' }
  )
  const data = await response.json()
  return data
}

const RestService = {
  api: {
    songs: {
      get: getSongs,
    },
    images: {
      get: getImages,
    },
  },
}

export default RestService