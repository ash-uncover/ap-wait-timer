import React from 'react'

import {
    useDispatch,
    useEffect,
  } from 'lib/hooks'

import Service from 'lib/services/RestService'
import Home from 'components/home/Home'

import {
    actions as AppActions,
    selectors as AppSelectors
  } from 'store/app'


const Root = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AppActions.appLoadFetch())
        Promise.all([
            Service.api.songs.get(),
            Service.api.pictures.get(),
        ]).then(([songs, pictures]) => {
            console.log(songs)
            console.log(pictures)
        })

    })
    return (
        <Home />
    )
}

export default Root
