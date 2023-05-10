import {
  Box,
  BreakpointOverrides,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import DrawerTextList from '../landing/DrawerTextList'
import { Fragment } from 'react'
import { NFTDividerLine } from './NFTDividerLine'

export interface NFTUsageProps {
  lists: ListProps[]
}

interface ListProps {
  caption: string
  description: string
  texts: string[]
}

export const NFTUsage = ({ lists }: NFTUsageProps) => {
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const List = ({ caption, description, texts }: ListProps) => {
    return (
      <Stack width={{ mobile: '100%', [breakpoint]: '50%' }}>
        <Typography variant="caption" mb={1}>
          {caption}
        </Typography>
        <Typography variant="body2" mb={{ mobile: -1, [breakpoint]: 1 }}>
          {description}
        </Typography>
        <Box pl="24px">
          <DrawerTextList texts={texts} />
        </Box>
      </Stack>
    )
  }
  return (
    <Stack
      sx={{
        width: { mobile: '100vw', [breakpoint]: '80vw' },
        backgroundColor: 'neutral.400',
        gap: { mobile: 5, [breakpoint]: 17 },
        overflowY: 'auto',
        paddingY: { mobile: 5, [breakpoint]: 10 },
        paddingX: { mobile: 2, [breakpoint]: 10 },
      }}
      direction={{ mobile: 'column', [breakpoint]: 'row' }}
    >
      {lists.map((list, index) => (
        <List key={index} {...list} />
      ))}
    </Stack>
  )
}
