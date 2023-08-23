import {
  Box,
  BreakpointOverrides,
  Divider,
  List,
  ListItem,
} from '@mui/material'
import TypographyWithTooltips from '../TypographyWithTooltips'

type DrawerTextListProps = {
  texts: string[]
}

const DrawerTextList = ({ texts }: DrawerTextListProps) => {
  const breakpoint: keyof BreakpointOverrides = 'tabletS'
  return (
    <List
      sx={{
        listStyleType: 'square',
        position: { mobile: 'inherit', [breakpoint]: 'relative' },
      }}
    >
      {texts.map((text, idx) => (
        <Box key={text}>
          <ListItem
            sx={{
              left: '22px',
              width: 'calc(100% - 22px)',
              display: 'list-item',
              fontSize: '24px',
              color: 'primary.main',
              py: 3,
              lineHeight: '0px',
            }}
          >
            <TypographyWithTooltips
              variant="body2"
              sx={{ color: 'black.main' }}
              key={`drawer-text-${idx}`}
              text={text}
            />
          </ListItem>
          <Divider
            sx={{
              mx: { mobile: 2, [breakpoint]: 0 },
              borderColor: 'neutral.main',
              position: 'absolute',
              left: 0,
              width: { mobile: 'calc(100% - 32px)', [breakpoint]: '100%' },
            }}
          />
        </Box>
      ))}
    </List>
  )
}
export default DrawerTextList
