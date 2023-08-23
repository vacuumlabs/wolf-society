import { Link as MuiLink, LinkProps, styled } from '@mui/material'
import NextLink from 'next/link'

const Link = styled(({ children, ...props }: LinkProps) => {
  return (
    <MuiLink {...props} component={NextLink}>
      {children}
    </MuiLink>
  )
})<LinkProps>(() => ({}))

export default Link
