import { createGlobalStyle, css } from "styled-components"

export const DefaultGlobals = createGlobalStyle`
  ${({ theme, fonts }) => css`

    ${theme.normalize(fonts)}

    .large-text {
      ${theme.fluidType("font-size", theme.mq.mobile, theme.mq.desktop, '2.5rem', '4.375rem')};
      line-height: 1.2;
    }

    .pre-title {
      ${theme.fluidType("font-size", theme.mq.mobile, theme.mq.desktop, '0.875rem', '0.875rem')};
      text-transform: uppercase;
      background-color: #000;
      color: #fff;
      padding: 5px 10px;
    }

    .background {
      text-decoration: none;
      text-transform: uppercase;
      background-color: #000;
      color: #fff;
      padding: 5px 10px;
      line-height: 1.5;
    }

    html {
      scroll-behavior: initial;
    }

    html,
    body {
      min-height: 100%;
      height: auto;
    }

    #__next {
      width: 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      height: 100%;
      flex-direction: column;
    }
  `}
`