'use client'

import StyledComponentsRegistry from '@/styles/registry'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/DefaultTheme'

const Providers = (props: PropsWithChildren ) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        {props.children} 
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers