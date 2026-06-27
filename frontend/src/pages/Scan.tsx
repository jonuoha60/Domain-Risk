import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRiskScan } from '../hooks/useRiskScan'
import { GeminiIcon, ScanIcon } from '../components/Icons/Icon'
import "../constants/css/style.css"
import "../constants/css/weather.css"
import { useGeocoding } from '../hooks/useGeocoding'
import { useWeather } from '../hooks/useWeather'

const Scan = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { address, categories, coords, uploadedFile
 } = location.state ?? {}

  const { images, loading, error, geocodingScan, riskFactors, safeSearch } = useGeocoding()
  const { riskScan, riskScanImage, results, loading: riskLoading, previewImage } = useRiskScan()
  const { weather, loading: weatherLoading, weatherScan } = useWeather()


  useEffect(() => {
    if (!coords?.lat || !coords?.lng) return
    geocodingScan(coords.lat, coords.lng)
    weatherScan(coords.lat, coords.lng)

  }, [coords])

  useEffect(() => {
    if (!categories || !safeSearch) return
    riskScan(categories, riskFactors, safeSearch)
  }, [riskFactors, safeSearch])

useEffect(() => {
  if (!uploadedFile) return

  riskScanImage(categories, uploadedFile)
}, [uploadedFile, categories, riskScanImage])
  

  if (!address) {
    return (
      <div className="scan-empty">
        <p>No address provided.</p>
        <button className="scan-btn" onClick={() => navigate('/')}>Go back</button>
      </div>
    )
  }

  return (
    <div className="scan-page">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <a href="/" className="navbar-logo">
          <span className="navbar-logo-dot" />
          Domain Risk
        </a>
        <button className="nav-btn" onClick={() => navigate('/')}>New scan</button>
      </nav>

      {/* ── Header ── */}
      <section className="scan-header">
        <div className="hero-badge">
          <GeminiIcon />
          Powered by Gemini Vision
        </div>
        <h1>Risk Report</h1>
        <p className="scan-address">{address}</p>
        <div className="scan-chips">
          {categories?.map((cat: string) => (
            <span key={cat} className="chip active">{cat}</span>
          ))}
        </div>
      </section>

      {/* ── Weather ── */}
      <section className="scan-results">
        <div className="results-header">
          <h2>Current Weather</h2>
          <p className="scan-results-sub">Live conditions at this location</p>
        </div>

        {weatherLoading && (
          <div className="scan-loading">
            <div className="spinner" />
            <p>Fetching weather…</p>
          </div>
        )}

        {weather && !weatherLoading && (
          <div className="weather-card">

            {/* Condition */}
            <div className="weather-main">
              {weather.icon && (
                <img src={weather.icon} alt={weather.condition ?? ''} className="weather-icon" />
              )}
              <div className="weather-condition">
                <span className="weather-label">{weather.condition ?? '—'}</span>
                <span className="weather-sub">{weather.isDaytime ? 'Daytime' : 'Nighttime'} · {weather.timeZone ?? ''}</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="weather-grid">
              <div className="weather-stat">
                <span className="weather-stat-label">Temperature</span>
                <span className="weather-stat-value">
                  {weather.temperature ? `${weather.temperature.degrees}° ${weather.temperature.unit === 'CELSIUS' ? 'C' : 'F'}` : '—'}
                </span>
              </div>
              <div className="weather-stat">
                <span className="weather-stat-label">Feels Like</span>
                <span className="weather-stat-value">
                  {weather.feelsLike ? `${weather.feelsLike.degrees}° ${weather.feelsLike.unit === 'CELSIUS' ? 'C' : 'F'}` : '—'}
                </span>
              </div>
              <div className="weather-stat">
                <span className="weather-stat-label">Humidity</span>
                <span className="weather-stat-value">
                  {weather.humidity != null ? `${weather.humidity}%` : '—'}
                </span>
              </div>
              <div className="weather-stat">
                <span className="weather-stat-label">UV Index</span>
                <span className="weather-stat-value">
                  {weather.uvIndex != null ? weather.uvIndex : '—'}
                </span>
              </div>
              <div className="weather-stat">
                <span className="weather-stat-label">Wind</span>
                <span className="weather-stat-value">
                  {weather.wind
                    ? `${weather.wind.speed.value} ${weather.wind.speed.unit.replace('_', ' ')} ${weather.wind.direction.cardinal}`
                    : '—'}
                </span>
              </div>
              <div className="weather-stat">
                <span className="weather-stat-label">Rain Chance</span>
                <span className="weather-stat-value">
                  {weather.precipitation ? `${weather.precipitation.probability.percent}%` : '—'}
                </span>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* ── Street View ── */}
      <section className="scan-view-section">
        {loading && (
          <div className="scan-loading">
            <div className="spinner" />
            <p>Fetching location view…</p>
          </div>
        )}
        {error && (
          <div className="scan-error">
            <p>Failed to load street view: {error}</p>
          </div>
        )}

        {images.length > 0 && !loading && (
          <div className="scan-images-grid">
            {images.map((img) => (
              <div key={img.direction} className="scan-map-wrap">
                <img src={img.url} alt={`${img.direction} street view`} className="scan-map" />
                <div className="scan-map-label">
                  <ScanIcon />
                  {img.direction}
                </div>
              </div>
            ))}
          </div>
        )}

        {previewImage && (
  <img
    src={previewImage}
    alt="Uploaded"
    style={{ width: '100%', borderRadius: 12 }}
  />
)}
      </section>

      {/* ── Gemini Risk Results ── */}
      <section className="scan-results">
        <div className="results-header">
          <h2>Risk Analysis</h2>
          <p className="scan-results-sub">
            {riskLoading ? 'Gemini is analyzing the location…' : 'Analysis complete'}
          </p>
        </div>

        {riskLoading && (
          <div className="scan-loading">
            <div className="spinner" />
            <p>Running risk analysis…</p>
          </div>
        )}

        {results && results.length > 0 && !riskLoading && (
          <div className="risk-grid">
            {results.map((risk: any) => (
              <div key={risk.category} className="risk-card">
                <div className="risk-card-header">
                  <span className="risk-label">{risk.category}</span>
                  <span className={`risk-badge ${risk.level}`}>{risk.level}</span>
                </div>
                <div className="risk-bar">
                  <div className={`risk-bar-fill ${risk.level}`} style={{ width: `${risk.score}%` }} />
                </div>
                <p className="risk-summary">{risk.summary}</p>
                <span className="risk-score">{risk.score}/100</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Vision Factors ── */}
      {riskFactors.length > 0 && (
        <section className="scan-results">
          <div className="results-header">
            <h2>Detected Scene Elements</h2>
            <p className="scan-results-sub">Objects and features identified by Google Vision</p>
          </div>
          <div className="factors-grid">
            {riskFactors.map((factor) => (
              <div key={factor.description} className="factor-row">
                <span className="factor-label">{factor.description}</span>
                <div className="factor-track">
                  <div
                    className="factor-fill"
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
                <span className="factor-pct">{factor.score}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Safe Search ── */}
      {safeSearch && (
        <section className="scan-results">
          <div className="results-header">
            <h2>Safety Signals</h2>
            <p className="scan-results-sub">Content safety detection across all angles</p>
          </div>
          <div className="safe-search">
            {Object.entries(safeSearch).map(([key, value]) => (
              <div key={key} className="safe-row">
                <span className="safe-label">{key}</span>
                <div className="safe-bar-wrap">
                  <div className="safe-bar">
                    <div className={`safe-bar-fill ${(value as string).toLowerCase().replace('_', '-')}`} />
                  </div>
                </div>
                <span className={`safe-badge ${(value as string).toLowerCase().replace('_', '-')}`}>
                  {(value as string).replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

export default Scan