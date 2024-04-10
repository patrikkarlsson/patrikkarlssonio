import { css } from 'styled-components'

export const InnerSpacing = css`
  ${({ 
    theme,
  }) => `
    ${theme.fluidType(
      'padding',
      theme.mq.mobile.max,
      theme.mq.desktop.min,
      '2rem',
      '8rem'
    )}
    box-sizing: border-box;
  `}
`
