import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { useTranslations } from '@/utils/hooks/useTranslations'

const Support = () => {
  const t = useTranslations()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)

  return (
    <>
      <Button onClick={handleClick}>{t('support')}</Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Discord</MenuItem>
      </Menu>
    </>
  )
}

export default Support
