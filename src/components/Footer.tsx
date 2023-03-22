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
import WSLogo from './icons/WSLogo'
import { subpages } from './Navigation'

const socials: { text: string; href: string }[] = [
  { text: 'discord', href: 'https://discord.gg' },
  { text: 'twitter', href: 'https://twitter.com' },
  { text: 'medium', href: 'https://medium.com' },
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
              {subpages.map((subpage) => {
                const isCurrentSubpage = router.pathname === subpage.href
                const color = isCurrentSubpage ? 'primary' : 'inherit'
                return (
                  <Typography variant="button" key={subpage.text} color={color}>
                    <Link color="inherit" href={subpage.href} underline="hover">
                      {translate(subpage.text)}
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
                      {social.text}
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
