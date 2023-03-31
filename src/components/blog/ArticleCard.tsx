import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import {
  Box,
  BreakpointOverrides,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import Button from '../Button'
import ArrowTurnTopIcon from '../icons/ArrowTurnTopIcon'

export type ArticleCardProps = {
  title: string
  content: string
  pubDate: string
  thumbnail: string
  link: string
  author: string
  categories: string[]
}

const MAX_CATEGORIES = 1

const ArticleCard = ({
  title,
  pubDate,
  thumbnail,
  link,
  categories,
}: ArticleCardProps) => {
  const translate = useContentful(ContentTypes.common)
  const breakpoint: keyof BreakpointOverrides = 'desktopS'

  return (
    <Card
      sx={{
        bgcolor: 'neutral.main',
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        '& .MuiCardContent-root': {
          mobile: {},
          [breakpoint]: { translate: '0 0' },
        },
        '&:hover .MuiCardContent-root': {
          mobile: {},
          [breakpoint]: { translate: '0 -48px' },
          desktopM: { translate: '0 -56px' },
        },
      }}
    >
      <Link
        href={link}
        target="_blank"
        style={{ textDecoration: 'none', color: 'inherit', height: 'inherit' }}
      >
        <CardActionArea
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="img"
            height="240"
            image={thumbnail}
            alt="hmm"
            sx={{ zIndex: 10 }}
          />
          <CardContent
            sx={{
              p: 0,
              transition: 'translate 0.25s',
              flexGrow: 1,
              width: '100%',
              display: { mobile: 'flex', [breakpoint]: 'block' },
              flexDirection: 'column',
            }}
          >
            <Stack
              sx={{
                textAlign: 'start',
                p: 4,
                pt: 3,
                height: { mobile: 'auto', [breakpoint]: '100%' },
                flexGrow: 1,
              }}
              gap={3}
              justifyContent="space-between"
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2S" color="black">
                  {pubDate}
                </Typography>
                <Typography variant="body2S" color="black">
                  {categories.slice(0, MAX_CATEGORIES).join(', ')}
                </Typography>
              </Stack>
              <Typography variant="caption" color="black">
                {title}
              </Typography>
            </Stack>
            <Box
              sx={{
                width: '100%',
                position: { mobile: 'relative', [breakpoint]: 'absolute' },
                transition: 'translate 0.25s',
                left: 0,
              }}
            >
              <Button
                component="div"
                sx={{
                  width: '100%',
                }}
                endIcon={<ArrowTurnTopIcon />}
                iconatend={1}
              >
                {translate('readMore')}
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}
export default ArticleCard
