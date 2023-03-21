import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export type QuestionAccordionProps = {
  question: string
  answer: string
}

const QuestionAccordion = ({ question, answer }: QuestionAccordionProps) => {
  return (
    <Accordion
      disableGutters
      sx={{ bgcolor: 'transparent', boxShadow: 0 }}
      TransitionProps={{}}
    >
      <AccordionSummary
        expandIcon={<AddIcon />}
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
