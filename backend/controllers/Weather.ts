import type { Request, Response } from "express";

export const Weather = async (req: Request, res: Response) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Missing fields!" });
  }

  try {
    const weatherUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${process.env.GOOGLE_WEATHER_API}&location.latitude=${lat}&location.longitude=${lng}`;

    const weatherRes = await fetch(weatherUrl);

    if (!weatherRes.ok) {
      return res.status(weatherRes.status).json({ message: "Weather API error", details: await weatherRes.text() });
    }

    const data = await weatherRes.json();

    return res.status(200).json({
      weather: {
        condition:    data.weatherCondition?.description?.text ?? null,
        icon:         data.weatherCondition?.iconBaseUri ? `${data.weatherCondition.iconBaseUri}.png` : null,
        temperature:  data.temperature ?? null,
        feelsLike:    data.feelsLikeTemperature ?? null,
        humidity:     data.relativeHumidity ?? null,
        uvIndex:      data.uvIndex ?? null,
        wind:         data.wind ?? null,
        precipitation: data.precipitation ?? null,
        isDaytime:    data.isDaytime ?? null,
        timeZone:     data.timeZone?.id ?? null,
      }
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message ?? "Internal server error" });
  }
};