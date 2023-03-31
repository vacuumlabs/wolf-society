import { SUBPAGES } from '@/consts'
import { getSubpagesKeys } from '@/utils/helpers'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Link,
  BreakpointOverrides,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import heroImage from 'public/images/hero.png'
import DiscordIcon from './icons/DiscordIcon'
import MediumIcon from './icons/MediumIcon'
import TwitterIcon from './icons/TwitterIcon'
import WSLogo from './icons/WSLogo'

const socials: { text: string; href: string; icon: React.ReactNode }[] = [
  { text: 'discord', href: 'https://discord.gg', icon: <DiscordIcon /> },
  { text: 'twitter', href: 'https://twitter.com', icon: <TwitterIcon /> },
  { text: 'medium', href: 'https://medium.com', icon: <MediumIcon /> },
]

const Footer = () => {
  const translate = useContentful(ContentTypes.navbar)
  const router = useRouter()
  const breakpoint: keyof BreakpointOverrides = 'tabletM'

  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <Container sx={{ pb: 5, pt: { mobile: 5, [breakpoint]: 10 } }}>
        <Grid container spacing={{ mobile: 5, [breakpoint]: 0 }}>
          <Grid item mobile={12} {...{ [breakpoint]: 6 }}>
            <Stack
              spacing={10}
              alignItems={{ mobile: 'center', [breakpoint]: 'start' }}
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
              {getSubpagesKeys().map((subpageKey) => {
                const isCurrentSubpage =
                  router.pathname === SUBPAGES[subpageKey]
                const color = isCurrentSubpage ? 'primary' : 'inherit'
                return (
                  <Typography variant="button" key={subpageKey} color={color}>
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
      <Box
        sx={{
          height: { mobile: '365px', tabletM: '730px' },
          position: 'relative',
        }}
      >
        <Image
          src={heroImage}
          alt="Hero image"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
    </Box>
  )
}

export default Footer
