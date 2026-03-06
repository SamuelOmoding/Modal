// src/components/Portfolio.jsx
import { useState, useRef, useEffect } from 'react'

import photo1 from '../assets/photo-1.jpeg'
import photo2 from '../assets/photo-2.jpeg'
import photo3 from '../assets/photo-3.jpeg'
import photo4 from '../assets/photo-4.jpeg'
import photo5 from '../assets/photo-5.jpeg'
import photo6 from '../assets/photo-6.jpeg'
import photo7 from '../assets/photo-7.jpeg'
import photo8 from '../assets/photo-8.jpeg'
import photo9 from '../assets/photo-9.jpeg'
import photo10 from '../assets/photo-4.jpeg'
import photo11 from '../assets/photo-11.jpeg'

//--marquee strip--
import m1 from '../assets/m/m1.png'
import m2 from '../assets/m/m2.png'
import m3 from '../assets/m/m3.png'
import m4 from '../assets/m/m4.png'
import m5 from '../assets/m/m5.png'
import m6 from '../assets/m/m6.png'
import m7 from '../assets/m/m7.png'
import m8 from '../assets/m/m8.png'
import m9 from '../assets/m/m9.png'
import m10 from '../assets/m/m10.png'
import m11 from '../assets/m/m11.png'
import m12 from '../assets/m/m12.png'
import m13 from '../assets/m/m13.png'
import m14 from '../assets/m/m14.png'
import m15 from '../assets/m/m15.png'
import m16 from '../assets/m/m16.png'
import m17 from '../assets/m/m17.png'
import m18 from '../assets/m/m18.png'
import m19 from '../assets/m/m19.png'
import m20 from '../assets/m/m20.JPG'
import m21 from '../assets/m/m21.png'
import m22 from '../assets/m/m22.png'
import m23 from '../assets/m/m23.png'
import m24 from '../assets/m/m24.png'
import m25 from '../assets/photo-10.jpeg'
import m26 from '../assets/m/m26.png'
import { i } from 'framer-motion/client'

const PHOTOS = [
  { id: 1,  src: photo1,  label: 'Featured',   category: 'Editorial',          featured: true  },
  { id: 2,  src: photo2,  label: 'Lifestyle',   category: 'Lifestyle',          featured: false },
  { id: 3,  src: photo3,  label: 'Fashion',     category: 'Fashion',            featured: false },
  { id: 4,  src: photo4,  label: 'Commercial',  category: 'Commercial',         featured: false },
  { id: 5,  src: photo5,  label: 'Corporate',   category: 'Corporate Branding', featured: false },
  { id: 6,  src: photo8,  label: 'Tourism',     category: 'Tourism Campaign',   featured: false },
  { id: 7,  src: photo6,  label: 'Studio',      category: 'Studio',             featured: false },
  { id: 8,  src: photo7,  label: 'Fitness',     category: 'Fitness',            featured: false },
  { id: 9,  src: photo9,  label: 'Portrait',    category: 'Portrait',           featured: false },
  { id: 10, src: photo10, label: 'Brand',       category: 'Brand',              featured: false },
  { id: 11, src: photo11, label: 'Night Shot',      category: 'NS',             featured: false },
]

//--Marquee photos--
const MARQUEE_ONLY = [
  { id: 11, src: m1,  label: 'Behind the Lens', category: 'BTS' },
  { id: 12, src: m2,  label: 'Urban Jungle',       category: 'Street'    },
  { id: 13, src: m4,  label: 'Outdoor',       category: 'Nature'    },
  { id: 14, src: m3,  label: 'Street Style',        category: 'Lifestyle'  },
  { id: 15, src: m5,  label: 'Casual',   category: 'Landscape' },
  { id: 16, src: m6,  label: 'Nature',        category: 'Nature'    },
  { id: 17, src: m7,  label: 'Event',     category: 'Event'    },
  { id: 18, src: m8,  label: 'Rural Charm',        category: 'Lifestyle'  },
  { id: 19, src: m9,  label: 'Architectural Lines',category: 'Architecture' },
  { id: 20, src: m10, label: 'Fashion', category: 'Fashion'    },
  { id: 21, src: m11, label: 'Studio',   category: 'Corporate'   },
  { id: 22, src: m12, label: 'Night Sky',          category: 'Astrophotography' },
  { id: 23, src: m13, label: 'Street Portraits',   category: 'Street'     },
  { id: 24, src: m14, label: 'Nature’s Textures',   category: 'Nature'     },
  { id: 25, src: m15, label: 'Urban Reflections',   category: 'Street'     },
  { id: 26, src: m16, label: 'Seaside Serenity',   category: 'Seascape'   },
  { id: 27, src: m17, label: 'Cultural Heritage',   category: 'Event'      },
  { id: 28, src: m18, label: 'Wildlife in Action', category: 'Wildlife'   },
  { id: 29, src: m19, label: 'Star Trails',        category: 'Astrophotography' },
  { id: 30, src: m20, label: 'Autumn Colors',      category: 'Nature'     },
  { id: 31, src: m21, label: 'Cityscapes at Dusk', category: 'Street'     },
  { id: 32, src: m22, label: 'Macro Nature',        category: 'Nature'     },
  { id: 33, src: m23, label: 'Cultural Street Art', category: 'Street'    },
  { id: 34, src: m24, label: 'Misty Landscapes',   category: 'Landscape'  },
  { id: 35, src: m25, label: 'Street Adventures',    category: 'Street'     },
  { id: 36, src: m26, label: 'Urban Exploration',  category: 'Street'     },
]

// Duplicate for seamless infinite loop
const MARQUEE_PHOTOS = [...MARQUEE_ONLY, ...MARQUEE_ONLY]

export default function Portfolio() {
  const [hovered, setHovered]   = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [paused, setPaused]     = useState(false)
  const marqueeRef              = useRef(null)

  const openLightbox  = (photo) => setLightbox(photo)
  const closeLightbox = () => setLightbox(null)

  const prev = () => {
    const idx = PHOTOS.findIndex(p => p.id === lightbox.id)
    setLightbox(PHOTOS[(idx - 1 + PHOTOS.length) % PHOTOS.length])
  }

  const next = () => {
    const idx = PHOTOS.findIndex(p => p.id === lightbox.id)
    setLightbox(PHOTOS[(idx + 1) % PHOTOS.length])
  }

  return (
    <>
      <style>{`

        /* ── SECTION ── */
        .portfolio-section {
          padding: 60px 0;
          background: var(--deep-black);
          overflow: hidden;
        }

        /* ── HEADER ── */
        .portfolio-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 24px;
          padding: 0 60px;
        }

        .portfolio-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 7vw, 100px);
          line-height: 1;
          color: var(--warm-white);
          letter-spacing: 3px;
        }

        .portfolio-title span {
          display: block;
          color: var(--gold);
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.5em;
          letter-spacing: 2px;
          margin-bottom: 4px;
        }

        .portfolio-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-style: italic;
          color: rgba(245,237,216,0.4);
          letter-spacing: 1px;
          padding-bottom: 8px;
        }

        /* ── STATIC GRID ── */
        .portfolio-grid-wrap {
          padding: 0 60px;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .portfolio-item-featured {
        aspect-ratio: 4 / 5;
          grid-column: span 1;
          grid-row: span 1;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: var(--charcoal);
          max-height: unset;
        }

        .portfolio-item {
          aspect-ratio: 4 / 5;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: var(--charcoal);
        }

        .portfolio-item img,
        .portfolio-item-featured img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.7s ease;
        }

        .portfolio-item:hover img,
        .portfolio-item-featured:hover img { transform: scale(1.05); }

        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,5,0.88) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s;
          display: flex;
          align-items: flex-end;
          padding: 24px;
          z-index: 2;
        }

        .portfolio-item:hover .portfolio-overlay,
        .portfolio-item-featured:hover .portfolio-overlay { opacity: 1; }

        .overlay-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        }

        .overlay-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          color: var(--cream);
        }

        .overlay-label span {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 5px;
          font-style: normal;
        }

        .overlay-expand {
          width: 36px; height: 36px;
          border: 1px solid rgba(201,168,76,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .overlay-expand:hover { background: rgba(201,168,76,0.15); }

        .photo-number {
          position: absolute;
          top: 14px; left: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--gold);
          background: rgba(10,8,5,0.6);
          padding: 4px 10px;
          z-index: 3;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(201,168,76,0.2);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .portfolio-item:hover .photo-number,
        .portfolio-item-featured:hover .photo-number { opacity: 1; }

        /* ── MARQUEE DIVIDER ── */
        .marquee-divider {
          display: flex;
          align-items: center;
          gap: 24px;
          margin: 56px 60px 40px;
        }

        .marquee-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.12);
        }

        .marquee-divider-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold);
          white-space: nowrap;
          opacity: 0.7;
        }

        /* ── MARQUEE STRIP ── */
        .marquee-outer {
          width: 100%;
          overflow: hidden;
          position: relative;
          /* Fade edges */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          gap: 10px;
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }

        .marquee-track.paused {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── MARQUEE CARD ── */
        .marquee-card {
          position: relative;
          width: 220px;
          height: 300px;
          flex-shrink: 0;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(201,168,76,0.06);
          transition: border-color 0.3s, transform 0.4s;
        }

        .marquee-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: scale(1.03);
          z-index: 2;
        }

        .marquee-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.6s ease;
        }

        .marquee-card:hover img { transform: scale(1.08); }

        /* Overlay on marquee card */
        .marquee-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,5,0.85) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          z-index: 2;
        }

        .marquee-card:hover .marquee-card-overlay { opacity: 1; }

        .marquee-card-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          color: var(--cream);
        }

        .marquee-card-cat {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 4px;
          display: block;
        }

        /* Pause hint */
        .marquee-hint {
          text-align: center;
          margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.3);
        }

        /* ── LIGHTBOX ── */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5,4,2,0.96);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          backdrop-filter: blur(6px);
        }

        .lightbox-inner {
          position: relative;
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .lightbox-img-wrap {
          position: relative;
          width: 100%;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img-wrap img {
          max-height: 80vh;
          max-width: 100%;
          object-fit: contain;
          display: block;
          border: 1px solid rgba(201,168,76,0.12);
        }

        .lightbox-close {
          position: absolute;
          top: -16px; right: -16px;
          width: 40px; height: 40px;
          background: var(--deep-black);
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
          z-index: 10;
        }

        .lightbox-close:hover { background: var(--gold); color: var(--deep-black); }

        .lightbox-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .lightbox-nav-btn {
          width: 44px; height: 44px;
          border: 1px solid rgba(201,168,76,0.3);
          background: transparent;
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
        }

        .lightbox-nav-btn:hover {
          background: rgba(201,168,76,0.1);
          border-color: var(--gold);
        }

        .lightbox-meta { text-align: center; }

        .lightbox-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 4px;
          color: var(--gold);
          display: block;
        }

        .lightbox-category {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-style: italic;
          color: rgba(245,237,216,0.5);
          display: block;
          margin-top: 4px;
        }

        .lightbox-counter {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(245,237,216,0.3);
          text-transform: uppercase;
          margin-top: 8px;
          display: block;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .portfolio-section   { padding: 60px 0; }
          .portfolio-header    { padding: 0 24px; margin-bottom: 32px; flex-direction: column; align-items: flex-start; }
          .portfolio-grid-wrap { padding: 0 24px; }
          .portfolio-grid      { grid-template-columns: repeat(2, 1fr); gap: 6px; }
          .portfolio-item-featured { grid-column: span 2; max-height: 320px; }
          .marquee-divider     { margin: 40px 24px 28px; }
          .marquee-card        { width: 160px; height: 220px; }
        }

        @media (max-width: 420px) {
          .portfolio-grid      { grid-template-columns: repeat(2, 1fr); }
          .marquee-card        { width: 140px; height: 190px; }
        }
      `}</style>

      <section className="portfolio-section" id="portfolio">

        {/* ── Header ── */}
        <div className="portfolio-header">
          <h2 className="portfolio-title">
            <span>African Couzin</span>
            Portfolio Gallery
          </h2>
          <p className="portfolio-count">{PHOTOS.length} photographs</p>
        </div>

        {/* ── Static Grid ── */}
        <div className="portfolio-grid-wrap">
          <div className="portfolio-grid">
            {PHOTOS.map((photo, i) => {
              const isFeatured = photo.featured
              const cls = isFeatured ? 'portfolio-item-featured' : 'portfolio-item'
              return (
                <div
                  key={photo.id}
                  className={cls}
                  onMouseEnter={() => setHovered(photo.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => openLightbox(photo)}
                >
                  <img src={photo.src} alt={`AfricanCouzin — ${photo.label}`} />
                  <div className="photo-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="portfolio-overlay">
                    <div className="overlay-inner">
                      <div className="overlay-label">
                        <span>{photo.category}</span>
                        {photo.label}
                      </div>
                      <div className="overlay-expand">
                        <svg width="14" height="14" fill="none" stroke="currentColor"
                          strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="marquee-divider">
          <div className="marquee-divider-line" />
          <span className="marquee-divider-label">All Shots</span>
          <div className="marquee-divider-line" />
        </div>

        {/* ── Auto-Scroll Marquee Strip ── */}
        <div
          className="marquee-outer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={marqueeRef}
            className={`marquee-track ${paused ? 'paused' : ''}`}
          >
            {MARQUEE_PHOTOS.map((photo, i) => (
              <div
                key={`${photo.id}-${i}`}
                className="marquee-card"
                onClick={() => openLightbox(photo)}
              >
                <img src={photo.src} alt={photo.label} />
                <div className="marquee-card-overlay">
                  <div>
                    <span className="marquee-card-cat">{photo.category}</span>
                    <span className="marquee-card-label">{photo.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pause hint */}
        <p className="marquee-hint">Hover to pause · Click to expand</p>

      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <div className="lightbox-img-wrap">
              <img src={lightbox.src} alt={lightbox.label} />
              <button className="lightbox-close" onClick={closeLightbox}>
                <svg width="14" height="14" fill="none" stroke="currentColor"
                  strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="lightbox-nav">
              <button className="lightbox-nav-btn" onClick={prev}>
                <svg width="16" height="16" fill="none" stroke="currentColor"
                  strokeWidth="1.5" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <div className="lightbox-meta">
                <span className="lightbox-label">{lightbox.label}</span>
                <span className="lightbox-category">{lightbox.category}</span>
                <span className="lightbox-counter">
                  {PHOTOS.findIndex(p => p.id === lightbox.id) + 1} / {PHOTOS.length}
                </span>
              </div>
              <button className="lightbox-nav-btn" onClick={next}>
                <svg width="16" height="16" fill="none" stroke="currentColor"
                  strokeWidth="1.5" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}




