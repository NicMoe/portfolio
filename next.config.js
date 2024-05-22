import withMDX from '@next/mdx'
import remarkHtml from 'remark-html'

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkHtml],
  },
})

export default {
  ...mdxConfig,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  compiler: {
    styledComponents: true,
  },
}
