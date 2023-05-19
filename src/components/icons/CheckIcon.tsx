import { SvgIcon, SvgIconProps } from '@mui/material'

function CheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M20 6.50488L9 17.5049L4 12.5049"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </SvgIcon>
  )
}
export default CheckIcon
