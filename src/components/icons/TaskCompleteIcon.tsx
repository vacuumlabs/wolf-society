import { SvgIcon, SvgIconProps } from '@mui/material'

function TaskCompleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      sx={{ width: 'auto', height: '40px' }}
      {...props}
      width="40"
      height="40"
      viewBox="0 0 40 40"
    >
      <circle cx="20" cy="20" r="20" fill="#2B4B2A" />
      <g clipPath="url(#clip0_583_1770)">
        <path
          d="M28 14.5L17 25.5L12 20.5"
          fill="none"
          stroke="#F2F2E7"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </g>
    </SvgIcon>
  )
}
export default TaskCompleteIcon
