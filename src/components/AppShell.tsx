import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import AppSelectors from 'store/app/app.selectors'

import { Shell, ShellArea, ShellBackground, ShellNavbar } from '@uncover/react-commons'

import './AppShell.css'
import { useAppData } from 'lib/services/ServiceHelper'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AppShellProperties {
  children: ReactNode
}
export const AppShell = ({
  children
}: AppShellProperties) => {

  // Hooks //

  const appBackground = useSelector(AppSelectors.background)

  useAppData()

  // Rendering //

  return (
    <Shell className='app-shell'>

      <ShellBackground>
        <img
          className='app-background-image'
          src={appBackground}
        />
      </ShellBackground>

      <ShellNavbar
        className='ap-shell__area'
        appTitle={'Wait'}
      ></ShellNavbar>

      <div
        className='ap-shell__content'
      >
        {children}
      </div>

    </Shell>
  )
}
