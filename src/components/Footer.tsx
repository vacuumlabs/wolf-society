import { SUBPAGES } from '@/consts'
import { getSubpagesKeys } from '@/utils/helpers'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  BreakpointOverrides,
  Theme,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import heroImage from 'public/images/hero.png'
import AppearingComponent from './AppearingComponent'
import HeroParallax from './HeroParallax'
import DiscordIcon from './icons/DiscordIcon'
import MediumIcon from './icons/MediumIcon'
import TwitterIcon from './icons/TwitterIcon'
import WSLogo from './icons/WSLogo'
import Link from './Link'

const Footer = () => {
  const translate = useContentful(ContentTypes.navbar)
  const router = useRouter()
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const isMobileHero = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )

  const socials: { text: string; href: string; icon: React.ReactNode }[] = [
    {
      text: 'discord',
      href: translate('discordLink'),
      icon: <DiscordIcon />,
    },
    {
      text: 'twitter',
      href: `https://twitter.com/${translate('twitterAccount')}`,
      icon: <TwitterIcon />,
    },
    {
      text: 'medium',
      href: `https://medium.com/@${process.env.NEXT_PUBLIC_MEDIUM_USER}`,
      icon: <MediumIcon />,
    },
  ]
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <AppearingComponent>
        <Container sx={{ pb: 5, pt: { mobile: 5, [breakpoint]: 10 } }}>
          <Grid container spacing={{ mobile: 5, [breakpoint]: 0 }}>
            <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
              <Stack
                alignItems={{ mobile: 'center', [breakpoint]: 'start' }}
                justifyContent="space-between"
                height="100%"
              >
                <WSLogo color="black" />
                <Typography
                  variant="button"
                  display={{ mobile: 'none', [breakpoint]: 'inherit' }}
                >
                  {translate('email')}
                </Typography>
              </Stack>
            </Grid>
            <Grid item mobile={12} {...{ [breakpoint]: 3 }}>
              <Stack
                spacing={{ mobile: 3, [breakpoint]: 5 }}
                alignItems={{ mobile: 'center', [breakpoint]: 'start' }}
              >
                {getSubpagesKeys()
                  .filter((key) => key !== 'account')
                  .map((subpageKey) => {
                    const isCurrentSubpage =
                      router.pathname === SUBPAGES[subpageKey]
                    const color = isCurrentSubpage ? 'primary' : 'inherit'
                    return (
                      <Typography
                        variant="button"
                        key={subpageKey}
                        color={color}
                      >
                        <Link
                          color="inherit"
                          href={SUBPAGES[subpageKey]}
                          underline="hover"
                        >
                          {translate(subpageKey)}
                        </Link>
                      </Typography>
                    )
                  })}
              </Stack>
            </Grid>
            <Grid item mobile={12} {...{ [breakpoint]: 3 }}>
              <Stack
                spacing={{ mobile: 3, [breakpoint]: 5 }}
                direction={{ mobile: 'row', [breakpoint]: 'column' }}
                justifyContent={{ mobile: 'center' }}
              >
                {socials.map((social) => {
                  return (
                    <Typography variant="button" key={social.text}>
                      <Link
                        color="inherit"
                        href={social.href}
                        underline="hover"
                        target="_blank"
                      >
                        <Stack
                          direction={{ mobile: 'column', [breakpoint]: 'row' }}
                          alignItems="center"
                          gap={1}
                        >
                          {social.icon}
                          {social.text}
                        </Stack>
                      </Link>
                    </Typography>
                  )
                })}
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <HeroParallax />
      </AppearingComponent>
    </Box>
  )
}

export default Footer
