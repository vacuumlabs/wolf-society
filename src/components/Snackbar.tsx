import { Card, Stack, Typography } from '@mui/material'
import { CustomContentProps, SnackbarContent, VariantType } from 'notistack'
import { forwardRef } from 'react'
import CloseIcon from './icons/CloseIcon'
import CheckIcon from './icons/CheckIcon'

const VariantBackgroundColors: Record<VariantType, string> = {
  error: 'primary.100',
  default: 'neutral.100',
  info: 'neutral.100',
  warning: 'warning.100',
  success: 'success.100',
}

const VariantTextColors: Record<VariantType, string> = {
  error: 'error.700',
  default: 'neutral.main',
  info: 'neutral.main',
  warning: 'warning.800',
  success: 'success.800',
}

const VariantIcons: Partial<Record<VariantType, React.ReactNode>> = {
  error: <CloseIcon />,
  success: <CheckIcon />,
}

const Snackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    return (
      <SnackbarContent ref={ref}>
        <Card
          sx={{
            width: '100vw',
            bgcolor: VariantBackgroundColors[props.variant],
            p: 2,
          }}
        >
          <Stack direction="row" justifyContent="center" gap={2}>
            <Stack
              justifyContent="center"
              sx={{ color: VariantTextColors[props.variant] }}
            >
              {VariantIcons[props.variant]}
            </Stack>
            <Typography
              variant="body2S"
              color={VariantTextColors[props.variant]}
              sx={{ wordBreak: 'break-word' }}
            >
              {props.message}
            </Typography>
          </Stack>
        </Card>
      </SnackbarContent>
    )
  }
)
Snackbar.displayName = 'Snackbar'

export default Snackbar
