import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Box,
  Container,
  Typography,
  BreakpointOverrides,
  useMediaQuery,
  Theme,
  Stack,
} from '@mui/material'
import React, { useState } from 'react'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import TextField from '../TextField'
import { useSnackbar } from 'notistack'
import { SECTIONS } from '@/consts'

const Newsletter = () => {
  const translate = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletM')
  )
  const [inputValue, setInputValue] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  async function subscribeNewsletter() {
    const response = await fetch(`/api/newsletter`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputValue,
      }),
    })
    enqueueSnackbar(
      translate(
        response.status === 200
          ? 'newsletterSubscriptionSuccess'
          : response.status === 409
          ? 'newsletterSubscriptionConflict'
          : 'newsletterSubscriptionError'
      ),
      {
        variant: response.status === 200 ? 'success' : 'error',
      }
    )
  }

  const content = (
    <>
      <Typography
        variant="headline"
        sx={{ display: 'inline', verticalAlign: 'middle', mb: { mobile: 1 } }}
      >
        {translate('newsletterText')}
      </Typography>
      <TextField
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value)
        }}
        placeholder={translate('newsletterInputLabel')}
        sx={{ verticalAlign: 'middle', mx: 1 }}
      />
      <Button
        onClick={async () => {
          await subscribeNewsletter()
        }}
        sx={{ verticalAlign: 'middle', mx: { mobile: 1 } }}
      >
        {translate('newsletterButton')}
      </Button>
    </>
  )

  return (
    <Box sx={{ bgcolor: 'neutral.400' }} id={SECTIONS.about.newsletter.id}>
      <AppearingComponent>
        <Container>
          {isMobile ? (
            <Stack
              direction={'column'}
              sx={{
                py: { mobile: 10, [breakpoint]: 20 },
                textAlign: 'center',
              }}
              gap={1}
            >
              {content}
            </Stack>
          ) : (
            <Box
              sx={{
                py: { mobile: 10, [breakpoint]: 20 },
                textAlign: 'center',
              }}
            >
              {content}
            </Box>
          )}
        </Container>
      </AppearingComponent>
    </Box>
  )
}

export default Newsletter
