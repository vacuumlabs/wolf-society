import {
  BreakpointOverrides,
  Card,
  CardMedia,
  Typography,
  Box,
  Theme,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export type ArtistCardProps = {
  name?: string
  imageUrl?: string
  text?: string
  color: string
  translucent: boolean
}

const ArtistCard = ({
  name,
  imageUrl,
  text,
  color,
  translucent,
}: ArtistCardProps) => {
  const nameRef = useRef<HTMLElement>(null)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  )
  const [nameHeight, setNameHeight] = useState(0)

  const lastName = name?.substring(name?.lastIndexOf(' '))
  const firstName = name?.substring(0, name?.lastIndexOf(' '))

  useEffect(() => {
    setNameHeight(nameRef.current?.clientHeight ?? 0)
  }, [name, nameRef])

  return isMobile ? null : (
    <Box
      sx={{
        position: 'relative',
        opacity: translucent ? 0.2 : 1,
        transition: 'opacity 0.25s',
      }}
    >
      <Card
        sx={{
          bgcolor: 'neutral.main',
          width: '100%',
          '&.MuiPaper-root': {
            maxHeight: 'calc(100vh - 80px)',
          },
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            sx={{
              width: '100%',
              height: '100%',
            }}
            style={{
              maxHeight: `calc(100vh - 80px - ${nameHeight}px)`,
            }}
            alt="Artist image"
          />
        </Box>
        <Typography
          ref={nameRef}
          variant="headline"
          color={color}
          sx={{
            p: 4,
            pt: { mobile: 8, [breakpoint]: 11 },
            textAlign: 'start',
          }}
        >
          {firstName}
          {firstName && firstName.length > 0 && <br />}
          {lastName}
        </Typography>
      </Card>
      <Typography
        variant="handwritingLarge"
        sx={{
          position: { mobile: 'relative', [breakpoint]: 'absolute' },
          top: '50%',
          maxWidth: {
            mobile: '100%',
            [breakpoint]: '416px',
            desktopM: '446px',
          },
          transform: {
            mobile: 'rotate(-3.66deg)',
            [breakpoint]: 'translate(-50%, 0%) rotate(-3.66deg)',
          },
          pb: { mobile: 5, [breakpoint]: 0 },
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
export default ArtistCard
