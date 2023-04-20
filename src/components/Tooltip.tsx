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

    return (
      <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
        <MuiTooltip
          {...props}
          classes={{ popper: className }}
          leaveDelay={200}
          title={<Typography variant="body2XS">{title}</Typography>}
          disableFocusListener={isMobile}
          disableHoverListener={isMobile}
          disableTouchListener={isMobile}
        >
          <Typography
            sx={{
              color: 'secondary.500',
              display: 'inline',
              textDecorationLine: 'underline',
              textDecorationStyle: 'dotted',
              fontStyle: 'italic',
            }}
            onClick={isMobile ? () => setTooltipOpen(true) : () => {}}
            variant="body2"
          >
            {children}
          </Typography>
        </MuiTooltip>
      </ClickAwayListener>
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
