import { Button as MuiButton, ButtonProps, styled } from '@mui/material'

const Button = styled(MuiButton)<ButtonProps & { component?: string }>(
  ({ theme }) => ({
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
    },

    '&.MuiButton-outlined:hover': {
      backgroundColor: 'rgba(30, 30, 30, 0.1)',
      color: theme.palette.black.main,
    },

    '&.MuiButton-outlined:active': {
      backgroundColor: theme.palette.black.main,
      color: theme.palette.neutral['400'],
    },
  })
)

export default Button
