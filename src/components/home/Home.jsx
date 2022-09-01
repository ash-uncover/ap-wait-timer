import React from 'react'

import {
    useState,
} from 'lib/hooks'

import {
    Button,
    Dialog,
} from 'components/commons/basic'

import {
    AppContent,
    AppPage,
    AppToolbar,
} from 'components/commons/app'

import './Home.scss'

const Home = () => {

    const [showWizard, setShowWizard] = useState(false)

    const onNewWaitPress = () => {
        setShowWizard(!showWizard)
    }

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
                <Button
                    label='New Wait'
                    primary
                    onClick={onNewWaitPress}
                />
            </AppContent>
            { showWizard ? <Dialog title='wizard'></Dialog> : null}
        </AppPage>
    )
}


export default Home
