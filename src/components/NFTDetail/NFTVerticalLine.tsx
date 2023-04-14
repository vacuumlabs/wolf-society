import { Box, Theme, useMediaQuery } from '@mui/material'

export const VerticalLine = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  return isMobile ? null : (
    <Box
      sx={{
        pl: '-1px',
        width: '1px',
        padding: 0,
        margin: 0,
        height: '100vh',
        backgroundColor: 'neutral.400',
      }}
    >
      <Box
        sx={{
          pl: '-1px',
          width: '1px',
          height: 'calc(100% - 160px)',
          marginY: '80px',
          backgroundColor: 'neutral.600',
        }}
      />
    </Box>
  )
}
