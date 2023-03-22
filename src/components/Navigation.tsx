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
} from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  ContentTypes,
  Content,
  useContentful,
} from '@/utils/hooks/useContentful'
import MenuIcon from './icons/MenuIcon'
import { useRouter } from 'next/router'
import WSLogo from './icons/WSLogo'

export const subpages: {
  text: keyof Content[ContentTypes.navbar]
  href: string
}[] = [
  { text: 'about', href: '/' },
  { text: 'collections', href: '/support' },
  { text: 'blog', href: '/blog' },
]

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const router = useRouter()

  const translate = useContentful(ContentTypes.navbar)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <AppBar
      color="transparent"
      position="absolute"
      style={{ boxShadow: 'none' }}
      sx={(theme) => ({ fontSize: theme.typography.button.fontSize, py: 2 })}
    >
      <Container>
        <Toolbar sx={{ p: 0 }}>
          <Link href="/" display="flex">
            <WSLogo color="black" />
          </Link>
          <Stack
            direction="row"
            justifyContent="center"
            gap={4}
            sx={{
              display: { mobile: 'none', tabletM: 'flex' },
              flexGrow: 1,
            }}
          >
            {subpages.map((subpage) => {
              const isCurrentSubpage = router.pathname === subpage.href
              const color = isCurrentSubpage ? 'primary' : 'black.main'
              return (
                <Typography variant="button" key={subpage.text} color={color}>
                  <Link color="inherit" href={subpage.href} underline="hover">
                    {translate(subpage.text)}
                  </Link>
                </Typography>
              )
            })}
          </Stack>
          <Box
            sx={{
              display: { mobile: 'none', tabletM: 'flex' },
            }}
          >
            <ConnectButton />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              display: { mobile: 'flex', tabletM: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              {subpages.map((subpage) => (
                <Link href={subpage.href} key={subpage.text} underline="hover">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {translate(subpage.text)}
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
