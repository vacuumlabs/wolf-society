import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { Stack } from '@mui/system'
import parse from 'html-react-parser'

export type TPost = {
  title: string
  content: string
  pubDate: string
  thumbnail: string
  link: string
}

const MEDIUM_SNIPPET_CLASS = 'medium-feed-snippet'

const Post = ({ thumbnail, pubDate, title, content, link }: TPost) => {
  const [formattedDate, setFormattedDate] = React.useState('')
  React.useEffect(() => {
    setFormattedDate(
      new Date(pubDate).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    )
  }, [pubDate])

  let description = <></>
  try {
    description = (parse(content) as JSX.Element).props.children.filter(
      (child: any) =>
        child.props && child.props.className.includes(MEDIUM_SNIPPET_CLASS)
    )
  } catch (err: any) {
    console.error(`Error occured when trying to parse post snippet ${err}`)
  }

  return (
    <Card elevation={12} sx={{ width: '100%', my: 2, p: 1 }}>
      <CardActionArea href={link} target="_blank">
        <Stack direction="row">
          <CardMedia
            component="img"
            sx={{ width: '50%', height: 'auto' }}
            image={thumbnail}
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              {title}
            </Typography>
            <Typography variant="caption">{formattedDate}</Typography>
            <Typography variant="h6">{description}</Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}

export default Post
