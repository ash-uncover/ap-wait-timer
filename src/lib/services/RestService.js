const getSongs = async () => {
    const response = await fetch(
        'http://localhost:8090/api/songs',
        { method: 'GET' }
    )
    const data = await response.json()
    return data
}

const getPictures = async () => {
    const response = await fetch(
        'http://localhost:8090/api/pictures',
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
        pictures: {
            get: getPictures,
        },
    },
}

export default RestService