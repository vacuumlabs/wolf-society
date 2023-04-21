import { List, ListItem, Typography } from '@mui/material'
import TypographyWithTooltips from '../TypographyWithTooltips'

type DrawerTextListProps = {
  texts: string[]
}

const DrawerTextList = ({ texts }: DrawerTextListProps) => {
  return (
    <List sx={{ listStyleType: 'square' }}>
      {texts.map((text, idx) => (
        <ListItem
          divider
          key={text}
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
      ))}
    </List>
  )
}
export default DrawerTextList
