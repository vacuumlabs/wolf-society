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
import NextLink from 'next/link'

type NavbarLinkProps = {
  subpageKey: keyof Pick<
    Content[ContentTypes.navbar],
    'about' | 'collections' | 'blog' | 'faq' | 'account' | 'presale'
  >
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

const NavbarLinksStack = () => {
  const translate = useContentful(ContentTypes.navbar)
  return (
    <Stack direction="row" justifyContent="center" gap={4}>
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
  )
}

const Navigation = () => {
  const [drawerOpened, setDrawerOpened] = useState(false)
  const router = useRouter()
  const trigger = useScrollTrigger({ disableHysteresis: true })
  const { isConnected } = useAccount()
  const [showAccountLink, setShowAccountLink] = useState<boolean>(false)

  const translate = useContentful(ContentTypes.navbar)
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
          <Stack
            direction="row"
            alignItems="center"
            gap={{ tabletM: 1.5, desktopS: 3 }}
          >
            <Link href="/" display="flex">
              <WSLogo color="black" />
            </Link>
            <Box
              sx={{
                display: { mobile: 'none', desktopS: 'flex', desktopM: 'none' },
              }}
            >
              <NavbarLinksStack />
            </Box>
          </Stack>
          <Box
            sx={{
              display: { mobile: 'none', desktopM: 'flex' },
              width: 'fit-content',
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
          >
            <NavbarLinksStack />
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            gap={2}
            sx={{
              display: { mobile: 'none', desktopS: 'flex' },
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
                  href={SUBPAGES.account}
                />
              </Stack>
            )}
            <LaunchAppButton />
            {trigger &&
              !isConnected &&
              router.pathname !== SUBPAGES.collections && (
                <NextLink
                  href={SUBPAGES.collections}
                  passHref
                  style={{ lineHeight: 0 }}
                >
                  <Button
                    style={{ height: '48px', padding: '12px 24px' }}
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
                </NextLink>
              )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              display: { mobile: 'flex', desktopS: 'none' },
            }}
          >
            <Typography variant="button">{translate(currentPage)}</Typography>

            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setDrawerOpened(true)}
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
        onClose={() => setDrawerOpened(false)}
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
                onClick={() => setDrawerOpened(false)}
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
                          onClick={() => setDrawerOpened(false)}
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
              <NextLink
                href={SUBPAGES.collections}
                passHref
                style={{ lineHeight: 0 }}
                onClick={() => setDrawerOpened(false)}
              >
                <Button fullWidth>{translate('makeImpact')}</Button>
              </NextLink>
            </Stack>
          </Stack>
        </Container>
      </Drawer>
    </AppBar>
  )
}

export default Navigation
