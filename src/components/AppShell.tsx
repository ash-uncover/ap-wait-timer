import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import AppSelectors from 'store/app/app.selectors'

import {
  Shell,
  ShellBackground,
  ShellNavbar
} from '@uncover/react-commons'

import './AppShell.css'

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

  // Rendering //

  return (
    <Shell className='app-shell'>

      <ShellBackground>
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
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
