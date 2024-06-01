import StyledLink from './StyledLink'
import LayoutContainer from './LayoutContainer'

export default function Hero() {
  return (
    <LayoutContainer
      backgroundColor="var(--theme-bg-01)"
      color="var(--theme-text-01)"
    >
    <p>
    I&apos;m a data scientist with a decade of experience supporting real world data projects by{' '}
    <StyledLink href="/projects/bee-swarm-for-distributions">
        building analytics and visualization software
    </StyledLink>{' '}
    in health tech and for public health initiatives. I&apos;m passionate about{' '}
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
    , or hanging out with my husband and our kitten, Nandor the Relentless.
    </p>
    </LayoutContainer>
  )
}