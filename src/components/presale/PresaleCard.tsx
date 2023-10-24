import React from 'react'
import {
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'

const PresaleCard = ({}) => {
  const breakpoint: keyof BreakpointOverrides = 'desktopS'

  return (
    <Card
      sx={{
        bgcolor: 'neutral.main',
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        '& .MuiCardContent-root': {
          mobile: {},
          [breakpoint]: { translate: '0 0' },
        },
      }}
    >
        <CardActionArea
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardContent
            sx={{
              p: 0,
              width: '100%',
              display: { mobile: 'flex', [breakpoint]: 'block' },
              flexDirection: 'column',
            }}
          >
            <Stack
              sx={{
                textAlign: 'start',
                p: 4,
                pt: 3,
                height: { mobile: 'auto', [breakpoint]: '100%' },
                flexGrow: 1,
              }}
              gap={3}
              justifyContent="space-between"
            >
              <Typography variant="caption" color="black">
                {'Lorem ipsum dolor sit amet'}
              </Typography>
              <Typography variant="body2S" color="black">
                {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem consectetur elit amer dolor. Quisquam, voluptatum. '}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default PresaleCard
