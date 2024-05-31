import styled from 'styled-components'
import { Breakpoint, mediaQuery } from '../utils/responsive.utils'
import StyledLink from './StyledLink'
import LayoutContainer from './LayoutContainer'
import { getResponseTypeStyle, Size } from '../utils/typography.utils'

const Container = styled.header`
  ${mediaQuery(Breakpoint.md)} {
    padding-block-start: 5em;
    padding-block-end: 5em;
  }
`

const Name = styled.span`
  white-space: nowrap;
`
const Hello = styled.h1`
  margin-block-end: 0.2em;
`
const Tagline = styled.p`
  margin-block-end: 1em;
  ${getResponseTypeStyle(Size.h3)}
`

const Navigation = styled.ul`
  display: flex;
  > * {
    margin-block-end: 1.5em;
    margin-inline-end: 1.5em;

    :last-of-type {
      margin-block-end: 0;
      margin-inline-end: 0;
    }
  }
`

const NavigationItem = styled.li``
const NavigationLink = styled(StyledLink)``

export default function Hero() {
  return (
    <LayoutContainer
      backgroundColor="var(--theme-bg-04)"
      color="var(--theme-text-04)"
    >
      <Container>
        <Hello>
          Hello, my name is <Name>Nic Moe</Name>
        </Hello>
        <Tagline>I help scientists with data science</Tagline>
        <Navigation>
          <NavigationItem>
            <NavigationLink
              href="/projects"
              $backgroundColor="var(--theme-primary)"
            >
              See my work
            </NavigationLink>
          </NavigationItem>

          <NavigationItem>
            <NavigationLink
              href="/about"
              $backgroundColor="var(--theme-primary)"
            >
              Get to know me
            </NavigationLink>
          </NavigationItem>
        </Navigation>
      </Container>
    </LayoutContainer>
  )
}