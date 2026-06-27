
import type { Request, Response } from "express";
import { GoogleVision } from "./GoogleVision.js";


export const Geocoding = async (req: Request, res: Response) => {
  const { lat, lng } = req.query

  if (!lat || !lng) {
    return res.status(400).json({ message: "Missing fields!" })
  }

  const angles = [
    { heading: 0,   pitch: 15, direction: 'North' },
    { heading: 90,  pitch: 15, direction: 'East'  },
    { heading: 180, pitch: 15, direction: 'South' },
    { heading: 270, pitch: 15, direction: 'West'  },
  ]

  const streetUrls = angles.map(({ heading, pitch }) =>
    `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${lat},${lng}&radius=50&source=outdoor&heading=${heading}&pitch=${pitch}&fov=60&key=${process.env.GOOGLE_MAP_API}`
  )


  const visionResults = await Promise.all(streetUrls.map(url => GoogleVision(url, false)))

  return res.status(200).json({
    images: streetUrls.map((url, i) => ({
      url,
      heading:   angles[i]?.heading,
      direction: angles[i]?.direction,
      vision:    visionResults[i],
    }))
  })
}