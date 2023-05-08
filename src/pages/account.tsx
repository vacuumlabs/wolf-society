import RewardCard from '@/components/account/RewardCard'
import { ContentTypes, getTranslations } from '@/utils/hooks/useContentful'
import { Container, Stack } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

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

export const Account = () => {
  return (
    <Stack mt={10}>
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
    </Stack>
  )
}

export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    // Will be passed to the page component as props
    props: {
      translations: await getTranslations(ContentTypes.landingPage, locale),
      locale,
    },
    revalidate: 60, // In seconds
  }
}

export default Account
