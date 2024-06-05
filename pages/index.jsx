import PropTypes from 'prop-types'
import Hero from '../components/Hero'
import About from '../components/About'
import PostCardsGrid from '../components/PostCardsGrid'
import { getAllPosts } from '../lib/posts'

export async function getStaticProps() {
  const posts = getAllPosts()
    .map(({ frontmatter, slug }) => ({
      ...frontmatter,
      slug,
    }))
    .filter(post => post.dateId)
    .sort((a, b) => b.dateId.localeCompare(a.dateId))

  return {
    props: {
      posts,
    },
  }
}

export default function Home({ posts = [] }) {
  const featuredPosts = posts.slice(0, 3)
  return (
    <>
      <Hero />
      <About />
      <PostCardsGrid
        heading="Featured projects and articles"
        posts={featuredPosts}
        seeMoreLink={featuredPosts[featuredPosts.length - 1].slug}
      />
    </>
  )
}

Home.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      imgs: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
}
