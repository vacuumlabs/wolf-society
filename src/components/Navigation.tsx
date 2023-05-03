import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import {
  Content,
  ContentTypes,
  useContentful,
} from '@/utils/hooks/useContentful'
import Link from './Link'
import MenuIcon from './icons/MenuIcon'
import { useRouter } from 'next/router'
import WSLogo from './icons/WSLogo'
import { SUBPAGES } from '@/consts'
import { getSubpagesKeys } from '@/utils/helpers'
import CloseIcon from './icons/CloseIcon'
import Button from './Button'
import { LaunchAppButton } from './LaunchAppButton'
import WSFSymbol from './icons/WSFSymbol'
import { useAccount } from 'wagmi'

type NavbarLinkProps = {
  subpageKey: keyof Partial<Content[ContentTypes.navbar]>
  href?: string
  label: string
}

const NavbarLink = ({ subpageKey, href, label }: NavbarLinkProps) => {
  const router = useRouter()
  const isCurrentSubpage = router.pathname === SUBPAGES[subpageKey]
  const color = isCurrentSubpage ? 'primary' : 'black.main'
  return (
    <Typography variant="button" key={subpageKey} color={color}>
      <Link
        color="inherit"
        href={href}
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
        {label}
      </Link>
    </Typography>
  )
}

const Navigation = () => {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const router = useRouter()
  const trigger = useScrollTrigger({ disableHysteresis: true })
  const { isConnected } = useAccount()
  const [showAccountLink, setShowAccountLink] = useState<boolean>(false)

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
  const currentPage = getSubpagesKeys().filter(
    (key) => SUBPAGES[key] === router.pathname
  )[0]

  //to prevent hydratation error
  useEffect(() => {
    setShowAccountLink(isConnected)
  }, [isConnected])

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
              width: { mobile: 'auto', desktopS: 'fit-content' },
              position: { mobile: 'relative', desktopS: 'absolute' },
              left: { mobile: '0', desktopS: '50%' },
              transform: { mobile: 'none', desktopS: 'translate(-50%, 0)' },
            }}
          >
            {getSubpagesKeys()
              .filter((key) => key !== 'account')
              .map((subpageKey) => {
                return (
                  <NavbarLink
                    key={subpageKey}
                    subpageKey={subpageKey}
                    label={translate(subpageKey)}
                    href={SUBPAGES[subpageKey]}
                  />
                )
              })}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            gap={2}
            sx={{
              display: { mobile: 'none', tabletM: 'flex' },
            }}
          >
            {showAccountLink && (
              <Stack
                height="fit-content"
                justifyContent="center"
                direction="row"
                my="auto"
              >
                <NavbarLink
                  subpageKey="account"
                  label={translate('account')}
                  href={SUBPAGES['account']}
                />
              </Stack>
            )}
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
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              display: { mobile: 'flex', tabletM: 'none' },
            }}
          >
            <Typography variant="button">{translate(currentPage)}</Typography>

            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
      {/* Mobile menu */}
      <Drawer
        id="menu-appbar"
        anchor="right"
        open={drawerOpened}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiPaper-root': {
            width: '100vw',
            bgcolor: 'neutral.600',
          },
        }}
      >
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
                {getSubpagesKeys()
                  .filter((key) => showAccountLink || key !== 'account')
                  .map((subpageKey) => {
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
      </Drawer>
    </AppBar>
  )
}

export default Navigation
