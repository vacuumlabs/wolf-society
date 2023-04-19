import {
  Tooltip as MuiTooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  Typography,
} from '@mui/material'

const Tooltip = styled(
  ({ className, children, title, ...props }: TooltipProps) => (
    <MuiTooltip
      {...props}
      classes={{ popper: className }}
      leaveDelay={200}
      title={<Typography variant="body2XS">{title}</Typography>}
    >
      <em
        style={{
          color: 'secondary.500',
          textDecorationLine: 'underline',
          textDecorationStyle: 'dotted',
        }}
      >
        {children}
      </em>
    </MuiTooltip>
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary[500],
    borderRadius: 0,
    padding: '16px',
    color: theme.palette.neutral[400],
  },
}))

export default Tooltip
