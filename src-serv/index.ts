import express from 'express'

import {
    HttpUtils,
} from '@uncover/js-utils'

const { getAudioDurationInSeconds } = require('get-audio-duration');

const path = require('path');
const fs = require('fs');

const DIR_SOUND = path.join(__dirname, '../public/assets/sound');
const DIR_IMAGE = path.join(__dirname, '../public/assets/images');

const DATA_SOUND:any[] = []
const DATA_IMAGE:any[] = []

export const useHeaders = (req: any, res: any, next: any) => {
    res.setHeader(
      HttpUtils.HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN,
      '*'
    )
    res.setHeader(
      HttpUtils.HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS,
      [
        'Origin',
        'Accept',
        'Accept-Version',
        'Content-Length',
        'Content-MD5',
        'Content-Type',
        'Date',
        'Authorization'
      ].join(',')
    )
    res.setHeader(
      HttpUtils.HttpHeader.ACCESS_CONTROL_ALLOW_METHODS,
      [
        HttpUtils.HttpMethod.GET,
        HttpUtils.HttpMethod.POST,
        HttpUtils.HttpMethod.PUT,
        HttpUtils.HttpMethod.PATCH,
        HttpUtils.HttpMethod.DELETE,
        HttpUtils.HttpMethod.OPTIONS
      ].join(',')
    )
    return next()
  }

export const loadSounds = async () => {
    fs.readdir(DIR_SOUND, (err:any, files:any) => {
        DATA_SOUND.splice(0, DATA_SOUND.length)
        if (err) {
            throw new Error(err)
        }
        files.forEach(async (file:string) => {
            if (file !== '.__root') {
                const data = await loadSound(file)
                DATA_SOUND.push(data)
            }
        })
        DATA_SOUND.sort((e1, e2) => e1.name.localeCompare(e2.name))
    })
}

export const loadSound = async (file:string) => {
    const absolutePath = path.resolve(`public/assets/sound/${file}`)
    const duration = await getAudioDurationInSeconds(absolutePath)
    return {
        url: `http://localhost:8090/assets/sound/${encodeURIComponent(file)}`,
        name: file,
        duration
    }
}

export const getSongs = (req:any, res:any, next:any) => {
    res.status(200).send({ data: DATA_SOUND })
}

export const loadImages = async () => {
    fs.readdir(DIR_IMAGE, (err:any, files:any) => {
        DATA_IMAGE.splice(0, DATA_IMAGE.length)
        if (err) {
            throw new Error(err)
        }
        files.forEach((file:string) => {
            if (file !== '.__root') {
                const data = loadImage(file)
                DATA_IMAGE.push(data)
            }
        })
        DATA_IMAGE.sort((e1, e2) => e1.name.localeCompare(e2.name))
    })
}

export const loadImage = (file:string) => {
    return {
        url: `http://localhost:8090/assets/images/${encodeURIComponent(file)}`,
        name: file
    }
}

export const getPictures = (req:any, res:any, next:any) => {
    res.status(200).send({ data: DATA_IMAGE })
}

/*
fs.watch(DIR_IMAGE, () => {
    loadImages()
})

fs.watch(DIR_SOUND, () => {
    loadSounds()
})
*/

const app = express()

app.use(express.static('public'))

app.use(useHeaders)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api/pictures/', getPictures)
app.get('/api/songs/', getSongs)

Promise.all([
    loadSounds(),
    loadImages()
])
    .then(() => {
        app.listen(8090, () => {
            console.log('server started')
        })
    })
