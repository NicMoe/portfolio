import PropTypes from 'prop-types'
import ProjectCardsGrid from '../../components/ProjectCardsGrid'
import { getAllProjects } from '../../lib/projects'

export async function getStaticProps() {
  const projects = getAllProjects()
    .map(({ frontmatter, slug }) => ({
      ...frontmatter,
      slug,
    }))
    .filter(project => project.dateId)
    .sort((a, b) => b.dateId.localeCompare(a.dateId));

  return {
    props: {
      projects,
    },
  };
}

export default function ProjectsPage({ projects = [] }) {
  return <ProjectCardsGrid projects={projects} showFilters />;
}

ProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      imgs: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};