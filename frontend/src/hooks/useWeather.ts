// src/hooks/useWeather.ts
import { useState, useCallback } from 'react'
import api from "../libs/utils/api"
import type { WeatherData } from '../types'

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const weatherScan = useCallback(async (lat: string, lng: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get('/weather', { params: { lat, lng } })
      setWeather(response.data.weather)
    } catch (err: any) {
      setError(err.message ?? 'Weather fetch failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setWeather(null)
    setError(null)
  }, [])

  return { weather, loading, error, weatherScan, reset }
}