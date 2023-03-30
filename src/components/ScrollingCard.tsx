import { Grid, Theme, useMediaQuery } from '@mui/material'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

export type Props = {
  index: number
}

const MAX_OFFSET_COLUMNS = 2

const ScrollingCard = ({ index, children }: PropsWithChildren<Props>) => {
  const [offset, setOffset] = useState(0)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )
  useEffect(() => {
    setOffset(Math.floor(Math.random() * (MAX_OFFSET_COLUMNS + 1)))
  }, [])

  return isMobile ? (
    <>{children}</>
  ) : (
    <Grid container>
      {index % 2 == 0 ? (
        <Grid item mobile={6 + offset}></Grid>
      ) : (
        MAX_OFFSET_COLUMNS - offset > 0 && (
          <Grid item mobile={MAX_OFFSET_COLUMNS - offset}></Grid>
        )
      )}
      <Grid item mobile={4}>
        <Parallax speed={100} translateY={[0, 0]}>
          {children}
        </Parallax>
      </Grid>
      {index % 2 == 1 ? (
        <Grid item mobile={6 + offset}></Grid>
      ) : (
        MAX_OFFSET_COLUMNS - offset > 0 && (
          <Grid item mobile={MAX_OFFSET_COLUMNS - offset}></Grid>
        )
      )}
    </Grid>
  )
}
export default ScrollingCard
