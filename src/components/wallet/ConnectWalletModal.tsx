import { Button, Dialog } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { useConnect } from 'wagmi'

interface ConnectWalletModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const ConnectWalletModal = ({
  isOpen,
  setIsOpen,
}: ConnectWalletModalProps) => {
  const { t } = useTranslation()
  const { connect, connectors } = useConnect()
  return (
    <Dialog open={isOpen}>
      <Stack>
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            variant="contained"
            disabled={!connector.ready}
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </Button>
        ))}
        <Button onClick={() => setIsOpen(false)}>{t('close')}</Button>
      </Stack>
    </Dialog>
  )
}
