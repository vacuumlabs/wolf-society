import { Button as MuiButton, ButtonProps, styled } from '@mui/material'

const Button = styled(MuiButton)<ButtonProps & { component?: string }>(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    height: '56px',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary['400'],
      boxShadow: 'none',
    },

    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: `0 0 0 5px ${theme.palette.primary['200']} inset`,
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

    '&.MuiButton-outlined:hover': {
      backgroundColor: 'rgba(30, 30, 30, 0.1)',
      color: theme.palette.black.main,
    },

    '&.MuiButton-outlined:focus': {
      backgroundColor: 'transparent',
      boxShadow: `0 0 0 4px ${theme.palette.black.main} inset`,
    },

    '&.MuiButton-outlined:active': {
      backgroundColor: theme.palette.black.main,
      color: theme.palette.neutral['400'],
    },
  })
)

export default Button
