// src/components/Hero.jsx
import { useEffect, useRef } from "react";
import photo9 from "../assets/photo-9.jpeg";

export default function Hero() {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    document.querySelectorAll(".hero-reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 300 + i * 200);
    });
  }, []);

  return (
    <>
      <style>{`
        .hero-section {
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
          background: var(--deep-black);
        }

        /* ── LEFT ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 60px 90px;
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
        }

        .hero-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 9vw, 130px);
          line-height: 0.9;
          letter-spacing: 2px;
          color: var(--warm-white);
        }

        .hero-name span {
          color: var(--gold);
          font-style: italic;
          font-family: 'Playfair Display', serif;
          font-size: clamp(50px, 6vw, 90px);
          display: block;
        }

        .hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          color: var(--cream);
          margin-top: 20px;
          max-width: 380px;
          line-height: 1.7;
        }

        .hero-divider {
          width: 60px;
          height: 1px;
          background: var(--gold);
          margin: 32px 0;
        }

        .hero-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hero-contact a {
          font-size: 12px;
          letter-spacing: 2px;
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .hero-contact a:hover { opacity: 0.7; }

        /* ── RIGHT (PHOTO) ── */
        .hero-right {
          position: relative;
          overflow: hidden;
        }

        .hero-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.8s ease;
        }

        .hero-right:hover img {
          transform: scale(1.03);
        }

        /* Left-edge fade — blends photo into dark background */
        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--deep-black) 0%, transparent 35%);
          z-index: 1;
          pointer-events: none;
        }

        /* Bottom fade */
        .hero-right::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--deep-black) 0%, transparent 30%);
          z-index: 1;
          pointer-events: none;
        }

        /* Floating badge */
        .hero-badge {
          position: absolute;
          top: 40px;
          right: 40px;
          z-index: 3;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 16px 20px;
          text-align: center;
          background: rgba(10,8,5,0.55);
          backdrop-filter: blur(8px);
        }

        .hero-badge-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: var(--gold);
          display: block;
        }

        .hero-badge-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-style: italic;
          color: var(--cream);
          opacity: 0.6;
          display: block;
          margin-top: 4px;
          letter-spacing: 1px;
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }

        .scroll-text {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.6;
        }

        .scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1;   }
        }

        /* ── REVEAL ANIMATIONS ── */
        .hero-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .hero-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-right.hero-reveal {
          transform: translateX(30px);
        }

        .hero-right.hero-reveal.visible {
          transform: translateX(0);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr !important;
    height: auto !important;
    min-height: 100vh;
  }

  .hero-right {
    height: 60vw;
    min-height: 280px;
    order: -1;
  }

  /* Override left fade — fade bottom instead */
  .hero-right::before {
    background: linear-gradient(
      to bottom, transparent 40%, var(--deep-black) 100%
    ) !important;
  }

  .hero-left {
    padding: 32px 24px 60px !important;
    justify-content: flex-start !important;
    padding-top: 40px !important;
  }

  .hero-badge {
    top: 16px !important;
    right: 16px !important;
    padding: 10px 14px !important;
  }

  .hero-scroll { display: none !important; }
}

@media (max-width: 400px) {
  .hero-name {
    font-size: 68px !important;
  }
}
      `}</style>

      <section className="hero-section">
        {/* ── LEFT — Text ── */}
        <div className="hero-left">
          <p className="hero-eyebrow hero-reveal">
            Nairobi, Kenya · Professional Model
          </p>

          <h1 className="hero-name hero-reveal">
            African
            <span>Couzin</span>
          </h1>

          <p className="hero-tagline hero-reveal">
            Versatility & Authenticity — where culture meets vision, and every
            frame tells a story.
          </p>

          <div className="hero-divider hero-reveal" />

          <div className="hero-contact hero-reveal">
            <a
              href="mailto:meshackomoding254@gmail.com"
              style={{ color: "var(--gold-light)" }}
            >
              meshackomoding254@gmail.com
            </a>
            <a
              href="tel:0729298595"
              style={{ color: "var(--cream)", opacity: 0.8 }}
            >
              0729 298 595
            </a>
          </div>
        </div>

        {/* ── RIGHT — Photo ── */}
        <div className="hero-right hero-reveal">
          <img src={photo9} alt="AfricanCouzin hero portrait" />

          <div className="hero-badge">
            <span className="hero-badge-title">Professional Model</span>
            <span className="hero-badge-sub">Versatility & Authenticity</span>
          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <div className="hero-scroll hero-reveal">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
}
