import React from 'react'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import AppearingComponent from '../AppearingComponent'
import PresaleCard from './PresaleCard'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'

const PresaleGrid = ({}) => {
  const gridItems = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur']
  const translate = useContentful(ContentTypes.presalePage)

  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <AppearingComponent>
        <Container
          sx={{
            mt: { mobile: 5, desktopS: 10 },
            mb: { mobile: 10, desktopS: 20 },
          }}
        >
          <Stack spacing={5}>
            <Typography variant="title">{translate('gridTitle')}</Typography>
            <Box>
              <Grid container>
                {gridItems.map((item) => (
                  <Grid item key={item} mobile={12} tabletS={6} desktopS={4}>
                    <PresaleCard />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </AppearingComponent>
    </Box>
  )
}

export default PresaleGrid
