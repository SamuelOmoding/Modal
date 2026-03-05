// src/components/Socials.jsx

const SOCIALS = [
  {
    id: 1,
    platform: 'Instagram',
    handle: '@african_couzin',
    url: 'https://www.instagram.com/african_couzin',
    description: 'Behind the scenes, campaigns & daily looks',
    color: '#E1306C',
    gradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 2,
    platform: 'TikTok',
    handle: '@african_cousin',
    url: 'https://www.tiktok.com/@african_cousin',
    description: 'Reels, brand collabs & modeling content',
    color: '#81545f',
    gradient: 'linear-gradient(135deg, #010101, #81545f)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    ),
  },
  {
    id: 3,
    platform: 'Facebook',
    handle: 'African Couzin',
    url: 'https://www.facebook.com/share/188BSDAe9A/',
    description: 'Portfolio updates & brand partnerships',
    color: '#1877F2',
    gradient: 'linear-gradient(135deg, #1877F2, #0a5dc2)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    id: 4,
    platform: 'X / Twitter',
    handle: '@african_couzin',
    url: 'https://www.x.com/african_couzin',
    description: 'Thoughts, industry news & updates',
    color: '#ffffff',
    gradient: 'linear-gradient(135deg, #1a1a1a, #333)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M4 4l16 16M4 20L20 4"/>
      </svg>
    ),
  },
  {
    id: 5,
    platform: 'LinkedIn',
    handle: '@african_couzin',
    url: 'https://www.linkedin.com/in/meshack-omoding-267a37330/',
    description: 'Professional network & brand collaborations',
    color: '#0A66C2',
    gradient: 'linear-gradient(135deg, #0A66C2, #084d91)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    id: 6,
    platform: 'WhatsApp',
    handle: '0729 298 595',
    url: 'https://wa.me/254729298595',
    description: 'Direct bookings & project enquiries',
    color: '#25D366',
    gradient: 'linear-gradient(135deg, #25D366, #128C7E)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7
          8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8
          8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    id: 7,
    platform: 'Linktree',
    handle: '@african_couzin',
    url: 'https://linktr.ee/african_couzin',
    description: 'All my socials in one place',
    color: '#43E55E',
    gradient: 'linear-gradient(135deg, #43E55E, #1e9e30)',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor"
        strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
]

export default function Socials() {
  return (
    <>
      <style>{`
        .socials-section {
          padding: 120px 60px;
          background: var(--warm-dark);
          position: relative;
          overflow: hidden;
        }

        .socials-section::before {
          content: 'CONNECT';
          position: absolute;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 200px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(201,168,76,0.04);
          top: 30px;
          right: -20px;
          pointer-events: none;
          letter-spacing: 10px;
          line-height: 1;
        }

        /* ── HEADER ── */
        .socials-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-end;
          margin-bottom: 80px;
        }

        .socials-section-label {
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .socials-section-label::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background: var(--gold);
        }

        .socials-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          line-height: 0.95;
          letter-spacing: 3px;
          color: var(--warm-white);
        }

        .socials-heading em {
          color: var(--gold);
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.65em;
          display: block;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .socials-intro {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          line-height: 1.9;
          color: rgba(245,237,216,0.6);
          align-self: flex-end;
        }

        /* ── GRID ── */
        .socials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* ── CARD ── */
        .social-card {
          display: flex;
          flex-direction: column;
          padding: 44px 36px;
          background: rgba(10,8,5,0.6);
          border: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.4s, border-color 0.4s, transform 0.3s;
        }

        .social-card:hover {
          transform: translateY(-2px);
        }

        /* Colored bottom bar — uses inline style for per-platform color */
        .social-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .social-card:hover::after {
          transform: scaleX(1);
        }

        /* Top-left color dot */
        .social-color-dot {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.6;
          transition: opacity 0.3s, transform 0.3s;
        }

        .social-card:hover .social-color-dot {
          opacity: 1;
          transform: scale(1.4);
        }

        /* Icon wrapper */
        .social-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          flex-shrink: 0;
        }

        .social-card:hover .social-icon-wrap {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        /* Platform name */
        .social-platform {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: var(--warm-white);
          margin-bottom: 6px;
          transition: color 0.3s;
        }

        /* Handle */
        .social-handle {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          opacity: 0.8;
          margin-bottom: 16px;
          transition: opacity 0.3s;
        }

        .social-card:hover .social-handle {
          opacity: 1;
        }

        /* Description */
        .social-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(245,237,216,0.4);
          line-height: 1.7;
          flex: 1;
          transition: color 0.3s;
        }

        .social-card:hover .social-desc {
          color: rgba(245,237,216,0.6);
        }

        /* Visit arrow */
        .social-arrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s, transform 0.3s;
        }

        .social-card:hover .social-arrow {
          opacity: 0.8;
          transform: translateX(0);
        }

        .social-arrow-line {
          height: 1px;
          width: 20px;
          transition: width 0.3s;
        }

        .social-card:hover .social-arrow-line {
          width: 32px;
        }

        /* ── BOTTOM CTA ── */
        .socials-cta {
          margin-top: 60px;
          padding-top: 48px;
          border-top: 1px solid rgba(201,168,76,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .socials-cta-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-style: italic;
          color: rgba(245,237,216,0.5);
          max-width: 480px;
          line-height: 1.7;
        }

        .socials-cta-text strong {
          color: var(--gold);
          font-weight: 400;
        }

        .socials-cta-email {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 4px;
          color: var(--deep-black);
          background: var(--gold);
          padding: 16px 36px;
          text-decoration: none;
          transition: background 0.3s;
          white-space: nowrap;
        }

        .socials-cta-email:hover {
          background: var(--gold-light);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .socials-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .socials-section { padding: 80px 30px; }
          .socials-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 48px; }
          .socials-section::before { font-size: 100px; }
          .socials-cta { flex-direction: column; align-items: flex-start; }
          .socials-cta-email { width: 100%; justify-content: center; }
        }

        @media (max-width: 560px) {
          .socials-section { padding: 60px 20px; }
          .socials-grid { grid-template-columns: 1fr; }
          .social-card { padding: 32px 24px; }
        }
      `}</style>

      <section className="socials-section" id="socials">

        {/* ── Header ── */}
        <div className="socials-header">
          <div>
            <p className="socials-section-label">Stay Connected</p>
            <h2 className="socials-heading">
              <em>Follow the</em>
              Journey
            </h2>
          </div>
          <p className="socials-intro">
            Follow along for behind-the-scenes content, campaign drops,
            and the story of a Nairobi model making his mark — one frame at a time.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="socials-grid">
          {SOCIALS.map(social => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              style={{
                borderColor: `${social.color}18`,    
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${social.color}10`
                e.currentTarget.style.borderColor = `${social.color}40`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(10,8,5,0.6)'
                e.currentTarget.style.borderColor = `${social.color}18`
              }}
            >
              {/* Colored dot — top right */}
              <div
                className="social-color-dot"
                style={{ background: social.color }}
              />

              {/* Icon with gradient background */}
              <div
                className="social-icon-wrap"
                style={{ background: social.gradient }}
              >
                <div style={{ color: '#fff' }}>
                  {social.icon}
                </div>
              </div>

              {/* Platform name */}
              <p
                className="social-platform"
                style={{ color: 'var(--warm-white)' }}
                onMouseEnter={e => e.currentTarget.style.color = social.color}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--warm-white)'}
              >
                {social.platform}
              </p>

              {/* Handle — colored */}
              <p
                className="social-handle"
                style={{ color: social.color }}
              >
                {social.handle}
              </p>

              {/* Description */}
              <p className="social-desc">{social.description}</p>

              {/* Arrow — colored */}
              <div className="social-arrow" style={{ color: social.color }}>
                <div
                  className="social-arrow-line"
                  style={{ background: social.color }}
                />
                Visit
              </div>

              {/* Bottom bar — colored, via pseudo via box-shadow trick */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 3,
                background: social.gradient,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scaleX(1)'}
              />

            </a>

          ))}
        </div>


        {/* ── Bottom CTA ── */}
        <div className="socials-cta">
          <p className="socials-cta-text">
            Prefer to reach out directly? Send an email for{' '}
            <strong>bookings, collaborations, and brand enquiries.</strong>
          </p>
          <a href="mailto:meshackomoding254@gmail.com" className="socials-cta-email">
            <svg width="14" height="14" fill="none" stroke="currentColor"
              strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Get In Touch
          </a>
        </div>

      </section>

    </>

  )
}





