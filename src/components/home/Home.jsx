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

import BreathWizard from 'components/breath/BreathWizard'
import WaitWizard from 'components/wait/WaitWizard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Home.scss'

const Home = () => {

    const [showWaitWizard, setShowWaitWizard] = useState(false)
    const [showBreathWizard, setShowBreathWizard] = useState(false)

    const onNewWaitPress = () => {
        setShowWaitWizard(!showWaitWizard)
    }
    const onNewWaitDialogClose = () => {
        setShowWaitWizard(!showWaitWizard)
    }

    const onNewBreathPress = () => {
        setShowBreathWizard(!showBreathWizard)
    }
    const onNewBreathDialogClose = () => {
        setShowBreathWizard(!showBreathWizard)
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
                        onClick={onNewBreathPress}
                    >
                        <FontAwesomeIcon icon={['fas', 'lungs']} />
                    </button>
                    <button
                        className='tile yellow'
                        onClick={onNewWaitPress}
                    >
                        <FontAwesomeIcon icon={['fas', 'music']} />
                    </button>
                </div>
            </AppContent>
            { showBreathWizard ?
                <Dialog
                    title='Start new breath session'
                    onClose={onNewBreathDialogClose}
                >
                    <BreathWizard
                        onCancel={onNewBreathDialogClose}
                    />
                </Dialog>
            : null}
            { showWaitWizard ?
                <Dialog
                    title='Start new wait session'
                    onClose={onNewWaitDialogClose}
                >
                    <WaitWizard
                        onCancel={onNewWaitDialogClose}
                    />
                </Dialog>
            : null}
        </AppPage>
    )
}


export default Home
