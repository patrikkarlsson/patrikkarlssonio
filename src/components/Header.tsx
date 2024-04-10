import styled, { css } from 'styled-components'

const Header = styled.header`
  ${({ theme }) => css`
    height: ${theme.menuHeight};
    padding: 2rem;
    box-sizing: content-box;

    img {
      height: 100%;
      width: auto;
    }
  `}
`

export default function HeaderBlock () {
  return (
    <Header>
      <img src="/pk.svg" height="80" width="80" />
    </Header>
  )
}