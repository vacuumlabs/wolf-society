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
    <Box sx={{ position: 'relative' }} width="100%">
      {isHorizontal ? (
        <Image src={image} alt={text} fill style={{ objectFit: 'contain' }} />
      ) : (
        <Image
          src={image}
          alt={text}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </Box>
  )
  return (
    <Stack direction={isHorizontal ? 'row' : 'column'}>
      {displayImageOnTheRight ? <></> : imageBox}
      <Stack>
        <Stack direction="row">
          <Typography variant="display" color="neutral.main">
            {percentage}
          </Typography>
          <Typography variant="headline" color="neutral.main">
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