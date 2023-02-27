import styled, { css } from 'styled-components'
import { AppContext } from '@thebond/storyblok-nextjs-helpers-components'
import { useContext } from 'react'

const HorizontalItem = styled.div`
  ${({ theme }) => css`
    display: flex;
    aspect-ratio: 1 / 1;
    width: 50vw;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    ${theme.fluidType('padding', theme.mq.mobile, theme.mq.desktop, '0rem', '8rem' )}

    @media only screen and (min-width: ${theme.mq.tablet}) {
      width: 33.3vw;
    }

    @media only screen and (min-width: ${theme.mq.laptop}) {
      width: 25vw;
    }

    @media only screen and (min-width: ${theme.mq.desktop}) {
      width: 20vw;
    }
  `}
`

export default ({ blok, theme }) => {

  const { DynamicComponent } = useContext(AppContext)

  return (
    <HorizontalItem theme={theme}>
      {DynamicComponent.render(blok.body[0], blok.body[0]._uid)}
    </HorizontalItem>
  )
}