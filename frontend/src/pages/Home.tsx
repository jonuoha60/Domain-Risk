// src/pages/Home.tsx
import React, { useRef } from 'react'
import "../constants/css/style.css"
import { CHIPS, PERKS, STATS, GOAL_CARDS, NAV_LINKS, DEFAULT_ACTIVE_CHIPS } from '../constants'
import { ICON_MAP } from '../constants/icons'
import { GeminiIcon, ScanIcon, UploadIcon } from '../components/Icons/Icon'
import { SearchInput } from '../components/input/SearchInput'
import { useState } from 'react'
import { useAddressInput } from '../hooks/useAddressInput'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [activeChips, setActiveChips] = useState<string[]>(DEFAULT_ACTIVE_CHIPS)
  const fileRef                       = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const {
    coords,
    inputValue,
    selectedPlace,
    handlePlaceSelect,
    handleInputChange,
  } = useAddressInput()

  const toggleChip = (id: string) => {
    setActiveChips(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }


const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)
  formData.append('categories', JSON.stringify(activeChips))

  navigate('/scan', {
    state: {
      address: 'Uploaded image',
      categories: activeChips,
      coords: null,
      uploadedFile: file,   
    }
  })
}



const handleScan = () => {
  if (!selectedPlace) return

  navigate('/scan', {
    state: {
      address: inputValue,
      categories: activeChips,
      coords
    }
  })
}

  return (
    <div className="home-page">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <a href="/" className="navbar-logo">
          <span className="navbar-logo-dot" />
          Domain Risk
        </a>
        <div className="navbar-links">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <button className="nav-btn">Sign in</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">
          <GeminiIcon />
          Powered by Gemini Vision
        </div>

        <h1>Know the <em>risks</em> before<br />you walk in.</h1>
        <p className="hero-sub">
          Search any address — workplace, home, school, or venue — and get
          an AI-powered risk snapshot in seconds.
        </p>

        <div className="search-card">
          <div className="search-row">
            <SearchInput
              className="addr-input"
              type="text"
              placeholder="Enter an address, place name, or postal code…"
              value={inputValue}
              callFunc={handleInputChange}
              onPlaceSelect={handlePlaceSelect}
            />
            <button
              className="scan-btn"
              onClick={handleScan}
              disabled={!selectedPlace}
            >
              <ScanIcon />
              Scan
            </button>
          </div>

          <div className="chips-row">
            {CHIPS.map(chip => (
              <button
                key={chip.id}
                className={`chip ${activeChips.includes(chip.id) ? 'active' : ''}`}
                onClick={() => toggleChip(chip.id)}
              >
                {ICON_MAP[chip.iconName]}
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="upload-zone" onClick={() => fileRef.current?.click()}>
          <UploadIcon />
          <p>Drag & drop a photo of the place, or <span>browse</span></p>
          <input
  ref={fileRef}
  type="file"
  accept="image/*"
  style={{ display: 'none' }}
  onChange={handleFileUpload}
  
/>
        </div>


      </section>

      {/* ── Stats strip ── */}
      <div className="stats-strip">
        {STATS.map(stat => (
          <div key={stat.lbl} className="stat-box">
            <div className={`stat-num${stat.green ? ' green' : ''}`}>{stat.num}</div>
            <div className="stat-lbl">{stat.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Why section ── */}
      <section className="why-section">
        <div className="why-header">
          <p className="why-eyebrow">Why Domain Risk</p>
          <h2>Risk doesn't announce itself.<br />We surface it for you.</h2>
          <p className="why-sub">
            Whether you're renting, working, studying, or just visiting — every
            location carries hidden risks. Domain Risk brings them to light before
            they affect you.
          </p>
        </div>

        <div className="perks-grid">
          {PERKS.map(perk => (
            <div key={perk.id} className="perk-card">
              <div className="perk-icon-wrap">
                {ICON_MAP[perk.iconName]}
              </div>
              <div className="perk-label">{perk.label}</div>
              <div className="perk-headline">{perk.headline}</div>
              <p className="perk-body">{perk.body}</p>
              <div className="perk-stats">
                {perk.stats.map(s => (
                  <div key={s.desc} className="perk-stat">
                    <span className="perk-stat-num">{s.num}</span>
                    <span className="perk-stat-desc">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Goal ── */}
      <section className="goal-section">
        <div className="goal-container">
          <p className="goal-eyebrow">Our goal</p>
          <h2>Make environmental risk visible before it affects your life.</h2>
          <p className="goal-sub">
            Most people only discover risks after moving in, starting a job, or enrolling in a school.
            We believe safety information should be as accessible as the address itself.
          </p>

          <div className="goal-grid">
            {GOAL_CARDS.map(card => (
              <div key={card.title} className="goal-card">
                <div className="goal-title">{card.title}</div>
                <p className="goal-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bottom-cta">
        <h2>Start with any address.</h2>
        <p>Free scans. No account needed.</p>
    
      </section>

    </div>
  )
}

export default Home