import ShareIcon from '@mui/icons-material/Share'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import {
  Box,
  BoxProps,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Button from '../Button'

type ShareButtonProps = BoxProps & {
  variant?: 'orange' | 'transparent'
}

export const ShareButton = ({
  variant = 'transparent',
  ...props
}: ShareButtonProps) => {
  const socialMedias: string[] = ['twitter', 'facebook', 'messenger', 'e-mail']
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      setIsOpen(false)
    }
    window.addEventListener('scroll', handler)
    window.addEventListener('wheel', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('wheel', handler)
    }
  }, [])
  return (
    <Box {...props}>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            {variant === 'transparent' ? (
              <IconButton
                {...bindTrigger(popupState)}
                onClick={(e) => {
                  bindTrigger(popupState).onClick(e)
                  setIsOpen(true)
                }}
              >
                <ShareIcon />
              </IconButton>
            ) : (
              <Button
                component="div"
                isiconbutton={1}
                {...bindTrigger(popupState)}
                onClick={(e) => {
                  bindTrigger(popupState).onClick(e)
                  setIsOpen(true)
                  e.stopPropagation()
                }}
              >
                <ShareIcon />
              </Button>
            )}
            <Menu
              {...bindMenu(popupState)}
              open={isOpen}
              onClose={() => {
                setIsOpen(false)
              }}
              disableScrollLock={true}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 0,
                  backgroundColor: 'transparent',
                },
                '& .MuiList-root': {
                  p: 0,
                },
              }}
              anchorOrigin={{
                horizontal: 'right',
                vertical: isMobile ? 'bottom' : 'top',
              }}
            >
              {socialMedias.map((sm, index) => (
                <MenuItem
                  key={sm}
                  onClick={(e) => {
                    popupState.close()
                    setIsOpen(false)
                    e.stopPropagation()
                  }}
                  sx={{
                    mt: index === 0 ? 0 : '1px',

                    backgroundColor: 'neutral.600',
                    '&:hover': {
                      backgroundColor: 'black.main',
                      '& .MuiTypography-root': {
                        color: 'neutral.200',
                      },
                    },
                  }}
                >
                  <Typography variant="button">{sm}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </PopupState>
    </Box>
  )
}
