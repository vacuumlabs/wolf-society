import { Stack, Container } from '@mui/material'
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
  return (
    <Stack
      pt={5}
      pb={10}
      sx={{ alignItems: 'center', backgroundColor: 'neutral.400' }}
    >
      <Container>
        <Stack
          direction={'row'}
          sx={{ justifyContent: 'center', background: 'inherit' }}
          width={'100%'}
        >
          {mockCardData.map((cardData, idx) => {
            return <RewardCard key={`reward-card-${idx}`} {...cardData} />
          })}
        </Stack>
      </Container>
    </Stack>
  )
}

export default ContributionAndRewards
