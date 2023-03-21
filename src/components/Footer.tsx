import { useTranslations } from '@/utils/hooks/useTranslations'
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
import logoImage from 'public/images/Logo.svg'
import { subpages } from './Navigation'

const socials: { text: string; href: string }[] = [
  { text: 'discord', href: 'https://discord.gg' },
  { text: 'twitter', href: 'https://twitter.com' },
  { text: 'medium', href: 'https://medium.com' },
]

const Footer = () => {
  const t = useTranslations()
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
              <Image src={logoImage} alt="Logo" height="48" />
              <Typography
                variant="button"
                display={{ mobile: 'none', [breakpoint]: 'inherit' }}
              >
                MAKE-IMPACT@wolfsociety.com
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
                  <Link
                    variant="button"
                    href={subpage.href}
                    key={subpage.text}
                    color={color}
                  >
                    {t(subpage.text)}
                  </Link>
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
                  <Link
                    variant="button"
                    href={social.href}
                    key={social.text}
                    color="inherit"
                    target="_blank"
                  >
                    {social.text}
                  </Link>
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
