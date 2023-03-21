import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Icon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import PlusIcon24 from '../icons/PlusIcon24'
import PlusIcon32 from '../icons/PlusIcon32'

export type QuestionAccordionProps = {
  question: string
  answer: string
}

const QuestionAccordion = ({ question, answer }: QuestionAccordionProps) => {
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
      <AccordionDetails>
        <Grid container>
          <Grid item mobile={12} desktopS={5}></Grid>
          <Grid item mobile={12} desktopS={7}>
            <Typography
              variant="body2"
              sx={{ py: { mobile: 5, destkopM: 10 } }}
            >
              {answer}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
export default QuestionAccordion
