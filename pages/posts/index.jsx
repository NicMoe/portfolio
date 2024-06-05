import PropTypes from 'prop-types'
import PostCardsGrid from '../../components/PostCardsGrid'
import { getAllPosts } from '../../lib/posts'

export async function getStaticProps() {
  const posts = getAllPosts()
    .map(({ frontmatter, slug }) => ({
      ...frontmatter,
      slug,
    }))
    .filter(post => post.dateId)
    .sort((a, b) => b.dateId.localeCompare(a.dateId));

  return {
    props: {
      posts,
    },
  };
}

export default function PostsPage({ posts = [] }) {
  return <PostCardsGrid posts={posts} showFilters />;
}

PostsPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      imgs: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};