import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Button, Stack, Typography } from '@mui/material'

export interface NFTBuyProps {
  priceETH: number
  priceEur: number
}

export const NFTBuy = ({ priceETH, priceEur }: NFTBuyProps) => {
  const translate = useContentful(ContentTypes.nftDetail)

  const CircleButton = ({ label }: { label: string }) => (
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'primary.500',
        color: 'neutral.400',
        width: '45%',
        aspectRatio: '1/1',
        borderRadius: '50%',
        alignContent: 'center',
      }}
    >
      {label}
    </Button>
  )

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        width: { mobile: '100vw', tabletM: '50vw' },
        backgroundColor: 'neutral.400',
      }}
      p={{ mobile: '16px', tabletM: '80px' }}
      gap={{ mobile: '40px', tabletM: '80px' }}
    >
      <Stack gap="8px">
        <Typography
          m="122px auto auto auto"
          variant="display"
        >{`${priceETH} ETH`}</Typography>
        <Typography
          m="auto"
          variant="headline"
          color="neutral.700"
        >{`${priceEur} EUR`}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap="16px"
        width="100%"
      >
        <CircleButton label={translate('buyWithCard')} />
        <CircleButton label={translate('buyWithCrypto')} />
      </Stack>
    </Stack>
  )
}
