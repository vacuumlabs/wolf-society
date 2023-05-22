import {
  IconButton as MuiIconButton,
  IconButtonProps,
  styled,
} from '@mui/material'
import { HTMLAttributeAnchorTarget } from 'react'

const IconButton = styled(MuiIconButton)<
  IconButtonProps & {
    component?: string
    target?: HTMLAttributeAnchorTarget
    color?: 'black' | 'neutral'
  }
>(({ theme, color = 'black' }) => ({
  padding: 12,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 0,
  boxShadow: `0 0 0 2px ${theme.palette[color].main} inset`,
  color: theme.palette[color].main,
  transition:
    'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',

  '&:focus': {
    backgroundColor: 'transparent',
    boxShadow: `0 0 0 4px ${theme.palette[color].main} inset`,
  },
  '&:hover': {
    backgroundColor: theme.palette[color].main,
    color: theme.palette.neutral['200'],
  },
  '&:active': {
    backgroundColor: theme.palette[color].main,
    color: theme.palette.neutral['200'],
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.neutral['500'],
    color: 'white',
  },
}))

export default IconButton
