import { ConnectType } from '@/types'
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

    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      flex-direction: row;
    }
  `}
`

const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
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
    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      margin-left: 1.25rem;
    }
  `}
`

const Social = styled.div`
${({ theme }) => css`
  display: flex;
  align-items: center;

  @media only screen and (min-width: ${theme.mq.tablet.min}) {
    margin-top: 0;
  }
`}
`

type Props = {
  blok: ConnectType,
}

export default function ConnectBlock({
  blok,
} : Props) {
  return (
    <Connect>
      <Holder>
        <Title>{blok.text}</Title>
        <Social>
          <Link href={blok.github_url.cached_url}><GithubIcon src="/github.svg"/></Link>
          <Link href={blok.linkedin_url.cached_url}><LinkedInIcon src="/linkedin.svg" /></Link>
        </Social>
      </Holder>
    </Connect>
  )
}
