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
      title={<Typography variant="body2XS">{title}</Typography>}
    >
      <em
        style={{
          color: 'secondary.500',
        }}
      >
        {children}
      </em>
    </MuiTooltip>
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary[500],
    color: theme.palette.neutral[400],
  },
}))

export default Tooltip
