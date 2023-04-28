import { ALLOCATION_INFO } from '@/consts'
import { Box, Stack, Typography } from '@mui/material'
import AllocationInfoStack from '../AllocationInfoStack'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'

export const NFTAllocation = () => {
  const translateCommon = useContentful(ContentTypes.common)
  const translateNftDetail = useContentful(ContentTypes.nftDetail)
  return (
    <Stack
      gap="40px"
      sx={{
        backgroundColor: 'neutral.400',
        p: { mobile: '16px', tabletM: '80px' },
      }}
    >
      <Typography variant="caption">
        {translateNftDetail('buyNftAndSupport')}
      </Typography>
      <Stack sx={{ overflowY: 'hidden' }}>
        <Stack
          gap={{ mobile: 5, desktopS: 10 }}
          direction={{ mobile: 'column', tabletM: 'row' }}
          sx={{ overflowY: 'hidden' }}
          height="100%"
        >
          {ALLOCATION_INFO.map((allocation, index) => (
            <Stack
              py={3}
              key={`AllocationInfoStack${index}`}
              width={{ mobile: 'auto', tabletM: '384px' }}
            >
              <AllocationInfoStack
                percentage={allocation.percentage}
                text={translateCommon(allocation.textKey)}
                image={allocation.image}
                isHorizontal={false}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
