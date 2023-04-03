import { Box, Stack, Theme, Typography } from '@mui/material'
import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import StarDelimiter from '../icons/StarDelimiter'

interface HorizontalScrollTextProps {
  text: string
  numberOfItems: number
  offsetStep: number
  color: string
}

const calculateOffsets = (
  numberOfItems: number,
  elementWidth: number
): number[] => {
  return Array(numberOfItems)
    .fill(0)
    .map((_, index) => index * elementWidth)
}

export const HorizontalScrollText = ({
  text,
  numberOfItems,
  offsetStep,
  color,
}: HorizontalScrollTextProps) => {
  const textElemetnRef = useRef<HTMLDivElement>(null)
  const elementWidth = textElemetnRef?.current
    ? textElemetnRef.current.offsetWidth
    : 0
  const [offsets, setOffsets] = useState<Array<number>>([])

  useEffect(() => {
    const newOffsets = calculateOffsets(numberOfItems, elementWidth)
    setOffsets(newOffsets)
  }, [elementWidth, numberOfItems])

  useEffect(() => {
    const handleScroll = () => {
      const lastOffset = Math.max(...offsets)
      let newOffsets = offsets.map((offset) =>
        calculateOffset(offset, elementWidth, lastOffset, offsetStep)
      )
      if (
        Math.max(...newOffsets) === Math.min(...newOffsets) ||
        newOffsets.length === 0
      ) {
        newOffsets = calculateOffsets(numberOfItems, elementWidth)
      }
      setOffsets(newOffsets)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [elementWidth, numberOfItems, offsetStep, offsets])

  return (
    <Stack
      direction={'row'}
      height={{ mobile: 80, desktopM: 196 }}
      position="relative"
    >
      {offsets.map((offset, index) => (
        <HorizontalScrollTextItem
          myRef={textElemetnRef}
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
  myRef: RefObject<HTMLDivElement>
}

const HorizontalScrollTextItem = ({
  leftOffset,
  text,
  elementWidth,
  color,
  myRef,
}: HorizontalScrollTextItemProps) => {
  return (
    <Stack
      direction={'row'}
      ref={myRef}
      style={{ transform: `translate(${leftOffset}px, 0px)` }}
      sx={{
        textAlign: 'left',
        position: 'absolute',
        transition:
          //prevent animation when object are moved back at the end of scroll effect
          leftOffset < globalThis.window?.innerWidth + elementWidth &&
          leftOffset > -2 * elementWidth
            ? 'all 1s ease-out'
            : 'none',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="overline"
        color={color}
        sx={{
          display: 'inline-flex',
          alignAitems: 'center',
        }}
      >
        {text.replace(' ', '\u00a0')}
      </Typography>
      <StarDelimiter
        sx={{
          fontSize: { mobile: 50, desktopM: 160 },
          color,
        }}
      />
    </Stack>
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
