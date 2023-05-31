import { useEffect, useState } from 'react'

export const useGetEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(0)

  useEffect(() => {
    const fetchEthPrice = async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum'
      )
      const [{ current_price }]: { current_price: number }[] = await res.json()

      setEthPrice(current_price)
    }

    fetchEthPrice()
  }, [])

  return ethPrice
}
