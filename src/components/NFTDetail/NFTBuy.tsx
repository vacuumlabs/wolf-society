import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Button, Stack, Typography } from '@mui/material'

export interface NFTBuyProps {
  priceETH: number
  priceEur: number
}

type NFTBuyComponentProps = NFTBuyProps & {
  buyInView: boolean
  className: string
}

export const NFTBuy = ({
  priceETH,
  priceEur,
  buyInView,
  className,
}: NFTBuyComponentProps) => {
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
      mb={{ mobile: buyInView ? '48px' : 0 }}
      className={className}
    >
      <Stack alignItems="center">
        <Typography
          mt="122px"
          variant="display"
        >{`${priceETH} ETH`}</Typography>
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
