// src/components/Navbar.jsx
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links = ['Home', 'About', 'Portfolio', 'Specialties', 'Reviews', 'Socials', 'Contact']

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 60px;
          transition: background 0.4s, padding 0.4s;
        }

        .navbar.scrolled {
          padding: 18px 60px;
          background: rgba(10,8,5,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .navbar:not(.scrolled) {
          background: linear-gradient(to bottom, rgba(10,8,5,0.92), transparent);
        }

        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 4px;
          color: var(--gold);
          text-decoration: none;
          z-index: 110;
          transition: opacity 0.3s;
        }

        .nav-logo:hover { opacity: 0.75; }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--cream);
          text-decoration: none;
          opacity: 0.65;
          transition: opacity 0.3s, color 0.3s;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }

        .nav-links a:hover { opacity: 1; color: var(--gold); }
        .nav-links a:hover::after { transform: scaleX(1); }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 110;
          background: none;
          border: none;
          padding: 6px;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--gold);
          transition: transform 0.35s ease, opacity 0.35s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(10,8,5,0.99);
          z-index: 105;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 36px;
          display: none;
        }

        .mobile-menu.open { display: flex; }

        .mobile-nav-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 10vw, 52px);
          letter-spacing: 6px;
          color: var(--cream);
          text-decoration: none;
          transition: color 0.3s, letter-spacing 0.3s;
          position: relative;
        }

        .mobile-nav-link::before {
          content: attr(data-index);
          position: absolute;
          left: -32px;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--gold);
          opacity: 0.5;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'DM Sans', sans-serif;
        }

        .mobile-nav-link:hover { color: var(--gold); letter-spacing: 8px; }

        .mobile-menu-contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 28px 40px 0;
          border-top: 1px solid rgba(201,168,76,0.12);
          width: 100%;
          text-align: center;
          margin-top: 8px;
        }

        .mobile-menu-contact a {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--gold);
          text-decoration: none;
          opacity: 0.65;
          transition: opacity 0.3s;
        }

        .mobile-menu-contact a:hover { opacity: 1; }

        .mobile-drawer-logo {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 5px;
          color: var(--gold);
          opacity: 0.3;
        }

        @media (max-width: 768px) {
          .navbar          { padding: 20px 24px; }
          .navbar.scrolled { padding: 16px 24px; }
          .nav-links       { display: none; }
          .hamburger       { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">African_Couzin</a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(link => (
            <li key={link}>
              <a href={link === 'Home' ? '#' : `#${link.toLowerCase()}`}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

{/* Mobile drawer */}
<div className={`mobile-menu ${open ? 'open' : ''}`}>
  <span className="mobile-drawer-logo">African_Couzin</span>

  {links.map((link, i) => (
    <a
      key={link}
      href={link === 'Home' ? '#' : `#${link.toLowerCase()}`}
      className="mobile-nav-link"
      data-index={`0${i + 1}`}
      onClick={() => setOpen(false)}
    >
      {link}
    </a>
  ))}

  <div className="mobile-menu-contact">
    <a href="mailto:messhackomoding21@gmail.com" onClick={() => setOpen(false)}>
      messhackomoding21@gmail.com
    </a>
    <a href="tel:+254729298595" onClick={() => setOpen(false)}>
      0729 298 595
    </a>
  </div>
</div>   
 </>
  )
}

