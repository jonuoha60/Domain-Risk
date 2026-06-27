import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })

export const RiskScanner = async (req: Request, res: Response) => {
  const { categories, factors, safeSearch } = req.body

  if (!categories || !factors || !safeSearch) {
    return res.status(400).json({ message: "Fields are missing!" })
  }

  try {
    const factorList = factors
      .map((f: any) => `${f.description} (${f.score}%)`)
      .join(', ')

    const safeSearchList = Object.entries(safeSearch)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')

    const customMessage = `
      You are a location risk analysis AI. Analyze the following data collected from 
      Google Vision API street view scans of a location and return a risk report.

      Detected scene labels: ${factorList}

      Safe search results: ${safeSearchList}

      Analyze risk for these categories: ${categories.join(', ')}

      Return ONLY a valid JSON array with no markdown, no explanation, no backticks:
      [
        {
          "category": "fire",
          "score": 23,
          "level": "low",
          "summary": "No visible fire hazards detected. Area appears residential with no industrial activity."
        }
      ]

      Rules:
      - score is 0-100
      - level is "low" (0-33), "medium" (34-66), or "high" (67-100)
      - summary is 1-2 sentences explaining the risk rating
      - only include the requested categories: ${categories.join(', ')}
    `

    const interaction = await ai.models.generateContent({
      model:    "gemini-2.5-flash",
      contents: customMessage,
    })

    const text = interaction.text

    if (!text) {
      console.error("No response from Gemini")
      return res.status(500).json({ message: "No response from Gemini" })
    }

    console.log("Gemini response:", text)

    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())

    return res.status(200).json({ risks: parsed })

  } catch (err: any) {
      if (err.status === 429) {
    return res.status(429).json({
      error: "Gemini API credits exhausted"
    });
  }
    console.error("Error in /riskScan: ", err)
    return res.status(500).json({ message: "Server error" })
  }
}