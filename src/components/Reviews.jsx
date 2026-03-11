// src/components/Reviews.jsx
import { useState } from 'react'

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Samuel Jumah',
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
    id: 2,
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
    id: 3,
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
            background: 'none',
            border: 'none',
            cursor: readonly ? 'default' : 'pointer',
            padding: 0,
            fontSize: 20,
            color: star <= (hovered || value) ? '#C9A84C' : 'rgba(201,168,76,0.2)',
            transition: 'color 0.2s',
            lineHeight: 1,
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews]     = useState(INITIAL_REVIEWS)
  const [showForm, setShowForm]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', role: '', company: '', project: '', rating: 0, text: '',
  })
  const [error, setError] = useState('')

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!form.name.trim())    return 'Please enter your name.'
    if (!form.rating)         return 'Please select a star rating.'
    if (!form.text.trim())    return 'Please write your review.'
    if (form.text.length < 20) return 'Review must be at least 20 characters.'
    return ''
  }

  const getInitials = name =>
    name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const AVATAR_COLORS = ['#C9A84C', '#C4622D', '#8B3A1A', '#A08030', '#1E1610']

  const handleSubmit = () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')

    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      role: form.role.trim() || 'Client',
      company: form.company.trim() || '',
      project: form.project || 'General',
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      initials: getInitials(form.name),
      color: AVATAR_COLORS[reviews.length % AVATAR_COLORS.length],
    }

    setReviews(prev => [newReview, ...prev])
    setForm({ name: '', role: '', company: '', project: '', rating: 0, text: '' })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
    }, 3000)
  }

  return (
    <>
      <style>{`
        /* ── SECTION ── */
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
          top: 20px;
          right: -10px;
          pointer-events: none;
          letter-spacing: 10px;
          line-height: 1;
        }

        /* ── HEADER ── */
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
          width: 30px;
          height: 1px;
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

        .reviews-summary {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          color: rgba(245,237,216,0.5);
          line-height: 1.8;
          max-width: 340px;
          text-align: right;
        }

        .reviews-summary strong {
          color: var(--gold);
          font-weight: 400;
          display: block;
          font-size: 36px;
          font-style: normal;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          line-height: 1;
          margin-bottom: 6px;
        }

        /* ── GRID ── */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 60px;
        }

        /* ── REVIEW CARD ── */
        .review-card {
          padding: 44px 36px;
          background: rgba(20,15,8,0.6);
          border: 1px solid rgba(201,168,76,0.08);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-card:hover {
          border-color: rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.03);
        }

        /* Quote mark */
        .review-card::before {
          content: '“';
          position: absolute;
          top: 16px;
          right: 24px;
          font-family: 'Playfair Display', serif;
          font-size: 80px;
          color: var(--gold);
          opacity: 0.08;
          line-height: 1;
          pointer-events: none;
        }

        /* New badge */
        .review-new-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--deep-black);
          background: var(--gold);
          padding: 3px 10px;
        }

        /* Stars */
        .review-stars {
          display: flex;
          gap: 3px;
        }

        .review-star {
          font-size: 14px;
          color: var(--gold);
        }

        .review-star.empty {
          color: rgba(201,168,76,0.2);
        }

        /* Text */
        .review-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          color: rgba(245,237,216,0.75);
          line-height: 1.85;
          flex: 1;
        }

        /* Project tag */
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

        /* Author */
        .review-author {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(201,168,76,0.08);
        }

        .review-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1px;
          color: var(--deep-black);
          flex-shrink: 0;
        }

        .review-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          color: var(--warm-white);
          margin-bottom: 3px;
        }

        .review-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(245,237,216,0.4);
          letter-spacing: 0.5px;
        }

        .review-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(201,168,76,0.4);
          margin-left: auto;
          white-space: nowrap;
        }

        /* ── ADD REVIEW BUTTON ── */
        .add-review-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: 100%;
          padding: 22px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 4px;
          color: var(--gold);
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
          margin-bottom: 48px;
        }

        .add-review-btn:hover {
          background: rgba(201,168,76,0.06);
          border-color: rgba(201,168,76,0.45);
        }

        /* ── FORM ── */
        .review-form-wrap {
          background: var(--warm-dark);
          border: 1px solid rgba(201,168,76,0.12);
          padding: 52px 48px;
          margin-bottom: 48px;
          position: relative;
        }

        .review-form-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .review-form-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-style: italic;
          color: rgba(245,237,216,0.4);
          margin-bottom: 40px;
        }

        .review-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 40px;
        }

        .review-form-group {
          margin-bottom: 28px;
        }

        .review-form-group.full {
          grid-column: span 2;
        }

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

        .review-form-label .required {
          color: var(--gold);
          margin-left: 3px;
        }

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
        .review-form-textarea:focus {
          border-bottom-color: var(--gold);
        }

        .review-form-select {
          cursor: pointer;
          appearance: none;
        }

        .review-form-select option {
          background: var(--warm-dark);
          color: var(--cream);
        }

        .review-form-textarea {
          resize: none;
          height: 110px;
          line-height: 1.6;
        }

        /* Rating row */
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

        /* Form error */
        .review-form-error {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #e07070;
          padding: 10px 14px;
          border: 1px solid rgba(220,100,100,0.25);
          background: rgba(220,100,100,0.06);
          margin-bottom: 20px;
        }

        /* Form actions */
        .review-form-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 8px;
        }

        .review-submit-btn {
          background: var(--gold);
          border: none;
          color: var(--deep-black);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 4px;
          padding: 16px 48px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          flex: 1;
        }

        .review-submit-btn:hover { background: var(--gold-light); }
        .review-submit-btn:active { transform: scale(0.98); }

        .review-submit-btn.success {
          background: #4CAF50;
          color: #fff;
        }

        .review-cancel-btn {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(245,237,216,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 28px;
          cursor: pointer;
          transition: border-color 0.3s, color 0.3s;
        }

        .review-cancel-btn:hover {
          border-color: rgba(245,237,216,0.3);
          color: var(--cream);
        }

        /* ── CHAR COUNT ── */
        .char-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(201,168,76,0.35);
          text-align: right;
          margin-top: 6px;
          letter-spacing: 1px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .reviews-section   { padding: 80px 30px; }
          .reviews-grid      { grid-template-columns: 1fr; }
          .reviews-header    { flex-direction: column; align-items: flex-start; }
          .reviews-summary   { text-align: left; }
          .review-form-wrap  { padding: 36px 28px; }
          .review-form-grid  { grid-template-columns: 1fr; }
          .review-form-group.full { grid-column: span 1; }
          .reviews-section::before { font-size: 100px; }
        }

        @media (max-width: 560px) {
          .reviews-section   { padding: 60px 20px; }
          .review-card       { padding: 32px 24px; }
          .review-form-actions { flex-direction: column; }
          .review-cancel-btn   { width: 100%; text-align: center; }
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
          <div className="reviews-summary">
            <strong>{reviews.length}</strong>
            reviews from clients across<br />
            commercial, editorial &amp; lifestyle projects.
          </div>
        </div>

        {/* ── Add Review Button ── */}
        {!showForm && (
          <button className="add-review-btn" onClick={() => setShowForm(true)}>
            <svg width="16" height="16" fill="none" stroke="currentColor"
              strokeWidth="1.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Leave a Review
          </button>
        )}

        {/* ── Review Form ── */}
        {showForm && (
          <div className="review-form-wrap">
            <p className="review-form-title">Share Your Experience</p>
            <p className="review-form-subtitle">
              Tell others about your project with African Couzin
            </p>

            <div className="review-form-grid">

              {/* Name */}
              <div className="review-form-group">
                <label className="review-form-label">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  name="name"
                  className="review-form-input"
                  placeholder="e.g. Amara Osei"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Role */}
              <div className="review-form-group">
                <label className="review-form-label">Your Role / Title</label>
                <input
                  name="role"
                  className="review-form-input"
                  placeholder="e.g. Creative Director"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>

              {/* Company */}
              <div className="review-form-group">
                <label className="review-form-label">Company / Brand</label>
                <input
                  name="company"
                  className="review-form-input"
                  placeholder="e.g. Savanna Wear Co."
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              {/* Project type */}
              <div className="review-form-group">
                <label className="review-form-label">Project Type</label>
                <select
                  name="project"
                  className="review-form-select"
                  value={form.project}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {PROJECTS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Star rating */}
              <div className="review-form-group full">
                <label className="review-form-label">
                  Your Rating <span className="required">*</span>
                </label>
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

              {/* Review text */}
              <div className="review-form-group full">
                <label className="review-form-label">
                  Your Review <span className="required">*</span>
                </label>
                <textarea
                  name="text"
                  className="review-form-textarea"
                  placeholder="Describe your experience working with Samuel on your project..."
                  value={form.text}
                  onChange={handleChange}
                  maxLength={500}
                />
                <p className="char-count">{form.text.length} / 500</p>
              </div>

            </div>

            {/* Error */}
            {error && <p className="review-form-error">{error}</p>}

            {/* Actions */}
            <div className="review-form-actions">
              <button
                className={`review-submit-btn ${submitted ? 'success' : ''}`}
                onClick={handleSubmit}
              >
                {submitted ? 'Review Posted ✓' : 'Post Review'}
              </button>
              <button
                className="review-cancel-btn"
                onClick={() => { setShowForm(false); setError('') }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Reviews Grid ── */}
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div className="review-card" key={review.id}>

              {/* New badge for freshly added reviews */}
              {idx === 0 && reviews.length > INITIAL_REVIEWS.length && (
                <span className="review-new-badge">New</span>
              )}

              {/* Stars */}
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map(s => (
                  <span
                    key={s}
                    className={`review-star ${s <= review.rating ? '' : 'empty'}`}
                  >★</span>
                ))}
              </div>

              {/* Review text */}
              <p className="review-text">"{review.text}"</p>

              {/* Project tag */}
              <span className="review-project-tag">{review.project}</span>

              {/* Author */}
              <div className="review-author">
                <div
                  className="review-avatar"
                  style={{ background: review.color }}
                >
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

      </section>
    </>
  )
}



