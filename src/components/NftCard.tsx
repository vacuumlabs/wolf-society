import { Card, CardMedia, Paper, Stack, Typography } from '@mui/material'
import { Nft } from 'alchemy-sdk'

interface NftCardProps {
  nft: Nft
  owned: boolean
}

export const NftCard = ({ nft, owned }: NftCardProps) => {
  return (
    <Card
      elevation={12}
      sx={{ width: '10%', my: 2, p: 1, opacity: owned ? 1 : 0.6 }}
    >
      <Stack>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: 'auto' }}
          image={nft.rawMetadata?.image}
        />
        <Typography textAlign={'center'} variant="h3">
          {nft.title}
        </Typography>
        <Typography textAlign={'center'} variant="subtitle1">
          {nft.contract.symbol}
        </Typography>
        <Typography textAlign={'center'} variant="subtitle1">
          {owned ? 'OWNED' : 'NOT OWNED'}
        </Typography>
      </Stack>
    </Card>
  )
}
