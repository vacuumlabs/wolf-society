import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import MenuIcon from './icons/MenuIcon'
import { useRouter } from 'next/router'
import WSLogo from './icons/WSLogo'
import { SUBPAGES } from '@/consts'
import { getSubpagesKeys } from '@/utils/helpers'
import CloseIcon from './icons/CloseIcon'
import Button from './Button'
import { LaunchAppButton } from './LaunchAppButton'
import WSFSymbol from './icons/WSFSymbol'

const Navigation = () => {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const router = useRouter()
  const trigger = useScrollTrigger({ disableHysteresis: true })

  const translate = useContentful(ContentTypes.navbar)
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setDrawerOpened(open)
    }
  return (
    <AppBar
      color="neutral"
      style={{ boxShadow: 'none' }}
      sx={(theme) => ({
        fontSize: theme.typography.button.fontSize,
        py: 2,
        bgcolor: 'neutral.400',
      })}
    >
      <Container>
        <Toolbar
          sx={{ p: 0, justifyContent: 'space-between', minHeight: '48px' }}
        >
          <Link href="/" display="flex">
            <WSLogo color="black" />
          </Link>
          <Stack
            direction="row"
            justifyContent="center"
            gap={4}
            sx={{
              display: { mobile: 'none', tabletM: 'flex' },
              width: '100%',
              position: 'absolute',
            }}
          >
            {getSubpagesKeys().map((subpageKey) => {
              const isCurrentSubpage = router.pathname === SUBPAGES[subpageKey]
              const color = isCurrentSubpage ? 'primary' : 'black.main'
              return (
                <Typography variant="button" key={subpageKey} color={color}>
                  <Link
                    color="inherit"
                    href={SUBPAGES[subpageKey]}
                    underline="hover"
                    sx={(theme) => ({
                      // Button S for M breakpoint
                      [theme.breakpoints.down('desktopL')]: {
                        fontSize: '16px',
                        lineHeight: '24px',
                      },
                      // Button M for L breakpoint
                      [theme.breakpoints.up('desktopL')]: {
                        fontSize: '20px',
                        lineHeight: '24px',
                      },
                    })}
                  >
                    {translate(subpageKey)}
                  </Link>
                </Typography>
              )
            })}
          </Stack>
          <Stack
            direction="row"
            gap={2}
            sx={{
              display: { mobile: 'none', tabletM: 'flex' },
            }}
          >
            <LaunchAppButton />
            {trigger && (
              <Button
                style={{ height: '48px', padding: '12px 24px' }}
                href={SUBPAGES['collections']}
                sx={(theme) => ({
                  // Button S for M breakpoint
                  [theme.breakpoints.down('desktopL')]: {
                    fontSize: '16px',
                    lineHeight: '24px',
                  },
                  // Button M for L breakpoint
                  [theme.breakpoints.up('desktopL')]: {
                    fontSize: '20px',
                    lineHeight: '24px',
                  },
                })}
              >
                {translate('makeImpact')}
              </Button>
            )}
          </Stack>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              display: { mobile: 'flex', tabletM: 'none' },
            }}
          >
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile menu */}
            <Drawer
              id="menu-appbar"
              anchor="right"
              open={drawerOpened}
              onClose={toggleDrawer(false)}
            >
              <Box width="100vw" height="100vh" bgcolor="neutral.600">
                <Container sx={{ height: '100%' }}>
                  <Stack height="100%" py={2}>
                    <Stack sx={{ alignSelf: 'end' }}>
                      <IconButton
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={toggleDrawer(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                    <Stack
                      flexGrow={1}
                      alignItems="center"
                      justifyContent="center"
                      gap={5}
                    >
                      <WSFSymbol />
                      <Stack gap={4}>
                        {getSubpagesKeys().map((subpageKey) => {
                          const isCurrentSubpage =
                            router.pathname === SUBPAGES[subpageKey]
                          return (
                            <Typography
                              key={subpageKey}
                              textAlign="center"
                              variant="display"
                              component="p"
                              color="black"
                              sx={{
                                textDecoration: isCurrentSubpage
                                  ? 'line-through'
                                  : '',
                              }}
                            >
                              <Link
                                href={SUBPAGES[subpageKey]}
                                underline="hover"
                                color="inherit"
                              >
                                {translate(subpageKey)}
                              </Link>
                            </Typography>
                          )
                        })}
                      </Stack>
                    </Stack>
                    <Stack gap={2}>
                      <LaunchAppButton />
                      <Button href={SUBPAGES['collections']}>
                        {translate('makeImpact')}
                      </Button>
                    </Stack>
                  </Stack>
                </Container>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation
