import { useEffect } from 'react'

export const useIntersectionObserver = (
  selector: string,
  onIntersection: (isIntersecting: boolean) => void
) =>
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => onIntersection(entry.isIntersecting),
      { root: null, rootMargin: '0px', threshold: 0 }
    )

    const element = document.querySelector(selector)

    if (element != null) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [selector, onIntersection])
