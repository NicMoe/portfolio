import Head from 'next/head'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import GlobalStyles from '../components/GlobalStyles'
import Page from '../components/Page'

// Define any custom components you want to use in MDX files
const components = {
  // Example: code: (props) => <pre style={{ color: 'tomato' }} {...props} />
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nic Moe, Data Scientist</title>
      </Head>
      <GlobalStyles />
      <MDXProvider components={components}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </MDXProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}
