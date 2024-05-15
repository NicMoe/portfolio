import Link from 'next/link'
import ImageCarousel from '../components/ImageCarousel'
import LayoutContainer from '../components/LayoutContainer'
import StyledLink from '../components/StyledLink'
import TitledContent from '../components/TitledContent'

export default function AboutPage() {
  return (
    <LayoutContainer narrow>
      <TitledContent heading="Hey folks!">
        <ImageCarousel
          images={[`/me-0${Math.floor(Math.random() * 1) + 1}.png`]}
        />
        <p>
          I&apos;m a data scientist with a decade experience supporting real
          world data projects by{' '}
          <Link href="/projects/bee-swarm-for-distributions" passHref>
            <StyledLink>
              building analytics and visualization software
            </StyledLink>
          </Link>{' '}
          in health tech and for public health initiatives. I&apos;m passionate
          about{' '}
          <Link href="/projects/aggregates-with-missing-data" passHref>
            <StyledLink>clear communication of data processes</StyledLink>
          </Link>{' '}
          and{' '}
          <Link href="/projects/public-safety-versus-itself" passHref>
            <StyledLink>research findings</StyledLink>
          </Link>
          .
        </p>
        <p>
          My upcoming projects focus on advancing scientific research workflows
          through data analytics and machine learning within the biotech and
          life science industries.
        </p>
        <p>
          When not working, you can find me hosting{' '}
          <Link href="https://www.meetup.com/tech-by-the-beach/" passHref>
            <StyledLink target="_blank">Tech by the Beach</StyledLink>
          </Link>
          , taking{' '}
          <Link href="https://www.instagram.com/nicwillmoe/" passHref>
            <StyledLink target="_blank">landscaping photography</StyledLink>
          </Link>
          , or hanging out with my husband and our kitten, Nandor the
          Relentless.
        </p>
      </TitledContent>
    </LayoutContainer>
  )
}

AboutPage.propTypes = {}

AboutPage.defaultProps = {}
