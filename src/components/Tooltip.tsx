import {
  Tooltip as MuiTooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  Typography,
  ClickAwayListener,
  useMediaQuery,
  Theme,
} from '@mui/material'
import { useState } from 'react'

const Tooltip = styled(
  ({ className, children, title, ...props }: TooltipProps) => {
    const isMobile = useMediaQuery((theme: Theme) =>
      theme.breakpoints.down('tabletS')
    )
    const [tooltipOpen, setTooltipOpen] = useState(false)

    return isMobile ? (
      <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
        <MuiTooltip
          {...props}
          classes={{ popper: className }}
          leaveDelay={200}
          title={<Typography variant="body2S">{title}</Typography>}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <Typography
            sx={{
              color: 'secondary.500',
              display: 'inline',
              textDecorationLine: 'underline',
              textDecorationStyle: 'dotted',
              fontStyle: 'italic',
            }}
            onClick={() => setTooltipOpen(true)}
            variant="body2"
          >
            {children}
          </Typography>
        </MuiTooltip>
      </ClickAwayListener>
    ) : (
      <MuiTooltip
        {...props}
        classes={{ popper: className }}
        leaveDelay={200}
        title={<Typography variant="body2S">{title}</Typography>}
      >
        <Typography
          sx={{
            color: 'secondary.500',
            display: 'inline',
            textDecorationLine: 'underline',
            textDecorationStyle: 'dotted',
            fontStyle: 'italic',
          }}
          variant="body2"
        >
          {children}
        </Typography>
      </MuiTooltip>
    )
  }
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary[500],
    borderRadius: 0,
    padding: '16px',
    color: theme.palette.neutral[400],
  },
}))

export default Tooltip
