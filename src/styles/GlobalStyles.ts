'use client'
import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${() => css`
    html {
      scroll-behavior: initial;
      overscroll-behavior: none;
      height: 100%;

      &.lenis-stopped {
        body {
          overflow: hidden;
        }
      }
    }

    html,
    body {
      height: auto;
    }

    body {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      font-family: var(--body);
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--heading);
      word-break: no-break;
      font-weight: 500;
    }

    p {
      word-break: no-break;
      font-weight: 400;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  `}
`

export default GlobalStyles
