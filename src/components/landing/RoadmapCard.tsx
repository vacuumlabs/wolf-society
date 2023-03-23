import { Card, Divider, Grid, Stack, Typography } from '@mui/material'
import WSFSymbol from '../icons/WSFSymbol'

export type RoadmapCardProps = {
  quarter: string
  year: string
  items: string[]
  color: string
}

const RoadmapCard = ({ quarter, year, items, color }: RoadmapCardProps) => {
  return (
    <Card sx={{ width: '100%' }}>
      <Grid
        container
        sx={{
          bgcolor: color,
          textAlign: 'start',
        }}
      >
        <Grid item mobile={12} tabletS={5}>
          <Stack
            justifyContent="space-between"
            height="100%"
            sx={{
              p: { mobile: 5, desktopM: 10 },
            }}
          >
            <Stack>
              <Typography variant="h2" color="neutral.main">
                {quarter}
              </Typography>
              <Typography variant="h2" color="neutral.main">
                {year}
              </Typography>
            </Stack>
            <WSFSymbol
              color="neutral"
              sx={{
                fontSize: '35px',
                display: { mobile: 'none', tabletS: 'inline-block' },
              }}
            />
          </Stack>
        </Grid>
        <Grid item mobile={12} tabletS={7}>
          <Stack
            divider={<Divider />}
            sx={{
              padding: { mobile: 5, desktopM: 10 },
              pl: { mobile: 5, desktopM: 0 },
            }}
          >
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
    </Card>
  )
}
export default RoadmapCard
