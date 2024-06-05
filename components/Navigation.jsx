import styled from 'styled-components'
import { useRouter } from 'next/router'
import BorderedLink from './BorderedLink'

const List = styled.ul`
  display: flex;
  > * {
    margin-inline-end: 1em;

    :last-of-type {
      margin-inline-end: 0;
    }
  }
`

const NavLink = styled(BorderedLink)``

export default function Navigation() {
  const router = useRouter()
  const { query } = router;
  return (
    <List>
      <li>
        <NavLink
          href="/posts?type=Project"
          active={query.type === 'project' ? 'true' : undefined}
          $backgroundColor="var(--theme-primary)"
        >
          Projects
        </NavLink>
      </li>

      <li>
        <NavLink
          href="/posts?type=Article"
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
