import { Box, BoxProps, styled } from '@mui/material'

const FakeButton = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.primary.contrastText,
  height: '48px',
  [theme.breakpoints.up('desktopM')]: {
    height: '56px',
  },

  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.primary['400'],
  },

  '&:hover': {
    backgroundColor: theme.palette.primary['400'],
  },

  '&:active': {
    backgroundColor: theme.palette.primary['600'],
    boxShadow: 'none',
  },
}))

export default FakeButton

