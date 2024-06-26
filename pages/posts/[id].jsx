import PropTypes from 'prop-types'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Post from '../../components/Post'
import { getAllPosts, getPostBySlug } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.id)

  const mdxSource = await serialize(post.content || '')

  return {
    props: {
      ...post.frontmatter,
      mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map(post => ({
      params: {
        id: post.slug,
      },
    })),
    fallback: false,
  }
}

export default function PostPage({ mdxSource, ...rest }) {
  return (
    <main>
      <Post {...rest}>
        <MDXRemote {...mdxSource} />
      </Post>
    </main>
  )
}

PostPage.propTypes = {
  mdxSource: PropTypes.object.isRequired,
}
