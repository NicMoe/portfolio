import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LayoutContainer from './LayoutContainer'
import TitledContent from './TitledContent'
import PostCard from './PostCard'
import PostFilterList from './PostFilterList'
import BorderedLink from './BorderedLink'
import { getResponseTypeStyle, Size } from '../utils/typography.utils'
import { Breakpoint, mediaQuery } from '../utils/responsive.utils'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  grid-auto-rows: 1fr;
  gap: 0.7em;
  margin-block-end: 2em;
`

const FiltersContainer = styled.div`
  margin-block-end: 1em;
`

const SeeMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  ${mediaQuery(Breakpoint.sm)} {
    text-align: center;
  }
`

const SeeMoreButton = styled(BorderedLink)`
  ${getResponseTypeStyle(Size.h5)}
`

const Label = styled.span`
  font-weight: 400;
  white-space: nowrap;
  margin-inline-end: 0.9em;
`

const StyledPostTypeButton = styled.button`
  border: 1px solid ${props => props.selected ? 'var(--theme-bg-03)' : 'var(--theme-bg-02)'};
  color: ${props => props.selected ? 'var(--theme-primary)' : 'var(--theme-bg-02)'};
  background: ${props => props.selected ? 'var(--theme-bg-03)' : 'var(--theme-bg-01)'};
  display: inline-block;
  font-size: 1.0em;
  padding: 0em 0.5em;
  border-radius: 0.2em;
  margin-block-end: 0.7em;
  margin-inline-end: 0.7em;
  cursor: ${props => props.selected ? 'auto' : 'pointer'};
  font: inherit;

  &:hover {
    border: 1px solid ${props => props.selected ? 'var(--theme-bg-03)' : 'var(--theme-bg-03)'};
    color: ${props => props.selected ? 'var(--theme-primary)' : 'var(--theme-bg-03)'};
  }
`;

const PostTypeButton = ({ selected, children, ...props }) => (
  <StyledPostTypeButton selected={selected} {...props}>
    {children}
  </StyledPostTypeButton>
);

PostTypeButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default function PostCardsGrid({
  heading = 'Posts',
  posts = [],
  showFilters,
  seeMoreLink,
}) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    if (router.query.type) {
      setSelectedType(router.query.type);
    }
    if (router.query.tags) {
      setSelectedFilters(router.query.tags.split(','));
    }
  }, [router.query]);

  const typeFilters = ['Project', 'Article'];

  const handleTypeFilterChange = type => {
    setSelectedType(type)
    setSelectedFilters([]) // Reset tag filters when type changes
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type, tags: '' },
    })
  }

  const handleFilterToggle = name => {
    const updatedFilters = selectedFilters.includes(name)
      ? selectedFilters.filter(filter => filter !== name)
      : [...selectedFilters, name]
    setSelectedFilters(updatedFilters)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tags: updatedFilters.join(',') },
    })
  }

  // Filter posts by selected type
  const postsByType = selectedType
    ? posts.filter(post => post.type === selectedType)
    : posts

  // Extract tags from the filtered posts
  const tagFilters = postsByType
    .map(({ tags }) => tags)
    .flat()
    .reduce(
      (tagsObj, tag) => ({
        ...tagsObj,
        [tag]: (tagsObj[tag] || 0) + 1,
      }),
      {},
    )

  const filteredPosts = postsByType.filter(
    ({ tags }) =>
      selectedFilters.length === 0 ||
      tags.some(tag => selectedFilters.includes(tag)),
  )

  return (
    <LayoutContainer>
      <TitledContent id="posts" heading={heading}>
        {showFilters && (
          <FiltersContainer>
            <div>
              <Label>Filter by post type:</Label>
              {typeFilters.map(type => (
                <PostTypeButton
                  key={type}
                  type="button"
                  onClick={() => handleTypeFilterChange(type)}
                  selected={type === selectedType}
                >
                  {type}
                </PostTypeButton>
              ))}
            </div>
            <PostFilterList
              filters={tagFilters}
              selectedFilters={selectedFilters}
              onToggle={handleFilterToggle}
              onReset={() => setSelectedFilters([])}
            />
          </FiltersContainer>
        )}
        <Grid>
          {filteredPosts.map(post => (
            <PostCard
              key={post.slug}
              id={post.slug}
              heading={post.name}
              img={post.thumbnail}
              url={`/posts/${post.slug}`}
              tags={post.tags}
              color={post.color}
            >
              {post.description}
            </PostCard>
          ))}
        </Grid>
        {seeMoreLink && (
          <SeeMoreButtonContainer>
            <SeeMoreButton
              href={`/posts#${seeMoreLink}`}
              $backgroundColor="var(--theme-bg-02)"
            >
              See more posts
            </SeeMoreButton>
          </SeeMoreButtonContainer>
        )}
      </TitledContent>
    </LayoutContainer>
  );
}

PostCardsGrid.propTypes = {
  heading: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      thumbnail: PropTypes.string,
      imgs: PropTypes.arrayOf(PropTypes.string),
      color: PropTypes.string,
      dateId: PropTypes.string,
    }),
  ),
  showFilters: PropTypes.bool,
  seeMoreLink: PropTypes.string,
};