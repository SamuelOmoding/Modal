// src/components/Navbar.jsx
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = ['About', 'Portfolio', 'Specialties', 'Reviews','Socials', 'Contact']

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
          padding: 24px 60px;
          background: linear-gradient(to bottom, rgba(10,8,5,0.97), transparent);
          transition: padding 0.3s;
        }

        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 4px;
          color: var(--gold);
          text-decoration: none;
          z-index: 110;
        }

        .nav-links {
          display: flex;
          gap: 44px;
          list-style: none;
        }

        .nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--cream);
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.3s, color 0.3s;
        }

        .nav-links a:hover { opacity: 1; color: var(--gold); }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 110;
          background: none;
          border: none;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--gold);
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu drawer */
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(10,8,5,0.98);
          z-index: 105;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu a {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 6px;
          color: var(--cream);
          text-decoration: none;
          transition: color 0.3s;
        }

        .mobile-menu a:hover { color: var(--gold); }

        .mobile-menu-contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding-top: 32px;
          border-top: 1px solid rgba(201,168,76,0.15);
          width: 100%;
          text-align: center;
        }

        .mobile-menu-contact a {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px !important;
          letter-spacing: 2px !important;
          color: var(--gold) !important;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .navbar { padding: 20px 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <a href="#" className="nav-logo">African_Couzin</a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}>{link}</a>
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
        {links.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setOpen(false)}
            > 
            {link}
          </a>
        ))}
        <div className="mobile-menu-contact">
          <a href="mailto:meshackomoding21@gmail.com" onClick={() => setOpen(false)}>
            meshackomoding21@gmail.com
          </a>
          <a href="tel:+254729298595" onClick={() => setOpen(false)}>
            0729 298 595
          </a>
        </div>
      </div>
    </>
  )
}



