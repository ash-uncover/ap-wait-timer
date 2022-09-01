import React from 'react'

import {
    Button,
} from 'components/commons/basic'

import {
    AppContent,
    AppPage,
    AppToolbar,
} from 'components/commons/app'

import './Home.scss'

const Home = () => {

    return (
        <AppPage className='home'>
            <AppToolbar>
                Toolbar
                <Button
                    icon={['fas', 'home']}
                />
                <Button
                    icon={['fas', 'cog']}
                />
            </AppToolbar>
            <AppContent>
                HOME 2
            </AppContent>
        </AppPage>
    )
}


export default Home
