import styled from 'styled-components'
import { Breakpoint, mediaQuery } from '../utils/responsive.utils'
import BorderedLink from './BorderedLink'
import LayoutContainer from './LayoutContainer'
import { getResponseTypeStyle, Size } from '../utils/typography.utils'
import NetworkGraph from './NetworkGraph'

const OuterContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  ${mediaQuery(Breakpoint.md)} {
    padding-block-start: 5em;
    padding-block-end: 5em;
  }
`

const TextContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
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
const NavigationLink = styled(BorderedLink)``

const NetworkGraphContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`

export default function Hero() {
  return (
    <LayoutContainer backgroundColor="var(--theme-bg-04)" color="var(--theme-text-04)">
      <OuterContainer>
        <TextContainer>
          <Hello>
            Hello, my name is <Name>Nic Moe</Name>
          </Hello>
          <Tagline>I help scientists with data science</Tagline>
          <Navigation>
            <NavigationItem>
              <NavigationLink href="/posts" $backgroundColor="var(--theme-primary)">
                See my work
              </NavigationLink>
            </NavigationItem>
            <NavigationItem>
              <NavigationLink href="mailto:nicmoe.io@gmail.com" $backgroundColor="var(--theme-primary)">
                Let&apos;s work together
              </NavigationLink>
            </NavigationItem>
          </Navigation>
        </TextContainer>
      </OuterContainer>
      <NetworkGraphContainer>
        <NetworkGraph />
      </NetworkGraphContainer>
    </LayoutContainer>
  );
}