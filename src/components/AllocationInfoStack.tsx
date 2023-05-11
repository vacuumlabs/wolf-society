import { Box, Stack, Typography } from '@mui/material'
import Image, { StaticImageData } from 'next/image'

type Props = {
  percentage: string
  text: string
  image: StaticImageData
  isHorizontal: boolean
  imageOnTheRight?: boolean
}

const AllocationInfoStack = ({
  percentage,
  text,
  image,
  isHorizontal,
  imageOnTheRight,
}: Props) => {
  const displayImageOnTheRight = !isHorizontal || imageOnTheRight
  const imageBox = (
    <Stack
      sx={{ position: 'relative', overflowY: 'hidden' }}
      width={isHorizontal ? '50%' : '100%'}
      justifyContent="center"
    >
      {isHorizontal ? (
        <Image
          src={image}
          alt={text}
          style={{
            objectFit: 'contain',
            position: 'relative',
            width: '100%',
            height: 'auto',
          }}
        />
      ) : (
        <Image
          src={image}
          alt={text}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </Stack>
  )
  return (
    <Stack
      justifyContent="space-between"
      direction={isHorizontal ? 'row' : 'column'}
      height={'100%'}
      gap={isHorizontal ? 5 : { mobile: 3, desktopS: isHorizontal ? 5 : 10 }}
    >
      {displayImageOnTheRight ? <></> : imageBox}
      <Stack justifyContent="center" width={isHorizontal ? '50%' : 'auto'}>
        <Stack direction="row">
          <Typography variant="displayM" color="neutral.main">
            {percentage}
          </Typography>
          <Typography
            variant="headlineS"
            color="neutral.main"
            sx={{
              lineHeight: '64px',
            }}
          >
            %
          </Typography>
        </Stack>
        <Typography variant="body2">{text}</Typography>
      </Stack>
      {displayImageOnTheRight ? imageBox : <></>}
    </Stack>
  )
}
export default AllocationInfoStack
