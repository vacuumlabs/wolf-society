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

  useEffect(() => {
    if (isConnected) setIsConnectWalletModalOpen(false)
  }, [isConnected])

  console.log(isConnected)
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box></Box>
        <Button
          onClick={() => {
            isConnected ? disconnect() : setIsConnectWalletModalOpen(true)
          }}
        >
          {t(isConnected ? 'Disconnect' : 'Connect')}
        </Button>
      </Stack>
      <ConnectWalletModal
        isOpen={isConnectWalletModalOpen}
        setIsOpen={setIsConnectWalletModalOpen}
      />
    </>
  )
}
