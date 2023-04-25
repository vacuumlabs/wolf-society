import { RefObject, useEffect, useState } from 'react'

export const useOnScreen = (ref: RefObject<any>, rootMargin: string = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false)
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting)
        },
        {
          rootMargin,
        }
      )
      if (ref.current != null) {
        observer.observe(ref.current)
      }
      return () => {
          try {
            observer.unobserve(ref.current)
          } catch (e) {}
      }
    }, []) 
  
    return isIntersecting
  }