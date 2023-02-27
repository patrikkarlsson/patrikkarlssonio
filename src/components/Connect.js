import styled, { css } from 'styled-components'

const Connect = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`


const Holder = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    @media only screen and (min-width: ${theme.mq.tablet}) {
      flex-direction: row;
    }
  `}
`

const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.color.white};
  `}
`

const Link = styled.a`
  margin: 0;
  display: flex;
  align-items: center;
`

const LinkedInIcon = styled.img`
  height: 2rem;
  width: auto;
  margin-left: 1.25rem;
`
const GithubIcon = styled.img`
  ${({ theme }) => css`
    height: 2rem;
    width: auto;
    @media only screen and (min-width: ${theme.mq.tablet}) {
      margin-left: 1.25rem;
    }
  `}
`

const Social = styled.div`
${({ theme }) => css`
  display: flex;
  align-items: center;

  @media only screen and (min-width: ${theme.mq.tablet}) {
    margin-top: 0;
  }
`}
`

export default ({ blok, theme }) => {
  return (
    <Connect>
      <Holder theme={theme}>
        <Title theme={theme}>{blok.text}</Title>
        <Social theme={theme}>
          <Link href={blok.github_url.cached_url} {...blok.github_url}><GithubIcon theme={theme} src="/github.svg"/></Link>
          <Link href={blok.linkedin_url.cached_url} {...blok.linkedin_url}><LinkedInIcon src="/linkedin.svg" /></Link>
        </Social>
      </Holder>
    </Connect>
  )
}