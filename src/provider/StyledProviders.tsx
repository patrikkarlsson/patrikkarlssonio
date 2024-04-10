'use client'

import StyledComponentsRegistry from '@/styles/registry'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import DefaultTheme from '@/styles/DefaultTheme'

const Providers = (props: PropsWithChildren ) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={DefaultTheme}>
        {props.children} 
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers