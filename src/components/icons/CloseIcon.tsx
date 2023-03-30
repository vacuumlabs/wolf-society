import { SvgIcon, SvgIconProps } from '@mui/material'

function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6 6.00488L18 18.0049" stroke="currentColor" strokeWidth="2" />
      <path d="M18 6.00488L6 18.0049" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
  )
}
export default CloseIcon
