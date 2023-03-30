import React from 'react'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import MenuIcon from './icons/MenuIcon'
import { useRouter } from 'next/router'
import WSLogo from './icons/WSLogo'
import { SUBPAGES } from '@/consts'
import { getSubpagesKeys } from '@/utils/helpers'
import CloseIcon from './icons/CloseIcon'
import Button from './Button'
import { LaunchAppButton } from './LaunchAppButton'

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const router = useRouter()
  const trigger = useScrollTrigger({ disableHysteresis: true })

  const translate = useContentful(ContentTypes.navbar)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
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
              onClick={handleOpenNavMenu}
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Mobile hamburger menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { mobile: 'block', tabletM: 'none' },
              }}
            >
              {getSubpagesKeys().map((subpageKey) => (
                <Link
                  href={SUBPAGES[subpageKey]}
                  key={subpageKey}
                  underline="hover"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {translate(subpageKey)}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              <MenuItem key="connectWalletButton" onClick={handleCloseNavMenu}>
                <ConnectButton />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation
