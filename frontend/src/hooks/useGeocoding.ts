import { useState, useCallback } from 'react'
import api from "../libs/utils/api"
import type { riskFactor, SafeSearch, SafeSearchLikelihood } from '../types'

export const useGeocoding = () => {
  const [images,      setImages]      = useState<{ url: string; direction: string }[]>([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)
  const [riskFactors, setRiskFactors] = useState<riskFactor[]>([])
  const [safeSearch,  setSafeSearch]  = useState<SafeSearch | null>(null)

  const geocodingScan = useCallback(async (lat: number, lng: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get('/geocode', { params: { lat, lng } })
      console.log("For risk factors: ", response.data)
      setImages(response.data.images)

      const factors = response.data.images.flatMap((img: any) =>
        img.vision?.labels?.map((label: any) => ({
          description: label.description,
          score:       Math.round(label.score * 100),
        })) ?? []
      )

      const deduped = Object.values(
        factors.reduce((acc: any, item: any) => {
          if (!acc[item.description] || acc[item.description].score < item.score) {
            acc[item.description] = item
          }
          return acc
        }, {})
      ) as { description: string; score: number }[]

      deduped.sort((a, b) => b.score - a.score)
      setRiskFactors(deduped)

      // aggregate safeSearch — take the worst (highest) rating across all angles
      const likelihood: SafeSearchLikelihood[] = [
        'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'VERY_LIKELY'
      ]

      const worst = (a: SafeSearchLikelihood, b: SafeSearchLikelihood): SafeSearchLikelihood =>
        likelihood.indexOf(a) >= likelihood.indexOf(b) ? a : b

      const merged = response.data.images.reduce((acc: SafeSearch, img: any) => {
        const ss = img.vision?.safeSearch
        if (!ss) return acc
        return {
          adult:    worst(acc.adult,    ss.adult),
          medical:  worst(acc.medical,  ss.medical),
          racy:     worst(acc.racy,     ss.racy),
          spoof:    worst(acc.spoof,    ss.spoof),
          violence: worst(acc.violence, ss.violence),
        }
      }, {
        adult:    'VERY_UNLIKELY',
        medical:  'VERY_UNLIKELY',
        racy:     'VERY_UNLIKELY',
        spoof:    'VERY_UNLIKELY',
        violence: 'VERY_UNLIKELY',
      } as SafeSearch)

      setSafeSearch(merged)

    } catch (err: any) {
      setError(err.message ?? 'Failed to fetch street view')
    } finally {
      setLoading(false)
    }
  }, [])

  return { images, loading, error, geocodingScan, riskFactors, safeSearch }
}