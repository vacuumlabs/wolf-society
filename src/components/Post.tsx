import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Stack } from '@mui/system'

export type TPost = {
  title: string
  body: Document
  createdOn: string
  headerImageUrl: { fields: { file: { url: string } } }
}

const Post = ({ headerImageUrl, createdOn, title, body }: TPost) => (
  <Card elevation={12} sx={{ width: '100%', my: 2, p: 1 }}>
    <CardActionArea>
      <Stack direction="row">
        <CardMedia
          component="img"
          sx={{ width: '50%', height: 'auto' }}
          image={`https:${headerImageUrl?.fields?.file?.url}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {title}
          </Typography>
          <Typography variant="caption">
            {new Date(createdOn).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
          {documentToReactComponents(body)}
        </CardContent>
      </Stack>
    </CardActionArea>
  </Card>
)

export default Post
