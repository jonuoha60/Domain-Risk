# Domain Risk

Domain risk is the process of identifying and analyzing potential hazards or threats within a specific physical environment, such as a home, school, workplace, or public area. It involves evaluating conditions that could cause harm, damage, or unsafe situations.

This can include environmental risks (like fire hazards or structural damage), safety risks (like exposed wiring or blocked exits), and situational risks (like overcrowding or unsafe surroundings).

In more advanced systems, domain risk analysis may also use images of a location to visually detect and assess potential hazards, helping to generate a more accurate risk evaluation of the environment.

---
## Key Features

- **Google Vision Image Scanning**  
  Uses Google Vision API to analyze uploaded images and detect potential safety hazards, objects, and environmental conditions.

- **Geolocation Detection with Google Maps API**  
  Integrates Google Maps API to retrieve accurate location data for scanned environments.

- **Geocoding Support**  
  Converts addresses or place names into precise latitude and longitude coordinates for mapping and analysis.

- **AI-Powered Risk Analysis**  
  Combines visual data and location context to generate a risk assessment of the environment (e.g., home, school, workplace).

- **Location-Based Risk Mapping**  
  Displays detected risks on an interactive map to visualize unsafe areas or hazards.

- **Real-Time Environmental Scanning**  
  Allows users to upload or capture images and instantly receive a risk evaluation.

## Built With

### Frontend
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Google%20Maps%20API](https://img.shields.io/badge/Google%20Maps%20API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![Google%20Vision](https://img.shields.io/badge/Google%20Vision-34A853?style=for-the-badge&logo=googlecloud&logoColor=white)

### Prerequisites

Make sure you have the following installed on your machine:

- **Git**
- **Node.js**
- **npm**
- **Docker**

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jonuoha60/Domain-Risk.git
   cd Domain-Risk
   ```
   
2. **Install dependencies**
   
    Frontend
   
   ```bash
   cd frontend
   npm install
   ```
    Backend
   ```bash
   cd backend
   npm install
   ```
3. **Set up environmental variables**

   Create a `.env` file in both the frontend and backend directories.

   Backend
   ```env
   GOOGLE_MAPS_API_KEY=
   GEMINI_API_KEY=
   GOOGLE_WEATHER_API=
   PORT=3000
   ```
     Frontend
     ```env
     VITE_API_URL=http://localhost:3000
     VITE_GOOGLE_MAP_API=
    ```
     
4. **Start development server**

   You can run both the frontend and backend using Docker with live reload enabled.

   #### Using Docker Compose

   ```bash
   docker compose up --build


## Usage

- **Get Risk Analysis**
  Upload an image or scan an environment to receive a full risk analysis of potential dangers such as fire hazards, unsafe wiring, structural risks, or environmental threats.

- **Check Surrounding Environment**
  Use location-based scanning to analyze a specific area (home, school, workplace, or public space) and identify nearby risks using geolocation data.

- **Weather Integration**
  View real-time current weather conditions for the selected location to understand environmental factors that may contribute to risk.

  
## Future Improvements
- Implement a login functionality to cater for user authentication and personalized risk analysis.

## License
Distributed under the MIT License. See `LICENSE` for more information.
