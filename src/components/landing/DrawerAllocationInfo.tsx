import { ALLOCATION_INFO } from '@/consts'
import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { Box, Stack } from '@mui/material'
import AllocationInfoStack from '../AllocationInfoStack'

const DrawerAllocationInfo = () => {
  const translate = useContentful(ContentTypes.common)
  return (
    <Stack gap={{ mobile: 5, desktopS: 10 }}>
      {ALLOCATION_INFO.map((allocation, index) => (
        <Box py={3} key={`AllocationInfoStack${index}`}>
          <AllocationInfoStack
            percentage={allocation.percentage}
            text={translate(allocation.textKey)}
            image={allocation.image}
            isHorizontal={true}
            imageOnTheRight={index % 2 === 0}
          />
        </Box>
      ))}
    </Stack>
  )
}
export default DrawerAllocationInfo
