import { Accordion, AccordionSummary, Theme, Typography } from '@mui/material'
import PlusIcon24 from '../icons/PlusIcon24'
import { useState } from 'react'
import { Colors } from './TitleSectionText'

export type TitleTextAccordionProps = {
  title: string
  text: string
  expanded: boolean
  onClick: () => void
  colors: Colors
}

export const TitleSectionAccordion = ({
  title,
  text,
  expanded,
  onClick,
  colors,
}: TitleTextAccordionProps) => {
  const expandIcon = <PlusIcon24 sx={{ color: colors.main }} />
  const isExpanded = useState<number>(0)

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      onClick={onClick}
      sx={(theme: Theme) => ({
        bgcolor: 'transparent',
        boxShadow: 0,
        borderBottom: `1px solid ${
          colors.type == 'dark'
            ? theme.palette.secondary[400]
            : theme.palette.neutral[400]
        }`,
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
        <Typography variant="caption" color={colors.main}>
          {title}
        </Typography>
      </AccordionSummary>
      <Typography variant="body2S" color={colors.main} pb={5} pt="20px">
        {text}
      </Typography>
    </Accordion>
  )
}
