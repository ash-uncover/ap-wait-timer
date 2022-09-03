import React from 'react'

import {
    useState,
} from 'lib/hooks'

import {
    Dialog,
} from 'components/commons/basic'

import {
    AppContent,
    AppPage,
    AppToolbar,
} from 'components/commons/app'

import WaitWizard from 'components/wait/WaitWizard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Home.scss'

const Home = () => {

    const [showWaitWizard, setShowWaitWizard] = useState(false)

    const onNewWaitPress = () => {
        setShowWaitWizard(!showWaitWizard)
    }

    const onDialogClose = () => {
        setShowWaitWizard(!showWaitWizard)
    }

    return (
        <AppPage>
            <AppToolbar>
                <div className='app-toolbar-left'>
                    <button>
                        <FontAwesomeIcon icon={['fas', 'home']} />
                    </button>
                    <label>
                        AP Sounds
                    </label>
                </div>
                <div className='app-toolbar-right'>
                    <button>
                        <FontAwesomeIcon icon={['fas', 'cog']} />
                    </button>
                </div>
            </AppToolbar>
            <AppContent>
                <div className='tile-container'>
                    <button
                        className='tile red'
                        onClick={onNewWaitPress}
                    >
                        <FontAwesomeIcon icon={['fas', 'stopwatch']} />
                    </button>
                    <button
                        className='tile teal'
                        onClick={onNewWaitPress}
                    >
                        <FontAwesomeIcon icon={['fas', 'lungs']} />
                    </button>
                </div>
            </AppContent>
            { showWaitWizard ?
                <Dialog
                    title='wizard'
                    onClose={onDialogClose}
                >
                    <WaitWizard
                        onCancel={onDialogClose}
                    />
                </Dialog>
            : null}
        </AppPage>
    )
}


export default Home
