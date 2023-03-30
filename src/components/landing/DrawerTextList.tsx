import { List, ListItem, Typography } from '@mui/material'
import MuiMarkdown from 'mui-markdown'

type DrawerTextListProps = {
  texts: string[]
}

const DrawerTextList = ({ texts }: DrawerTextListProps) => {
  return (
    <List sx={{ listStyleType: 'square' }}>
      {texts.map((text) => (
        <ListItem
          divider
          key={text}
          sx={{
            display: 'list-item',
            fontSize: '24px',
            color: 'primary.main',
            py: 3,
            lineHeight: '0px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'black.main' }}>
            <MuiMarkdown>{text}</MuiMarkdown>
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}
export default DrawerTextList
