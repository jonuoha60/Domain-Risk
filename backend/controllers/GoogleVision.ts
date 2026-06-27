import type { Request, Response } from "express";

// GoogleVision.ts
export const GoogleVision = async (input: string, isBase64 = false) => {
  let base64Image: string

  if (isBase64) {
    base64Image = input
  } else {
    const imageResponse = await fetch(input)
    if (!imageResponse.ok) throw new Error('Failed to fetch Street View image')
    const arrayBuffer = await imageResponse.arrayBuffer()
    base64Image = Buffer.from(arrayBuffer).toString('base64')
  }

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_MAP_API}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [{
          image: { content: base64Image },
          features: [
            { type: 'LABEL_DETECTION',     maxResults: 15 },
            { type: 'OBJECT_LOCALIZATION', maxResults: 15 },
            { type: 'TEXT_DETECTION' },
            { type: 'LANDMARK_DETECTION' },
            { type: 'SAFE_SEARCH_DETECTION' },
            { type: 'IMAGE_PROPERTIES' },
            { type: 'LOGO_DETECTION',      maxResults: 10 },
            { type: 'WEB_DETECTION' },
          ]
        }]
      })
    }
  )

  const data = await response.json()

  if (!response.ok || !data.responses) {
    throw new Error(data.error?.message ?? 'Vision API failed')
  }

  const result = data.responses[0]

  return {
    labels:     result.labelAnnotations               ?? [],
    objects:    result.localizedObjectAnnotations     ?? [],
    text:       result.textAnnotations?.[0]?.description ?? '',
    landmarks:  result.landmarkAnnotations            ?? [],
    safeSearch: result.safeSearchAnnotation           ?? {},
    colors:     result.imagePropertiesAnnotation?.dominantColors?.colors ?? [],
  }
}