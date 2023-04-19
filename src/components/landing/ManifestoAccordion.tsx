import { Accordion, AccordionSummary, Theme, Typography } from '@mui/material'
import PlusIcon24 from '../icons/PlusIcon24'
import { useState } from 'react'

export type ManifestAccordionProps = {
  title: string
  text: string
  expanded: boolean
  onClick: () => void
}

export const ManifestAccordion = ({
  title,
  text,
  expanded,
  onClick,
}: ManifestAccordionProps) => {
  const expandIcon = <PlusIcon24 sx={{ color: 'neutral.600' }} />
  const isExpanded = useState<number>(0)

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      onClick={onClick}
      sx={(theme: Theme) => ({
        bgcolor: 'transparent',
        boxShadow: 0,
        borderBottom: `1px solid ${theme.palette.secondary[400]}`,
      })}
    >
      <AccordionSummary
        expandIcon={expandIcon}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        sx={{
          px: 0,
          py: '24px',
          '& .MuiAccordionSummary-content': {
            m: 0,
            justifyContent: 'center',
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(45deg)',
          },
        }}
      >
        <Typography variant="caption" color="neutral.600">
          {title}
        </Typography>
      </AccordionSummary>
      <Typography variant="body2S" color="neutral.600" pb={5} pt="20px">
        {text}
      </Typography>
    </Accordion>
  )
}
