import Link from 'next/link'
import styled, { css } from 'styled-components'

export const hoverStyles = css`
  background-size: 100% 100%;
  color: ${({ $backgroundColor }) => {
    if ($backgroundColor === 'var(--theme-bg-02)') {
      return 'var(--theme-text-02)';
    }
    if ($backgroundColor) {
      return 'var(--theme-bg-03)';
    }
    return 'var(--theme-primary)';
  }};
`

export const styles = css`
  background: linear-gradient(
      transparent 0%,
      ${({ $backgroundColor }) => $backgroundColor || 'var(--theme-bg-03)'} 0%
    )
    no-repeat;
  background-size: 100% 2px;
  background-position: bottom;
  transition: background-size 150ms, color 150ms;
  text-decoration: none;

  &:hover {
    ${hoverStyles}
  }
`

const StyledLink = styled(Link)`
  ${styles}
`

export default StyledLink