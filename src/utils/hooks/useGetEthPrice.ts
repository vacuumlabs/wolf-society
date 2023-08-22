import { useEffect, useState } from 'react'

type CurrentPriceResponse = {
  current_price: number
}[]

export const useGetEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(0)

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum'
        )
        const [{ current_price }] = (await res.json()) as CurrentPriceResponse

        setEthPrice(current_price)
      } catch (err) {
        console.error(err)
      }
    }

    fetchEthPrice()
  }, [])

  return ethPrice
}
