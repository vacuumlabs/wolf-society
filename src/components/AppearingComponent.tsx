import { useEffect, useRef } from 'react'

const AppearingComponent = ({ children }: React.PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [ref])

  return (
    <div ref={ref} className="show">
      {children}
    </div>
  )
}
export default AppearingComponent
