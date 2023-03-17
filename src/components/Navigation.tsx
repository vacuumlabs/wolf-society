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
  { text: 'blog', href: '/blog' },
  { text: 'support', href: '/support' },
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
    >
      <Toolbar>
        <Typography variant="h6">{t('wolfSocietyFoundation')}</Typography>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            display: { xs: 'none', sm: 'flex' },
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
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <ConnectButton />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'end',
            display: { xs: 'flex', sm: 'none' },
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
              display: { xs: 'block', md: 'none' },
            }}
          >
            {subpages.map((subpage) => (
              <MenuItem key={subpage.text} onClick={handleCloseNavMenu}>
                <Link textAlign="center" href={subpage.href} underline="none">
                  {t(subpage.text)}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
