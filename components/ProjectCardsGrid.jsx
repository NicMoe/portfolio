import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import LayoutContainer from './LayoutContainer'
import TitledContent from './TitledContent'
import ProjectCard from './ProjectCard'
import ProjectFilterList from './ProjectFilterList'
import Button from './Button'
import { getResponseTypeStyle, Size } from '../utils/typography.utils'
import { Breakpoint, mediaQuery } from '../utils/responsive.utils'
import { useRouter } from 'next/router';

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
  ${mediaQuery(Breakpoint.sm)} {
    text-align: center;
  }
`

const SeeMoreButton = styled(Button)`
  ${getResponseTypeStyle(Size.h5)}
`

const Label = styled.span`
  font-weight: 400;
  white-space: nowrap;
  margin-inline-end: 0.9em;
`

export default function ProjectCardsGrid({
  heading = 'Projects',
  projects = [],
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

  const typeFilters = ['project', 'post'];
  const tagFilters = projects
    .map(({ tags }) => tags)
    .flat()
    .reduce((tagsObj, tag) => ({
      ...tagsObj,
      [tag]: (tagsObj[tag] || 0) + 1,
    }), {});

  const filteredProjects = projects.filter(({ type, tags }) =>
    (selectedType ? type === selectedType : true) &&
    (selectedFilters.length > 0 ? tags.some(tag => selectedFilters.includes(tag)) : true)
  );

  const handleTypeFilterChange = (type) => {
    setSelectedType(type);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type },
    });
  };

  const handleFilterToggle = (name) => {
    const updatedFilters = selectedFilters.includes(name)
      ? selectedFilters.filter(filter => filter !== name)
      : [...selectedFilters, name];
    setSelectedFilters(updatedFilters);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tags: updatedFilters.join(',') },
    });
  };

  return (
    <LayoutContainer>
      <TitledContent id="projects" heading={heading}>
        {showFilters && (
          <FiltersContainer>
            <div>
              <Label>Filter by type:</Label>
              {typeFilters.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeFilterChange(type)}
                  style={{ background: type === selectedType ? 'grey' : 'white' }}
                >
                  {type}
                </button>
              ))}
            </div>
            <ProjectFilterList
              filters={tagFilters}
              selectedFilters={selectedFilters}
              onToggle={handleFilterToggle}
              onReset={() => setSelectedFilters([])}
            />
          </FiltersContainer>
        )}
        <Grid>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.slug}
              id={project.slug}
              heading={project.name}
              img={project.thumbnail}
              url={`/projects/${project.slug}`}
              tags={project.tags}
              color={project.color}
            >
              {project.description}
            </ProjectCard>
          ))}
        </Grid>
        {seeMoreLink && (
          <SeeMoreButtonContainer>
            <SeeMoreButton
              as="a"
              href={`/projects#${seeMoreLink}`}
              $buttonColor="var(--theme-bg-02)"
              $buttonHoverColor="var(--theme-bg-03)"
            >
              See more projects
            </SeeMoreButton>
          </SeeMoreButtonContainer>
        )}
      </TitledContent>
    </LayoutContainer>
  );
}

ProjectCardsGrid.propTypes = {
  heading: PropTypes.string,
  projects: PropTypes.arrayOf(
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