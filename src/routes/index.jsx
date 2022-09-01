import React from 'react'

import {
    useDispatch,
    useEffect,
    useSelector,
} from 'lib/hooks'

import {
    selectors as AppSelectors
  } from 'store/app'

import Home from 'components/home/Home'
import * as Service from 'lib/services/ServiceHelper'
import DataStates from 'lib/constants/DataStates'

const Root = () => {

    const dispatch = useDispatch()

    const appLoadStatus = useSelector(AppSelectors.appLoadStatus)
    const appLoadError = useSelector(AppSelectors.appLoadError)

    useEffect(() => {
        Service.loadData(dispatch)
    }, [])

    switch (appLoadStatus) {
        case DataStates.NEVER:
        case DataStates.FETCHING_FIRST:
        case DataStates.FETCHING: {
            return <div>LOADING</div>
        }
        case DataStates.SUCCESS:{
            return <Home />
        }
        default: {
            return <div>{appLoadError}</div>
        }
    }
}

export default Root
