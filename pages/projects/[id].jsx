import PropTypes from 'prop-types'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Project from '../../components/Project'
import { getAllProjects, getProjectBySlug } from '../../lib/projects'

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.id)

  const mdxSource = await serialize(project.content || '')

  return {
    props: {
      ...project.frontmatter,
      mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const projects = getAllProjects()

  return {
    paths: projects.map(project => ({
      params: {
        id: project.slug,
      },
    })),
    fallback: false,
  }
}

export default function ProjectPage({ mdxSource, ...rest }) {
  return (
    <main>
      <Project {...rest}>
        <MDXRemote {...mdxSource} />
      </Project>
    </main>
  )
}

ProjectPage.propTypes = {
  mdxSource: PropTypes.object.isRequired,
}
