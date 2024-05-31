import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DefaultScale } from '../utils/typography.utils'
import LayoutContainer from './LayoutContainer'
import StyledLink, { styles as linkStyles } from './StyledLink'
import TagsList from './TagsList'
import ImageCarousel from './ImageCarousel'

const Description = styled.p`
  font-size: ${DefaultScale.h4};
  color: var(--theme-bg-02);
`

const Links = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  > * {
    margin-block-end: 1.2em;
    margin-inline-end: 1.2em;

    :last-of-type {
      margin-block-end: 0;
      margin-inline-end: 0;
    }
  }
`

const Content = styled.div`
  a:any-link {
    ${linkStyles}
  }

  ul {
    padding-inline-start: 3em;
    list-style: disc;
  }

  li {
    margin-block-end: 0.5em;
  }
`

const ProjectNavigationLinks = styled.div`
  padding-block-start: 2em;
  padding-block-end: 1em;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  > * {
    margin-block-end: 1em;
    margin-inline-end: 0.8em;

    :last-of-type {
      margin-block-end: 0;
      margin-inline-end: 0;
    }
  }
`

export default function Project({
  imgs = [],
  name = '',
  description = '',
  tags = [],
  previous,
  next,
  color,
  links = [],
  children,
}) {
  const topContent = (
    <>
      <h1>{name}</h1>
      <TagsList tags={tags} tagColor="var(--theme-bg-02)" />
      <Description>{description}</Description>

      {links && (
        <Links>
          {links.map(link => (
            <StyledLink
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.text}
            </StyledLink>
          ))}
        </Links>
      )}
    </>
  )

  const bottomContent = (
    <>
      <Content>{children}</Content>
      <ProjectNavigationLinks>
        {previous && <StyledLink href={previous}>Previous project</StyledLink>}
        {next && <StyledLink href={next}>Next project</StyledLink>}
      </ProjectNavigationLinks>
    </>
  )

  if (!imgs || imgs.length === 0) {
    return (
      <LayoutContainer narrow>
        {topContent}
        {bottomContent}
      </LayoutContainer>
    )
  }

  return (
    <>
      <LayoutContainer narrow>{topContent}</LayoutContainer>
      {imgs.length > 0 && (
        <ImageCarousel
          images={imgs.map(img => `/projects/${img}`)}
          backgroundColor={color || 'var(--theme-bg-04)'}
        />
      )}
      <LayoutContainer narrow>{bottomContent}</LayoutContainer>
    </>
  )
}

Project.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  previous: PropTypes.string,
  next: PropTypes.string,
  color: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  children: PropTypes.node,
}
