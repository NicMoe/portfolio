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
          I&apos;m a data scientist with a decade of experience supporting real
          world data projects by{' '}
          <StyledLink href="/projects/bee-swarm-for-distributions">
            building analytics and visualization software
          </StyledLink>{' '}
          in health tech and for public health initiatives. I&apos;m passionate
          about{' '}
          <StyledLink href="/projects/aggregates-with-missing-data">
            clear communication of data processes
          </StyledLink>{' '}
          and{' '}
          <StyledLink href="/projects/public-safety-versus-itself">
            research findings
          </StyledLink>
          .
        </p>
        <p>
          My upcoming projects focus on advancing scientific research workflows
          through statistical modeling, machine learning, and data analytics within the biotech and
          life science industries.
        </p>
        <p>
          When not working, you can find me hosting{' '}
          <StyledLink
            href="https://www.meetup.com/tech-by-the-beach/"
            target="_blank"
          >
            Tech by the Beach
          </StyledLink>
          , taking{' '}
          <StyledLink
            href="https://www.instagram.com/nicwillmoe/"
            target="_blank"
          >
            landscape photography
          </StyledLink>
          , or hanging out with my husband and our kitten, Nandor the
          Relentless.
        </p>
      </TitledContent>
    </LayoutContainer>
  )
}
