import { Stack, Container, Box } from '@mui/material'
import RewardCard from './RewardCard'

const mockCardData = [
  {
    title: 'Your contribution',
    amount: '2.5',
    isEthAmount: true,
    buttonText: 'Distribute (soon)',
    buttonAction: () => {},
    isDisabled: true,
  },
  {
    title: 'Your rewards',
    amount: '0.02456',
    isEthAmount: true,
    buttonText: 'Claim Rewards',
    buttonAction: () => {},
    isDisabled: false,
  },
  {
    title: 'Game Tokens',
    amount: '250',
    isEthAmount: false,
    buttonText: 'Play Game (soon)',
    buttonAction: () => {},
    isDisabled: true,
  },
]

export const ContributionAndRewards = () => {
  const cardStack = (
    <Stack
      direction={'row'}
      width={'100%'}
      sx={{
        background: 'inherit',
      }}
    >
      {mockCardData.map((cardData, idx) => {
        return <RewardCard key={`reward-card-${idx}`} {...cardData} />
      })}
    </Stack>
  )
  return (
    <Stack
      pt={5}
      pb={10}
      sx={{
        alignItems: { mobile: 'inherit', desktopS: 'center' },
        backgroundColor: 'neutral.400',
      }}
    >
      <Container sx={{ display: { mobile: 'none', desktopS: 'inherit' } }}>
        {cardStack}
      </Container>
      <Stack
        sx={{
          display: { mobile: 'inherit', desktopS: 'none' },
          overflowX: 'auto',
        }}
      >
        {cardStack}
      </Stack>
    </Stack>
  )
}

export default ContributionAndRewards
