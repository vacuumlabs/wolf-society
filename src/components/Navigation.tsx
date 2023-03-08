import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Support from './Support'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navigation = () => {
  const { t } = useTranslation()
  return (
    <AppBar color="transparent" position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Wolf Society Foundation
        </Typography>
        <Button href="/">{t('donate')}</Button>
        <Button href="/blog">{t('blog')}</Button>
        <Support />
        <ConnectButton />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
