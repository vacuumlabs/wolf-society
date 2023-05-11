import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, ButtonProps, Stack, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import Button from '../Button'

const CircleButton = ({ label, onClick, ...props }: { label: string } & ButtonProps) => (
  <Button
    sx={{
      width: '45%',
      height: 'auto !important',
      aspectRatio: '1/1',
      borderRadius: '50%',
    }}
    onClick={onClick}
    {...props}
  >
    {label}
  </Button>
)

export interface NFTBuyProps {
  priceETH: number
}

type NFTBuyComponentProps = NFTBuyProps & {
  buyInView: boolean
  className: string
}

export const NFTBuy = ({
  priceETH,
  buyInView,
  className,
}: NFTBuyComponentProps) => {
  const translate = useContentful(ContentTypes.nftDetail)

  const { connector } = useAccount()
  const isUserWalletMagic = connector != null && connector.id === 'magic'

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        height: { mobile: 'auto', tabletM: '100vh' },
        width: { mobile: '100vw', tabletM: 'max-content' },
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
        <CircleButton label={translate('buyWithCard')} disabled={!isUserWalletMagic} />
        <CircleButton label={translate('buyWithCrypto')} disabled={isUserWalletMagic} />
      </Stack>
    </Stack>
  )
}
