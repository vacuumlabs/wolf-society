import { useEffect } from 'react'

type OnScreenProps = {
  setIntersecting: (arg0: boolean) => void
  selector: string
}

export const OnScreen = ({setIntersecting, selector }: OnScreenProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { root: null, rootMargin: '0px', threshold: 0 })

    const element = document.querySelector(selector)

    if (element != null) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return null

}