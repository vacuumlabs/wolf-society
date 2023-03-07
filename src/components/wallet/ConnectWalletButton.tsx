import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectWalletModal } from './ConnectWalletModal'

export const ConnectWalletButton = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState<boolean>(false)

  return (
    <>
      <Button
        onClick={() => {
          isConnected ? disconnect() : setIsConnectWalletModalOpen(true)
        }}
      >
        {isConnected ? t('disconnect') : t('connect')}
      </Button>
      <ConnectWalletModal
        isOpen={isConnectWalletModalOpen}
        setIsOpen={setIsConnectWalletModalOpen}
      />
    </>
  )
}
