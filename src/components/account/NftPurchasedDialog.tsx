import { ContentTypes, useContentful } from '@/utils/hooks/useContentful'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import artistImage from 'public/images/allocationArtists.png'
import React from 'react'
import Button from '../Button'
import IconButton from '../IconButton'
import CloseIcon from '../icons/CloseIcon'
import TypographyWithTooltips from '../TypographyWithTooltips'

type NftPurchasedDialogProps = {
  isOpen: boolean
  onClose: (skipSigning: boolean) => void
}

export const NftPurchasedDialog = ({
  isOpen,
  onClose,
}: NftPurchasedDialogProps) => {
  const translate = useContentful(ContentTypes.accountPage)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('tabletS')
  )
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose(false)}
      maxWidth={'tabletS'}
      PaperProps={{ sx: { width: isMobile ? '100%' : '30%', borderRadius: 0 } }}
    >
      <DialogTitle
        variant="title"
        sx={{ bgcolor: 'neutral.400', textAlign: 'center', py: 2, px: 2 }}
      >
        <Stack alignItems={'end'}>
          <IconButton onClick={() => onClose(true)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack direction={'column'} alignItems={'center'} sx={{ px: 4 }}>
          <Image
            src={artistImage}
            alt={'Support Artists'}
            style={{
              alignContent: 'center',
              objectFit: 'contain',
              position: 'relative',
              width: '50%',
              height: 'auto',
            }}
          />
          <Typography variant="caption" sx={{ mt: 2 }}>
            {translate('nftRewardDialogTitle')}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'neutral.400', pt: 3, px: 4 }}>
        <TypographyWithTooltips
          variant="body2"
          whiteSpace={'pre-line'}
          sx={{ textAlign: 'center' }}
          key={'nft-dialog-text'}
          text={translate('nftRewardDialogText')}
        />
        <DialogActions
          sx={{
            mt: 4,
          }}
        >
          <Button onClick={() => onClose(false)} sx={{ width: '100%' }}>
            {translate('nftRewardDialogButtonText')}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
