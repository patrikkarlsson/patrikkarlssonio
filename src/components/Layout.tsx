import styled, { css } from 'styled-components'
import { useStore } from '@/lib/store'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { useFrame } from '@studio-freight/hamo'

const Main = styled.main`
  ${() => css`
    min-height: 100vh;
  `}
`

declare global {
  interface Window {
    lenis: any;
  }
}

type Props = {
  children: string | JSX.Element | JSX.Element[],
}

const Layout = ({ 
  children 
} : Props) => {
  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis])

  useEffect(() => {
    const lenis = new Lenis()
    window.lenis = lenis
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  },
  [])

  useFrame((time: number) => {
    lenis?.raf(time)
  })

  return (
    <Main className="container">
      {children}
    </Main>
  )
}

export default Layout