import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import Button from './Button'

export const LaunchAppButton = () => {
  const translate = useContentful(ContentTypes.navbar)
  return (
    <Button
      variant="outlined"
      style={{ height: '48px', padding: '12px 24px' }}
      sx={(theme) => ({
        // Button S for M breakpoint
        [theme.breakpoints.down('desktopL')]: {
          fontSize: '16px',
          lineHeight: '24px',
        },
      })}
    >
      {translate('launchApp')}
    </Button>
  )
}
