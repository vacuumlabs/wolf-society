import { SvgIcon, SvgIconProps } from '@mui/material'

function ArrowRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M18.03 12.0049H5.03003"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M14.03 17.0049L19.03 12.0049"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M14.03 7.00488L19.03 12.0049"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </SvgIcon>
  )
}
export default ArrowRightIcon
