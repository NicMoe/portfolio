import styled from 'styled-components'
import StyledLink, { styles as upstreamStyles } from './StyledLink'

const BorderedLink = styled(StyledLink)`
  text-decoration: none;
  display: flex;
  align-items: center;

  padding: 0 0.3em;

  &::before {
    content: '';
    display: ${props => (props.active ? 'inline-block' : 'none')};
    block-size: 0.375em;
    inline-size: 0.375em;
    border-radius: 0.375em;
    background-color: var(--theme-primary);
    margin-inline-end: 0.2em;
  }

  &:hover::before {
    background-color: currentColor;
  }
`

export const styles = upstreamStyles;

export default BorderedLink