import { Box, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import DrawerTextList from '../landing/DrawerTextList'

export interface NFTUsageProps {
  lists: ListProps[]
}

interface ListProps {
  caption: string
  description: string
  texts: string[]
}

export const NFTUsage = ({ lists }: NFTUsageProps) => {
  const breakpoint = 'tabletM'
  const List = ({ caption, description, texts }: ListProps) => {
    return (
      <Stack width={{ mobile: '100%', [breakpoint]: '50%' }}>
        <Typography variant="caption" mb="8px">
          {caption}
        </Typography>
        <Typography variant="body2" mb="40px">
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
        width: { mobile: '100vw', tabletM: '80vw' },
        backgroundColor: 'neutral.400',
        gap: '120px',
        overflowY: 'auto',
      }}
      p={{ mobile: '16px', tabletM: '80px' }}
      direction={{ mobile: 'column', [breakpoint]: 'row' }}
    >
      {lists.map((list, index) => (
        <List key={index} {...list} />
      ))}
    </Stack>
  )
}
