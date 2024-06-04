import styled from 'styled-components'
import { useRouter } from 'next/router'
import StyledLink from './StyledLink'

const List = styled.ul`
  display: flex;
  > * {
    margin-inline-end: 1em;

    :last-of-type {
      margin-inline-end: 0;
    }
  }
`

const NavLink = styled(StyledLink)`
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

export default function Navigation() {
  const router = useRouter()
  const { query } = router;
  return (
    <List>
      <li>
        <NavLink
          href="/posts?type=project"
          active={query.type === 'project' ? 'true' : undefined}
          $backgroundColor="var(--theme-primary)"
        >
          Projects
        </NavLink>
      </li>

      <li>
        <NavLink
          href="/posts?type=article"
          active={query.type === 'article' ? 'true' : undefined}
          $backgroundColor="var(--theme-primary)"
        >
          Articles
        </NavLink>
      </li>

      <li>
        <NavLink
          href="mailto:nicmoe.io@gmail.com"
          $backgroundColor="var(--theme-primary)"
        >
          Contact me
        </NavLink>
      </li>
    </List>
  )
}
