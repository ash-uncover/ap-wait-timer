import React from 'react'

import {
    useDispatch,
    useEffect,
    useSelector,
} from 'lib/hooks'

import {
    selectors as AppSelectors
} from 'store/app'

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'

import DataStates from 'lib/constants/DataStates'

import HomeError from 'components/home/HomeError'
import HomeLoading from 'components/home/HomeLoading'
import RouteWait from 'routes/wait'
import RouteHome from 'routes'

import * as Service from 'lib/services/ServiceHelper'

const Root = () => {

    const dispatch = useDispatch()

    const appLoadStatus = useSelector(AppSelectors.appLoadStatus)

    useEffect(() => {
        Service.loadData(dispatch)
    }, [])

    switch (appLoadStatus) {
        case DataStates.NEVER:
        case DataStates.FETCHING_FIRST:
        case DataStates.FETCHING: {
            return <HomeLoading />
        }
        case DataStates.SUCCESS: {
            return (
                <Router hashType='noslash'>
                    <Routes>
                        <Route path='/wait' element={<RouteWait />} />
                        <Route path='/' element={<RouteHome />} />
                    </Routes>
                </Router>
            )
        }
        default: {
            return <HomeError />
        }
    }
}

export default Root
