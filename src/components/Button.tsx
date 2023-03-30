import { Button as MuiButton, ButtonProps, styled } from '@mui/material'
import { HTMLAttributeAnchorTarget } from 'react'

const Button = styled(MuiButton)<
  ButtonProps & {
    component?: string
    target?: HTMLAttributeAnchorTarget
    iconatend?: number
  }
>(({ theme, iconatend }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  color: theme.palette.primary.contrastText,
  height: '48px',
  paddingLeft: '24px',
  paddingRight: '24px',
  [theme.breakpoints.up('desktopM')]: {
    height: '56px',
    paddingLeft: '32px',
    paddingRight: '32px',
  },

  '&:focus': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 0 5px ${theme.palette.primary['200']} inset`,
  },

  '&:hover': {
    backgroundColor: theme.palette.primary['400'],
  },

  '&:active': {
    backgroundColor: theme.palette.primary['600'],
    boxShadow: 'none',
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.neutral['500'],
    color: 'white',
  },

  '&.MuiButton-outlined': {
    backgroundColor: 'transparent',
    border: 'none',
    color: theme.palette.black.main,
    boxShadow: `0 0 0 2px ${theme.palette.black.main} inset`,
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      color: theme.palette.neutral['400'],
      boxShadow: `0 0 0 2px ${theme.palette.neutral['400']} inset`,
    },
  },

  '&.MuiButton-outlined:focus': {
    backgroundColor: 'transparent',
    boxShadow: `0 0 0 4px ${theme.palette.black.main} inset`,
    color: theme.palette.black.main,
  },

  '&.MuiButton-outlined:hover': {
    backgroundColor: theme.palette.black.main,
    color: theme.palette.neutral['400'],
  },

  '&.MuiButton-outlined:active': {
    backgroundColor: theme.palette.black.main,
    color: theme.palette.neutral['400'],
  },

  '& .MuiButton-endIcon': {
    marginRight: iconatend ? 'auto' : '-16px',
    position: iconatend ? 'absolute' : 'relative',
    right: iconatend == 1 ? '16px' : 'auto',
    left: iconatend == -1 ? '16px' : 'auto',
  },
}))

export default Button
