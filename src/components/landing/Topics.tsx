import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import avatarImage from 'public/images/avatar.png'
import TopicCard, { TopicCardProps } from './TopicCard'

const MockedTopics: TopicCardProps[] = [
  {
    title: 'THE WORLD’S GLACIERS campaign 2023',
    date: 'March 6, 2023',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/538f/89d8/4e5f5db6c2b8aaa5ab92994486180d74?Expires=1679875200&Signature=opMWv48D6XwLYk93-R6He8J2bD~W3P17PEJyGdSsGhLFeufKeKLjFEHH8EKlGx24gDbkd6AVb~4ooiAp24pfwpgaF6Ue-R5JQxrgCPfo~hHTB25252lV7UWs~vFMZxhynOgfcyq2ThUc9noOoUXI8sJooZC9BpPym9l5B-yOH~cjFzewVJzbZ7c14Dom2iofc7OeATVSL3CZi5Zxatw8p8pPKwdv3rXJqo1GbpqunHRAEWx2eiQHVK-Q8oCdZ2X6A-s1VRNBlA-vHbOiX4WnoVKLkWopWFmPnv7zSwGDN~bI~KJ9yMQpe5FL6QiWja6qF961bZ10qbRBo84ScqzN4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    title: 'HEALING IN THE PERUVIAN AMAZON',
    date: 'March 4, 2023',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/5cf6/a05d/d955938e3252e0fa6f73e9facbaa5e3d?Expires=1679875200&Signature=fSOj6eXnv0X6wUs2SdvS69cibuUhvVGfr-a1q9NLQsPu0x4QCHun1XQNbrjeLsnRV8YeHrJW2MS-o0wf-vQ4C81bEUiP~vFJOC4EG4c4Zcmz32OOEM4SNIqQS3F-5qkguDln~BUGBE1y8jI-sWcythFunKUak~WEWv9n5Wl9k0X3HB9qJpAQT1SZbGsMcWWORhKBZdumR7KLrJn5bCUXcHeB7ng3PXmyQXrzf6QQWoiyXiwBcQN9c69vhz9EQC3eVkeuFPAVNtH4U-7OF7f2nwL8T6TeEUM62trkofyOoLXkOsl4TWu2F1xC5jWokbHH1MSFuPBVDf8NbqgnHjZwoA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    title: 'UN Biodiversity campaign',
    date: 'February 27, 2023',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/d1c5/4cda/ddd7b489d95fb0e8cbbb8d6eac564437?Expires=1679875200&Signature=qZEH5u2EriIUqAPvI5t10CtX4NA6aBqxY3puy0njKqTtSouUne-BDk4NfHs95tSm1YA5A7QsH9UELgwF5hgtRX7emDZVuwU5QXyQqIa2bh4TOdLx4Sr4bHpycVYmFbrtK~~GA9oJqFfvSWoLQYAakDSAXZPdUT2dFmH1CWH-5PSGovGznPhNPurfNSlO-am40xvCAY0viRpnPg~igPgeH0DEhbkMd3ZXqeFDIo7Ly7M7RAAWPC0SqhwDADG~xAuvzqBpucPSSnN3fHJZeMW~X45f6BiWFX1Qxjwq-eS5FKc2uKTlMbIvMCsP80atQG-UCWDXEsPwSu3ouooDvMBzpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
]

const Topics = () => {
  return (
    <Box sx={{ bgcolor: 'neutral.400', textAlign: 'center' }}>
      <Container>
        <Stack
          sx={{ gap: 4, mt: { mobile: 10, desktopM: 20 }, mb: 5 }}
          alignItems="center"
        >
          <Image
            src={avatarImage}
            alt="Wolf Society Foundation logo"
            height={56}
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            Hot Topics
          </Typography>
          <Stack sx={{ alignItems: 'center' }}>
            <Button color="black" variant="outlined">
              All Topics
            </Button>
          </Stack>
        </Stack>
        {/* Mobile view */}
        <Stack sx={{ gap: 5, alignItems: 'center', mb: 10 }}>
          {MockedTopics.map((topic) => (
            <TopicCard {...topic} key={topic.title} />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
export default Topics