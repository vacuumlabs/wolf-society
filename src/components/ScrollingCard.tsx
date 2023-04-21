import { Grid, Theme, useMediaQuery } from '@mui/material'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

export type Props = {
  index: number
}

const OFFSETS = [8, 0, 6]

const ScrollingCard = ({ index, children }: PropsWithChildren<Props>) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const offset = OFFSETS[index % 3]
  const marginTop =
    index % 3 !== 0 ? -21 : { mobile: 10, desktopS: 20, desktopM: 30 }

  return isMobile ? (
    <>{children}</>
  ) : (
    <Grid container mt={marginTop}>
      {offset > 0 && <Grid item mobile={offset}></Grid>}
      <Grid item mobile={4}>
        <Parallax speed={100} translateY={[0, 0]}>
          {children}
        </Parallax>
      </Grid>
      {8 - offset > 0 && <Grid item mobile={8 - offset}></Grid>}
    </Grid>
  )
}
export default ScrollingCard
