import { ALLOCATION_INFO } from '@/consts'
import { BreakpointOverrides, Stack, Typography } from '@mui/material'
import AllocationInfoStack from '../AllocationInfoStack'
import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'

export const NFTAllocation = () => {
  const translateCommon = useContentful(ContentTypes.common)
  const translateNftDetail = useContentful(ContentTypes.nftDetail)
  const breakpoint: keyof BreakpointOverrides = 'tabletM'
  return (
    <Stack
      gap="40px"
      sx={{
        backgroundColor: 'neutral.400',
        paddingTop: { mobile: 5, [breakpoint]: 10 },
        paddingX: { mobile: 2, [breakpoint]: 10 },
        paddingBottom: { mobile: 2, [breakpoint]: 10 },
      }}
    >
      <Typography variant="caption">
        {translateNftDetail('buyNftAndSupport')}
      </Typography>
      <Stack sx={{ overflowY: 'hidden' }}>
        <Stack
          gap={{ mobile: 5, desktopS: 10 }}
          direction={{ mobile: 'column', [breakpoint]: 'row' }}
          sx={{ overflowY: 'hidden' }}
          height="100%"
        >
          {ALLOCATION_INFO.map((allocation, index) => (
            <Stack
              py={3}
              key={`AllocationInfoStack${index}`}
              width={{ mobile: 'auto', [breakpoint]: '384px' }}
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
