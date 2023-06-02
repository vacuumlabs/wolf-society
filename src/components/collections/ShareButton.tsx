import ShareIcon from '../icons/ShareIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Box, BoxProps, Theme, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import Button from '../Button'
import {
  ShareableContent,
  SocialMedia,
  shareContentOnSocialMedia,
  socialMediaListData,
} from '@/utils/sharing'
import IconButton from '../IconButton'

type ShareButtonProps = BoxProps & {
  shareableContent: ShareableContent
  variant?: 'primary' | 'outlined'
  color?: 'neutral' | 'black'
}

export const ShareButton = ({
  variant = 'outlined',
  color = 'black',
  shareableContent,
  ...props
}: ShareButtonProps) => {
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
    <Box {...props} display="flex">
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            {variant === 'outlined' ? (
              <IconButton
                color={color}
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
            {popupState.anchorEl && (
              <Menu
                {...bindMenu(popupState)}
                open={isOpen}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onClose={(e) => {
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
                {Object.keys(socialMediaListData).map(
                  (socialMediaKey, index) => (
                    <MenuItem
                      key={socialMediaKey}
                      onClick={(e) => {
                        popupState.close()
                        setIsOpen(false)
                        shareContentOnSocialMedia(
                          shareableContent,
                          socialMediaKey as SocialMedia
                        )
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
                        '&:focus': {
                          backgroundColor: 'black.main',
                          '& .MuiTypography-root': {
                            color: 'neutral.200',
                          },
                        },
                      }}
                    >
                      <Typography variant="button">{socialMediaKey}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            )}
          </>
        )}
      </PopupState>
    </Box>
  )
}
