import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { Geocoding } from "./controllers/Geocoding.js";
import { RiskScanner } from "./controllers/RiskScanner.js";
import { Weather } from "./controllers/Weather.js";
import multer from "multer"
import { GoogleVision } from "./controllers/GoogleVision.js";

dotenv.config()
const app = express();

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});


app.get("/", async(req, res) => {
    res.send("Hello")
})

app.get("/geocode", Geocoding)
app.get("/weather", Weather)
app.post("/riskScan", RiskScanner)
app.post("/riskScan/image", upload.single('image'), async(req, res) => {
    if(!req.file) return res.status(400).json({ message: 'No image provided' })

    const base64     = req.file.buffer.toString('base64')
    const categories = JSON.parse(req.body.categories ?? '[]')

    const visionResult = await GoogleVision(base64, true)

    console.log("VISION RESULT: ", visionResult)

  // then pass to RiskScanner

  return res.status(200).json({ vision: visionResult, image: base64 })
})



app.listen(3000, () => {
    console.log("Server running");
});