import { Box, CardMedia, Theme, Typography, useMediaQuery } from '@mui/material'

type ArtistCardMobileProps = {
  artistName: string
  artistImage: string
}

export const ArtistCardMobile = ({
  artistName,
  artistImage,
}: ArtistCardMobileProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )

  return isMobile ? (
    <Box>
      <CardMedia
        component="img"
        image={artistImage}
        sx={{ width: '100%', height: '100%', maxWidth: '35%', mx: 'auto' }}
        alt="Project image"
      />
      <Typography
        variant="headline"
        color="neutral.600"
        sx={{ mt: '24px', mb: '32px' }}
      >
        {artistName}
      </Typography>
    </Box>
  ) : null
}
