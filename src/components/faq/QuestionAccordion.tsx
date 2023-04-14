import {
  Accordion,
  AccordionSummary,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import PlusIcon24 from '../icons/PlusIcon24'
import PlusIcon32 from '../icons/PlusIcon32'
import TypographyWithTooltips from '../TypographyWithTooltips'

export type QuestionAccordionProps = {
  question: string
  answer: string
  id: string
}

const QuestionAccordion = ({
  question,
  answer,
  id,
}: QuestionAccordionProps) => {
  const theme = useTheme()
  const displayBiggerIcon = useMediaQuery(theme.breakpoints.up('desktopM'))
  const expandIcon = displayBiggerIcon ? (
    <PlusIcon32 color="black" sx={{ fontSize: 32 }} />
  ) : (
    <PlusIcon24 color="black" />
  )

  return (
    <Accordion disableGutters sx={{ bgcolor: 'transparent', boxShadow: 0 }}>
      <AccordionSummary
        expandIcon={expandIcon}
        aria-controls={`${question}-content`}
        id={`${question}-header`}
        sx={{
          px: 0,
          py: 5,
          '& 	.MuiAccordionSummary-content': {
            m: 0,
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(45deg)',
          },
        }}
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <Grid container>
        <Grid item mobile={12} desktopS={5}></Grid>
        <Grid item mobile={12} desktopS={7}>
          <TypographyWithTooltips
            text={answer}
            key={id}
            variant="body2"
            sx={{ pt: 5, pb: { mobile: 5, desktopM: 10 } }}
          />
        </Grid>
      </Grid>
    </Accordion>
  )
}
export default QuestionAccordion
