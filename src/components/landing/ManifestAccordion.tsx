import { Accordion, AccordionSummary, Typography } from '@mui/material'
import PlusIcon24 from '../icons/PlusIcon24'

export type ManifestAccordionProps = {
  title: string
  text: string
}

export const ManifestAccordion = ({ title, text }: ManifestAccordionProps) => {
  const expandIcon = <PlusIcon24 sx={{ color: 'neutral.600' }} />

  return (
    <Accordion
      disableGutters
      sx={{
        bgcolor: 'transparent',
        boxShadow: 0,
        borderBottom: '1px solid #B0B2A3',
      }}
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
      <Typography variant="body1" color="neutral.600" pb={5} pt="20px">
        {text}
      </Typography>
    </Accordion>
  )
}
