import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Button from '../Button'

type RewardCardProps = {
  title: string
  amount: string | null
  isEthAmount: boolean
  buttonText: string
  buttonAction: () => void
  isDisabled: boolean
}

const RewardCard = ({
  title,
  amount,
  isEthAmount,
  buttonText,
  buttonAction,
  isDisabled,
}: RewardCardProps) => {
  return (
    <Box
      sx={{ backgroundColor: 'neutral.600' }}
      p={5}
      mx={'1px'}
      justifyContent={'center'}
      width={'100%'}
      minWidth={296}
    >
      <Typography variant="body2">{title}</Typography>
      <Stack direction="row" mt={10} gap="4px">
        <Typography variant="headline">
          {amount !== null ? amount : '...'}
        </Typography>
        {isEthAmount && (
          <Typography
            variant="caption"
            sx={{ pt: { mobile: '3px', desktopM: '9px', desktopL: '15px' } }}
          >
            {'ETH'}
          </Typography>
        )}
      </Stack>
      <Box mt={8}>
        <Button
          variant="outlined"
          disabled={isDisabled}
          sx={{ width: '100%' }}
          onClick={buttonAction}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default RewardCard
