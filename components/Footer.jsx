import styled from 'styled-components'
import LayoutContainer from './LayoutContainer'
import pgk from '../package.json'
import StyledLink from './StyledLink'
import { getResponseTypeStyle, Size } from '../utils/typography.utils'
import { Breakpoint, mediaQuery } from '../utils/responsive.utils'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: flex-start;
  row-gap: 0.9em;

  ${getResponseTypeStyle(Size.small)};

  > * {
    margin: 0;
    margin-inline-end: 1.5em;

    ${mediaQuery(Breakpoint.sm)} {
      margin-block-end: 0;
    }

    :last-of-type {
      margin-inline-end: 0;
    }
  }
`

const Copyright = styled.p`
  flex-grow: 1;
  white-space: nowrap;
  text-align: left;
`

const Contact = styled.p`
  flex-grow: 1;
  text-align: right;

  > * {
    margin-inline-end: 0.7em;

    :last-of-type {
      margin-inline-end: 0;
    }
  }
`

export default function Footer() {
  return (
    <LayoutContainer
      backgroundColor="var(--theme-bg-03)"
      color="var(--theme-text-03)"
      padding="1rem 1.5rem"
    >
      <Container>
        <Copyright>
          &copy;{new Date().getFullYear()} Nic Moe
        </Copyright>
        <Contact>
        <StyledLink
            href="mailto:nicmoe.io@gmail.com"
            target="_blank"
            rel="noreferrer"
            $backgroundColor="var(--theme-primary)"
          >
            Email
          </StyledLink>{' '}
          <StyledLink
            href="https://www.linkedin.com/in/nicwillmoe/"
            target="_blank"
            rel="noreferrer"
            $backgroundColor="var(--theme-primary)"
          >
            LinkedIn
          </StyledLink>{' '}
          <StyledLink
            href="https://github.com/NicMoe/"
            target="_blank"
            rel="noreferrer"
            $backgroundColor="var(--theme-primary)"
          >
            GitHub
          </StyledLink>{' '}
          <StyledLink
            href="https://www.instagram.com/nicwillmoe/"
            target="_blank"
            rel="noreferrer"
            $backgroundColor="var(--theme-primary)"
          >
            Instagram
          </StyledLink>{' '}
          <StyledLink
            href="https://bsky.app/profile/nicmoe.bsky.social"
            target="_blank"
            rel="noreferrer"
            $backgroundColor="var(--theme-primary)"
          >
            Bluesky
          </StyledLink>
        </Contact>
      </Container>
    </LayoutContainer>
  )
}
