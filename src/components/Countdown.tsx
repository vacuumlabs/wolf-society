import { useContentful, ContentTypes } from '@/utils/hooks/useContentful'
import { useEffect, useRef, useState } from 'react'

interface CountdownProps {
  deadline: Date
}

export const Countdown = ({ deadline }: CountdownProps) => {
  const translate = useContentful(ContentTypes.common)
  const [remaining, setRemaining] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout>()

  const timeToDisplayText = (time: number, title: string) => {
    if (time === 0) {
      return ''
    }

    return `${time}${title}`
  }

  function diff(a: Date, b: Date) {
    const ms = a.getTime() - b.getTime()
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const h = Math.floor(m / 60)
    const d = Math.floor(h / 24)
    const sx = translate('secondsShort')
    const mx = translate('minutesShort')
    const hx = translate('hoursShort')
    const dx = translate('daysShort')
    return (
      [
        [d, dx],
        [h % 24, hx],
        [m % 60, mx],
        [s % 60, sx],
      ] as [number, string][]
    )
      .map(([time, title]) => {
        return timeToDisplayText(time, title)
      })
      .join(' ')
  }

  useEffect(() => {
    const refreshCountdown = () => {
      if (deadline.getTime() > new Date().getTime()) {
        setRemaining(diff(deadline, new Date()))
        timeoutRef.current = setTimeout(refreshCountdown, 1000)
      } else {
        setRemaining('')
      }
    }
    refreshCountdown()
    return () => clearTimeout(timeoutRef.current)
  }, [deadline])
  return <> {remaining} </>
}
