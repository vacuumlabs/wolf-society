import * as React from 'react'
import ShareIcon from '@mui/icons-material/Share'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Box, BoxProps, Button, IconButton, Typography } from '@mui/material'
import dynamic from 'next/dynamic'

export type Edge = 'r' | 'l' | 't' | 'b'
type ShareButtonProps = BoxProps & { removeEdges?: Set<Edge> }

export const ShareButton = ({ removeEdges, ...props }: ShareButtonProps) => {
  const socialMedias: string[] = ['twitter', 'facebook', 'messenger', 'e-mail']
  return (
    <Box {...props}>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <IconButton
              {...bindTrigger(popupState)}
              sx={{
                mt: removeEdges?.has('t') ? '-2px' : 0,
                mr: removeEdges?.has('r') ? '-2px' : 0,
                mb: removeEdges?.has('b') ? '-2px' : 0,
                ml: removeEdges?.has('l') ? '-2px' : 0,
              }}
            >
              <ShareIcon />
            </IconButton>
            <Menu
              {...bindMenu(popupState)}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 0,
                  backgroundColor: 'transparent',
                },
                '& .MuiList-root': {
                  p: 0,
                },
              }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              {socialMedias.map((sm, index) => (
                <MenuItem
                  key={sm}
                  onClick={popupState.close}
                  sx={{
                    mt: index === 0 ? 0 : '1px',

                    backgroundColor: 'neutral.600',
                    '&:hover': {
                      backgroundColor: '#000',
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
