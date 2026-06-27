// src/hooks/useRiskScan.ts
import { useState, useCallback } from 'react'
import api from "../libs/utils/api"
import type { RiskCategory, riskFactor, SafeSearch } from '../types'

export const useRiskScan = () => {
  const [images, setImages] = useState<{ url: string; direction: string; heading: number }[]>([])
  const [results, setResults] = useState<RiskCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scanned, setScanned] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)


  // TEXT / ADDRESS SCAN
  // ─────────────────────────────
  const riskScan = useCallback(
    async (
      categories: string[],
      factors: riskFactor[],
      safeSearch: SafeSearch | null
    ) => {
      setLoading(true)
      setError(null)
      setScanned(false)

      try {
        const response = await api.post('/riskScan', {
          categories,
          factors,
          safeSearch,
        })

        setResults(response.data.risks)
        setScanned(true)
      } catch (err: any) {
        console.log("Error in scan:", err)
        setError(err.message ?? 'Scan failed')
      } finally {
        setLoading(false)
      }
    },
    []
  )


const riskScanImage = useCallback(
  async (categories: string[], file: File) => {
    setLoading(true)
    setError(null)
    setScanned(false)

    try {

      const formData = new FormData()
      formData.append('image', file)
      formData.append('categories', JSON.stringify(categories))

      const imageRes = await api.post('/riskScan/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const vision = imageRes.data.vision
      setPreviewImage(`data:image/jpeg;base64,${imageRes.data.image}`)

      const factors = (vision.labels ?? []).map((label: any) => ({
        description: label.description,
        score: Math.round(label.score * 100),
      }))


      const deduped = Object.values(
        factors.reduce((acc: any, item: any) => {
          if (
            !acc[item.description] ||
            acc[item.description].score < item.score
          ) {
            acc[item.description] = item
          }
          return acc
        }, {})
      ) as { description: string; score: number }[]

      const filtered = deduped.filter(f => f.score > 10)

     
      const riskRes = await api.post('/riskScan', {
        categories,
        factors: filtered,
        safeSearch: vision.safeSearch ?? {},
      })

      console.log("Risk Scanned Image: ", riskRes)

      setResults(riskRes.data.risks)
      setScanned(true)
    } catch (err: any) {
      console.log("Error in image scan pipeline:", err)
      setError(err.message ?? 'Image scan failed')
    } finally {
      setLoading(false)
    }
  },
  []
)

  const reset = useCallback(() => {
    setImages([])
    setResults([])
    setScanned(false)
    setError(null)
  }, [])

  return {
    images,
    results,
    loading,
    error,
    scanned,
    previewImage,
    riskScan,
    riskScanImage,
    reset,
  }
}