import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Support from './Support'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslations } from '@/utils/hooks/useTranslations'

const Navigation = () => {
  const t = useTranslations()
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {t('wolfSocietyFoundation')}
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
