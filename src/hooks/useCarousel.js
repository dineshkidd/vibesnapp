
import { useState } from "react"

export function useCarousel() {
  const [api, setApi] = useState()
  const [selectedIndex, setSelectedIndex] = useState(0)

  return {
    selectedIndex,
    setSelectedIndex,
    api: {
      current: api,
      setApi,
    },
  }
}
