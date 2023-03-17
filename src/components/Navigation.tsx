import React from 'react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Translations, useTranslations } from '@/utils/hooks/useTranslations'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'

const subpages: { text: keyof Translations; href: string }[] = [
  { text: 'donate', href: '/' },
  { text: 'support', href: '/support' },
  { text: 'blog', href: '/blog' },
]

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const router = useRouter()

  const t = useTranslations()
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
      <Toolbar>
        <Typography variant="h6">{t('wolfSocietyFoundation')}</Typography>
        <Stack
          direction="row"
          justifyContent="center"
          gap={2}
          sx={{
            display: { mobile: 'none', tablet: 'flex' },
            flexGrow: 1,
          }}
        >
          {subpages.map((subpage) => {
            const isCurrentSubpage = router.pathname === subpage.href
            const color = isCurrentSubpage ? 'primary' : 'inherit'
            return (
              <Button key={subpage.text} href={subpage.href} color={color}>
                {t(subpage.text)}
              </Button>
            )
          })}
        </Stack>
        <Box
          sx={{
            display: { mobile: 'none', tablet: 'flex' },
          }}
        >
          <ConnectButton />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'end',
            display: { mobile: 'flex', tablet: 'none' },
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
              display: { mobile: 'block', tablet: 'none' },
            }}
          >
            {subpages.map((subpage) => (
              <MenuItem key={subpage.text} onClick={handleCloseNavMenu}>
                <Link textAlign="center" href={subpage.href} underline="none">
                  {t(subpage.text)}
                </Link>
              </MenuItem>
            ))}
            <MenuItem key="connectWalletButton" onClick={handleCloseNavMenu}>
              <ConnectButton />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
