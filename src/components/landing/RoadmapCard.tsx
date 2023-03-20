import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material'

export type RoadmapCardProps = {
  quarter: string
  year: string
  items: string[]
  color: string
}

const RoadmapCard = ({ quarter, year, items, color }: RoadmapCardProps) => {
  return (
    <Card sx={{ width: '100%' }}>
      <Box
        sx={{
          bgcolor: color,
          p: { mobile: 5, desktopM: 10 },
          textAlign: 'start',
        }}
      >
        <Grid container>
          <Grid item mobile={12} tabletS={5}>
            <Stack>
              <Typography variant="h2" color="neutral.main">
                {quarter}
              </Typography>
              <Typography variant="h2" color="neutral.main">
                {year}
              </Typography>
            </Stack>
          </Grid>
          <Grid item mobile={12} tabletS={7}>
            <Stack divider={<Divider />}>
              {items.map((item, index) => (
                <Typography
                  key={`${quarter}-${year}-${index}`}
                  variant="body2"
                  color="neutral.main"
                  py={3}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
export default RoadmapCard
