import PropTypes from 'prop-types'
import Hero from '../components/Hero'
import About from '../components/About'
import ProjectCardsGrid from '../components/ProjectCardsGrid'
import { getAllProjects } from '../lib/projects'

export async function getStaticProps() {
  const projects = getAllProjects()
    .map(({ frontmatter, slug }) => ({
      ...frontmatter,
      slug,
    }))
    .filter(project => project.dateId)
    .sort((a, b) => b.dateId.localeCompare(a.dateId))

  return {
    props: {
      projects,
    },
  }
}

export default function Home({ projects = [] }) {
  const featuredProjects = projects.slice(0, 6)
  return (
    <>
      <Hero />
      <About />
      <ProjectCardsGrid
        heading="Featured projects"
        projects={featuredProjects}
        seeMoreLink={featuredProjects[featuredProjects.length - 1].slug}
      />
    </>
  )
}

Home.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      imgs: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
}
