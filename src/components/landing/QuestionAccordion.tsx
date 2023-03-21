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
import Image from 'next/image'
import PlusIcon24 from 'public/images/icon/24/Plus.svg'
import PlusIcon32 from 'public/images/icon/32/Plus.svg'

export type QuestionAccordionProps = {
  question: string
  answer: string
}

const QuestionAccordion = ({ question, answer }: QuestionAccordionProps) => {
  const theme = useTheme()
  const displayBiggerIcon = useMediaQuery(theme.breakpoints.up('desktopM'))
  const expandIcon = (
    <Icon
      sx={{
        display: 'flex',
        fontSize: displayBiggerIcon ? '32px' : '24px',
      }}
    >
      <Image
        src={displayBiggerIcon ? PlusIcon32 : PlusIcon24}
        height={displayBiggerIcon ? 32 : 24}
        alt="Expand Icon"
      />
    </Icon>
  )
  return (
    <Accordion
      disableGutters
      sx={{ bgcolor: 'transparent', boxShadow: 0 }}
      TransitionProps={{}}
    >
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
