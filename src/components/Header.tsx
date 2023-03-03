import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectWalletModal } from './ConnectWalletModal'

export const Header = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState<boolean>(false)

  const [buttonText, setButtonText] = useState<string | null>(t('Disconnect'))

  useEffect(() => {
    if (isConnected) {
      setIsConnectWalletModalOpen(false)
      setButtonText(t('Disconnect'))
      return
    }
    setButtonText(t('Connect'))
  }, [isConnected, t])

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box></Box>
        <Button
          onClick={() => {
            isConnected ? disconnect() : setIsConnectWalletModalOpen(true)
          }}
        >
          {buttonText}
        </Button>
      </Stack>
      <ConnectWalletModal
        isOpen={isConnectWalletModalOpen}
        setIsOpen={setIsConnectWalletModalOpen}
      />
    </>
  )
}
