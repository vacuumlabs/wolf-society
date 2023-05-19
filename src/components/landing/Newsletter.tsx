import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import { Box, Container, Typography, BreakpointOverrides } from '@mui/material'
import React, { useState } from 'react'
import AppearingComponent from '../AppearingComponent'
import Button from '../Button'
import TextField from '../TextField'
import { useSnackbar } from 'notistack'

const Newsletter = () => {
  const translate = useContentful(ContentTypes.landingPage)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'
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
  return (
    <Box sx={{ bgcolor: 'neutral.400' }}>
      <AppearingComponent>
        <Container>
          <Box
            sx={{
              my: { mobile: 10, [breakpoint]: 20 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="headline"
              sx={{ display: 'inline', verticalAlign: 'middle' }}
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
            ></TextField>
            <Button
              onClick={async () => {
                await subscribeNewsletter()
              }}
              sx={{ verticalAlign: 'middle' }}
            >
              {translate('newsletterButton')}
            </Button>
          </Box>
        </Container>
      </AppearingComponent>
    </Box>
  )
}

export default Newsletter
