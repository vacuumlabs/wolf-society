import {
  TextField as MuiTextField,
  TextFieldProps,
  styled,
} from '@mui/material'

const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-root': {
    ...theme.typography.body2,
    borderRadius: 0,
  },
  '& .MuiInputBase-input': {
    padding: '12px 20px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: '2px',
      borderColor: theme.palette.black.main,
    },
  },
}))

export default TextField
