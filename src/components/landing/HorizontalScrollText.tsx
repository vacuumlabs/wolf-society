import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface HorizontalScrollTextProps {
  text: string
  numerOfItems: number
  elementWidth: number
  offsetStep: number
  color: string
  height: number
}

export const HorizontalScrollText = ({
  text,
  numerOfItems,
  elementWidth,
  offsetStep,
  color,
  height,
}: HorizontalScrollTextProps) => {
  const [offsets, setOffsets] = useState<Array<number>>(
    Array(numerOfItems)
      .fill(0)
      .map((_, index) => index * elementWidth)
  )

  useEffect(() => {
    const handleScroll = () => {
      const lastOffset = Math.max(...offsets)
      const newOffsets = offsets.map((offset) =>
        calculateOffset(offset, elementWidth, lastOffset, offsetStep)
      )
      setOffsets(newOffsets)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [elementWidth, offsetStep, offsets])

  return (
    <Stack direction={'row'} height={`${height}px`}>
      {offsets.map((offset, index) => (
        <HorizontalScrollTextItem
          key={index}
          text={text}
          leftOffset={offset}
          elementWidth={elementWidth}
          color={color}
        />
      ))}
    </Stack>
  )
}

interface HorizontalScrollTextItemProps {
  text: string
  leftOffset: number
  elementWidth: number
  color: string
}

const HorizontalScrollTextItem = ({
  leftOffset,
  text,
  elementWidth,
  color,
}: HorizontalScrollTextItemProps) => {
  return (
    <Typography
      variant="overline"
      display="inline-block"
      sx={{
        minWidth: `${elementWidth}px`,
        textAlign: 'left',
        position: 'absolute',
        left: leftOffset,
        transition:
          //prevent animation when object are moved back at the end of scroll effect
          leftOffset < globalThis.window?.innerWidth + elementWidth &&
          leftOffset > -2 * elementWidth
            ? 'all 1s ease-out'
            : 'none',
        color,
      }}
    >
      {text}
    </Typography>
  )
}

const calculateOffset = (
  currentOffset: number,
  elementWidth: number,
  lastOffset: number,
  offsetStep: number
): number => {
  //if object is out of screen move it back to the end
  if (currentOffset < -2 * elementWidth)
    return lastOffset + elementWidth - offsetStep
  //else shift it left
  return currentOffset - offsetStep
}
