// src/components/Reviews.jsx

import { useState, useEffect, use } from 'react'
import { supabase } from '../supabaseClient'

const INITIAL_REVIEWS = [
  {
    name: 'Sammie G-',
    role: 'COO',
    company: 'Highmore Tours & Travel',
    project: 'Advertising Campaign',
    rating: 5,
    text: 'African Couzin brought an incredible energy to our campaign. His ability to embody the brand identity while maintaining his authentic presence made every shot effortless. Truly a professional.',
    date: 'February 2021',
    initials: 'SJ',
    color: '#C9A84C',
  },
  {
    name: 'Priya Nair',
    role: 'Marketing Manager',
    company: 'Visit254',
    project: 'Tourism Campaign',
    rating: 5,
    text: 'Working with African Couzin on our Kenya tourism campaign was a seamless experience. He captured the spirit of the country beautifully — natural, confident, and culturally aware.',
    date: 'November 2025',
    initials: 'PN',
    color: '#C4622D',
  },
  {
    name: 'David Wa Kimani',
    role: 'Brand Strategist',
    company: 'Savanna Wear Co.',
    project: 'Commercial',
    rating: 5,
    text: 'African Couzin exceeded every expectation. His professionalism on set, combined with his natural charisma in front of the camera, gave our brand exactly the elevated look we were going for.',
    date: 'August 2024',
    initials: 'DK',
    color: '#8B3A1A',
  },
]

const PROJECTS = [
  'Fashion', 'Commercial', 'Lifestyle', 'Editorial',
  'Corporate Branding', 'Tourism Campaign', 'Studio', 'Fitness', 'Other',
]

const AVATAR_COLORS = ['#C9A84C', '#C4622D', '#8B3A1A', '#A08030', '#5C4A2A']

function StarRating({ value, onChange, readonly = false }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{
            background: 'none', border: 'none',
            cursor: readonly ? 'default' : 'pointer',
            padding: 0, fontSize: 20, lineHeight: 1,
            color: star <= (hovered || value) ? '#C9A84C' : 'rgba(201,168,76,0.2)',
            transition: 'color 0.2s',
          }}
        >★</button>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showForm, setShowForm]     = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')
  const [form, setForm] = useState({
    name: '', role: '', company: '', project: '', rating: 0, text: '',
  })

  useEffect(() => { initReviews() }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const fetchReviews = async () => {
    const { data, error: err } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) throw err
    return data || []
  }

  const initReviews = async () => {
    setLoading(true)
    try {
      // Check if table is empty, seed if so
      const { count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })

      if (count === 0) {
        await supabase.from('reviews').insert(INITIAL_REVIEWS)
      }

      setReviews(await fetchReviews())
    } catch (err) {
      console.error('DB error:', err.message)
      setReviews(INITIAL_REVIEWS) 
    }
    setLoading(false)
  }

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!form.name.trim())     return 'Please enter your name.'
    if (!form.rating)          return 'Please select a star rating.'
    if (!form.text.trim())     return 'Please write your review.'
    if (form.text.length < 20) return 'Review must be at least 20 characters.'
    return ''
  }

  const getInitials = name =>
    name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  const handleSubmit = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setSubmitting(true)

    const newReview = {
      name:     form.name.trim(),
      role:     form.role.trim()    || 'Client',
      company:  form.company.trim() || '',
      project:  form.project        || 'General',
      rating:   form.rating,
      text:     form.text.trim(),
      date:     new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      initials: getInitials(form.name),
      color:    AVATAR_COLORS[reviews.length % AVATAR_COLORS.length],
    }

    try {
      const { error: insertErr } = await supabase
        .from('reviews')
        .insert([newReview])

      if (insertErr) throw insertErr

      // Re-fetch from DB so everyone sees the same data
      setReviews(await fetchReviews())

    } catch (err) {
      console.error('Insert error:', err.message)
      setError('Could not save review. Please try again.')
      setSubmitting(false)
      return
    }

    setForm({ name: '', role: '', company: '', project: '', rating: 0, text: '' })
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
    }, 3000)
  }

  return (
    <>
      <style>{`
        .reviews-section {
          padding: 120px 60px;
          background: var(--deep-black);
          position: relative;
          overflow: hidden;
        }
        .reviews-section::before {
          content: 'REVIEWS';
          position: absolute;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 180px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(201,168,76,0.04);
          top: 20px; right: -10px;
          pointer-events: none;
          letter-spacing: 10px;
          line-height: 1;
        }
        .reviews-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 72px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .reviews-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .reviews-label::before {
          content: '';
          display: block;
          width: 30px; height: 1px;
          background: var(--gold);
        }
        .reviews-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          line-height: 0.95;
          letter-spacing: 3px;
          color: var(--warm-white);
        }
        .reviews-heading em {
          color: var(--gold);
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.6em;
          display: block;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .reviews-summary-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 36px 48px;
          border: 1px solid rgba(201,168,76,0.15);
          background: rgba(20,15,8,0.6);
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          gap: 32px;
          flex-wrap: wrap;
        }

        .reviews-summary-bar:hover {
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.04);
        }

        .reviews-summary-left {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .reviews-big-rating {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .reviews-big-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          line-height: 1;
          color: var(--gold);
          letter-spacing: 2px;
        }

        .reviews-big-stars {
          display: flex;
          gap: 4px;
        }

        .reviews-big-star {
          font-size: 16px;
          color: var(--gold);
        }

        .reviews-big-star.empty {
          color: rgba(201,168,76,0.2);
        }

        .reviews-divider {
          width: 1px;
          height: 60px;
          background: rgba(201,168,76,0.12);
        }

        .reviews-stats {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .reviews-count-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: var(--warm-white);
          line-height: 1;
        }

        .reviews-count-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(245,237,216,0.4);
        }

        .reviews-avatars {
          display: flex;
          align-items: center;
        }

        .reviews-avatar-thumb {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          color: var(--deep-black);
          border: 2px solid var(--deep-black);
          margin-left: -10px;
          flex-shrink: 0;
        }

        .reviews-avatar-thumb:first-child { margin-left: 0; }

        .reviews-summary-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .reviews-open-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 4px;
          color: var(--gold);
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          padding: 14px 28px;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
          white-space: nowrap;
        }

        .reviews-open-btn:hover {
          background: rgba(201,168,76,0.08);
          border-color: var(--gold);
        }

        .reviews-open-btn svg {
          transition: transform 0.3s;
        }

        /* ── DRAWER OVERLAY ── */
        .reviews-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,8,5,0.75);
          z-index: 200;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          backdrop-filter: blur(4px);
        }

        .reviews-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        /* ── DRAWER ── */
        .reviews-drawer {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 201;
          background: var(--warm-dark);
          border-top: 1px solid rgba(201,168,76,0.18);
          height: 82vh;
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .reviews-drawer.open {
          transform: translateY(0);
        }

        /* Drawer handle */
        .drawer-handle {
          width: 40px; height: 3px;
          background: rgba(201,168,76,0.25);
          border-radius: 2px;
          margin: 16px auto 0;
          flex-shrink: 0;
          cursor: pointer;
        }

        /* Drawer top bar */
        .drawer-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px 20px;
          border-bottom: 1px solid rgba(201,168,76,0.08);
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .drawer-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          color: var(--warm-white);
        }

        .drawer-title span {
          color: var(--gold);
          margin-left: 12px;
          font-size: 20px;
        }

        .drawer-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .drawer-add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          color: var(--deep-black);
          background: var(--gold);
          border: none;
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .drawer-add-btn:hover { background: var(--gold-light); }

        .drawer-close-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(245,237,216,0.5);
          width: 40px; height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: border-color 0.3s, color 0.3s;
          flex-shrink: 0;
        }

        .drawer-close-btn:hover {
          border-color: rgba(245,237,216,0.4);
          color: var(--cream);
        }

        /* Drawer scrollable content */
        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 36px 48px 60px;
          scrollbar-width: thin;
          scrollbar-color: rgba(201,168,76,0.2) transparent;
        }

        .drawer-content::-webkit-scrollbar { width: 4px; }
        .drawer-content::-webkit-scrollbar-track { background: transparent; }
        .drawer-content::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }

        /* ── FORM (inside drawer) ── */
        .review-form-wrap {
          background: rgba(10,8,5,0.5);
          border: 1px solid rgba(201,168,76,0.12);
          padding: 40px 44px;
          margin-bottom: 48px;
        }

        .review-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 4px;
          color: var(--gold);
          margin-bottom: 6px;
        }

        .review-form-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(245,237,216,0.4);
          margin-bottom: 32px;
        }

        .review-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 40px;
        }

        .review-form-group      { margin-bottom: 24px; }
        .review-form-group.full { grid-column: span 2; }

        .review-form-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--cream);
          opacity: 0.45;
          margin-bottom: 10px;
        }

        .review-form-label .required { color: var(--gold); margin-left: 3px; }

        .review-form-input,
        .review-form-select,
        .review-form-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(201,168,76,0.2);
          color: var(--cream);
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          padding: 10px 0;
          outline: none;
          transition: border-color 0.3s;
        }

        .review-form-input:focus,
        .review-form-select:focus,
        .review-form-textarea:focus { border-bottom-color: var(--gold); }

        .review-form-select    { cursor: pointer; appearance: none; }
        .review-form-select option { background: var(--warm-dark); color: var(--cream); }
        .review-form-textarea  { resize: none; height: 100px; line-height: 1.6; }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }

        .rating-label-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(245,237,216,0.4);
        }

        .review-form-error {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #e07070;
          padding: 10px 14px;
          border: 1px solid rgba(220,100,100,0.25);
          background: rgba(220,100,100,0.06);
          margin-bottom: 20px;
        }

        .review-form-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-top: 8px;
        }

        .review-submit-btn {
          background: var(--gold);
          border: none;
          color: var(--deep-black);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 4px;
          padding: 14px 40px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          flex: 1;
        }

        .review-submit-btn:hover    { background: var(--gold-light); }
        .review-submit-btn:active   { transform: scale(0.98); }
        .review-submit-btn.success  { background: #4CAF50; color: #fff; }
        .review-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .review-cancel-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(245,237,216,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 24px;
          cursor: pointer;
          transition: border-color 0.3s, color 0.3s;
        }

        .review-cancel-btn:hover {
          border-color: rgba(245,237,216,0.3);
          color: var(--cream);
        }

        .char-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(201,168,76,0.35);
          text-align: right;
          margin-top: 6px;
          letter-spacing: 1px;
        }

        /* ── REVIEWS GRID (in drawer) ── */
        .drawer-reviews-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .drawer-reviews-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(201,168,76,0.1);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .review-card {
          padding: 36px 28px;
          background: rgba(20,15,8,0.6);
          border: 1px solid rgba(201,168,76,0.08);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .review-card:hover {
          border-color: rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.03);
        }

        .review-card::before {
          content: '"';
          position: absolute;
          top: 12px; right: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 70px;
          color: var(--gold);
          opacity: 0.07;
          line-height: 1;
          pointer-events: none;
        }

        .review-new-badge {
          position: absolute;
          top: 12px; left: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--deep-black);
          background: var(--gold);
          padding: 3px 10px;
        }

        .review-stars      { display: flex; gap: 3px; }
        .review-star       { font-size: 13px; color: var(--gold); }
        .review-star.empty { color: rgba(201,168,76,0.2); }

        .review-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-style: italic;
          color: rgba(245,237,216,0.75);
          line-height: 1.8;
          flex: 1;
        }

        .review-project-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 4px 12px;
          width: fit-content;
        }

        .review-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(201,168,76,0.08);
        }

        .review-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 1px;
          color: var(--deep-black);
          flex-shrink: 0;
        }

        .review-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 2px;
          color: var(--warm-white);
          margin-bottom: 2px;
        }

        .review-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(245,237,216,0.4);
          letter-spacing: 0.5px;
        }

        .review-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(201,168,76,0.4);
          margin-left: auto;
          white-space: nowrap;
        }

        .reviews-loading {
          text-align: center;
          padding: 60px 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.35);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .reviews-section       { padding: 80px 30px; }
          .reviews-summary-bar   { padding: 28px 28px; }
          .drawer-topbar         { padding: 16px 24px; }
          .drawer-content        { padding: 28px 24px 60px; }
          .reviews-grid          { grid-template-columns: 1fr; }
          .review-form-wrap      { padding: 28px 24px; }
          .review-form-grid      { grid-template-columns: 1fr; }
          .review-form-group.full { grid-column: span 1; }
          .reviews-section::before { font-size: 100px; }
          .reviews-divider       { display: none; }
        }

        @media (max-width: 560px) {
          .reviews-section       { padding: 60px 20px; }
          .reviews-summary-bar   { padding: 24px 20px; }
          .reviews-big-number    { font-size: 52px; }
          .review-card           { padding: 28px 20px; }
          .review-form-actions   { flex-direction: column; }
          .review-cancel-btn     { width: 100%; text-align: center; }
          .drawer-add-btn        { padding: 12px 16px; font-size: 11px; }
          .reviews-drawer        { height: 92vh; }
        }
      `}</style>

      <section className="reviews-section" id="reviews">

        {/* ── Header ── */}
        <div className="reviews-header">
          <div>
            <p className="reviews-label">Client Feedback</p>
            <h2 className="reviews-heading">
              <em>What they</em>
              Say
            </h2>
          </div>
        </div>

        {/* ── Summary Bar ── */}
        <div className="reviews-summary-bar" onClick={() => setDrawerOpen(true)}>
          <div className="reviews-summary-left">

            {/* Big rating number */}
            <div className="reviews-big-rating">
              <span className="reviews-big-number">{avgRating}</span>
              <div className="reviews-big-stars">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`reviews-big-star ${s <= Math.round(avgRating) ? '' : 'empty'}`}>★</span>
                ))}
              </div>
            </div>

            <div className="reviews-divider" />

            {/* Count */}
            <div className="reviews-stats">
              <span className="reviews-count-text">
                {loading ? '—' : reviews.length} Reviews
              </span>
              <span className="reviews-count-sub">
                from clients across commercial,<br />editorial &amp; lifestyle projects
              </span>
            </div>

            <div className="reviews-divider" />

            {/* Avatar stack */}
            <div className="reviews-avatars">
              {reviews.slice(0, 4).map((r, i) => (
                <div
                  key={i}
                  className="reviews-avatar-thumb"
                  style={{ background: r.color, zIndex: 4 - i }}
                  title={r.name}
                >
                  {r.initials}
                </div>
              ))}
            </div>

          </div>

          <div className="reviews-summary-right">
            <button className="reviews-open-btn" onClick={e => { e.stopPropagation(); setDrawerOpen(true) }}>
              Read Reviews
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            </button>
          </div>
        </div>

      </section>

      {/* ── Overlay ── */}
      <div
        className={`reviews-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => { setDrawerOpen(false); setShowForm(false) }}
      />

      {/* ── Drawer ── */}
      <div className={`reviews-drawer ${drawerOpen ? 'open' : ''}`}>

        {/* Handle */}
        <div className="drawer-handle" onClick={() => { setDrawerOpen(false); setShowForm(false) }} />

        {/* Top bar */}
        <div className="drawer-topbar">
          <div className="drawer-title">
            Client Reviews
            <span>{loading ? '' : reviews.length}</span>
          </div>
          <div className="drawer-actions">
            {!showForm && (
              <button className="drawer-add-btn" onClick={() => setShowForm(true)}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Leave a Review
              </button>
            )}
            <button
              className="drawer-close-btn"
              onClick={() => { setDrawerOpen(false); setShowForm(false) }}
            >✕</button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="drawer-content">

          {/* Form */}
          {showForm && (
            <div className="review-form-wrap">
              <p className="review-form-title">Share Your Experience</p>
              <p className="review-form-subtitle">Tell others about your project with African Couzin</p>

              <div className="review-form-grid">
                <div className="review-form-group">
                  <label className="review-form-label">Your Name <span className="required">*</span></label>
                  <input name="name" className="review-form-input"
                    placeholder="e.g. Amara Osei" value={form.name} onChange={handleChange} />
                </div>
                <div className="review-form-group">
                  <label className="review-form-label">Your Role / Title</label>
                  <input name="role" className="review-form-input"
                    placeholder="e.g. Creative Director" value={form.role} onChange={handleChange} />
                </div>
                <div className="review-form-group">
                  <label className="review-form-label">Company / Brand</label>
                  <input name="company" className="review-form-input"
                    placeholder="e.g. Savanna Wear Co." value={form.company} onChange={handleChange} />
                </div>
                <div className="review-form-group">
                  <label className="review-form-label">Project Type</label>
                  <select name="project" className="review-form-select"
                    value={form.project} onChange={handleChange}>
                    <option value="">Select a category</option>
                    {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="review-form-group full">
                  <label className="review-form-label">Your Rating <span className="required">*</span></label>
                  <div className="rating-row">
                    <StarRating
                      value={form.rating}
                      onChange={val => setForm(prev => ({ ...prev, rating: val }))}
                    />
                    <span className="rating-label-text">
                      {form.rating === 1 && 'Poor'}
                      {form.rating === 2 && 'Fair'}
                      {form.rating === 3 && 'Good'}
                      {form.rating === 4 && 'Great'}
                      {form.rating === 5 && 'Excellent'}
                      {!form.rating && 'Click to rate'}
                    </span>
                  </div>
                </div>
                <div className="review-form-group full">
                  <label className="review-form-label">Your Review <span className="required">*</span></label>
                  <textarea name="text" className="review-form-textarea"
                    placeholder="Describe your experience working with Samuel on your project..."
                    value={form.text} onChange={handleChange} maxLength={500} />
                  <p className="char-count">{form.text.length} / 500</p>
                </div>
              </div>

              {error && <p className="review-form-error">{error}</p>}

              <div className="review-form-actions">
                <button
                  className={`review-submit-btn ${submitted ? 'success' : ''}`}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Posting...' : submitted ? 'Review Posted ✓' : 'Post Review'}
                </button>
                <button className="review-cancel-btn"
                  onClick={() => { setShowForm(false); setError('') }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Reviews list */}
          {loading ? (
            <div className="reviews-loading">Loading reviews</div>
          ) : (
            <>
              <p className="drawer-reviews-heading">
                {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
              </p>
              <div className="reviews-grid">
                {reviews.map((review, idx) => (
                  <div className="review-card" key={review.id || idx}>
                    {idx === 0 && <span className="review-new-badge">Latest</span>}
                    <div className="review-stars">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={`review-star ${s <= review.rating ? '' : 'empty'}`}>★</span>
                      ))}
                    </div>
                    <p className="review-text">"{review.text}"</p>
                    <span className="review-project-tag">{review.project}</span>
                    <div className="review-author">
                      <div className="review-avatar" style={{ background: review.color }}>
                        {review.initials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="review-name">{review.name}</p>
                        <p className="review-role">
                          {review.role}{review.company ? ` · ${review.company}` : ''}
                        </p>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}  








