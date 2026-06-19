import { useState, useCallback } from 'react'

const TOOLS = [
  { id: 'post', label: 'Social Posts', icon: '📱', color: '#6366f1' },
  { id: 'reply', label: 'Customer Replies', icon: '💬', color: '#ec4899' },
  { id: 'flyer', label: 'Flyers', icon: '📄', color: '#10b981' },
  { id: 'text', label: 'Text Messages', icon: '✉️', color: '#f97316' },
]

const PLATFORMS = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn']
const SENTIMENTS = [
  { value: 'positive', label: 'Positive Review' },
  { value: 'neutral', label: 'Neutral Review' },
  { value: 'negative', label: 'Negative Review' },
]

export default function Home() {
  const [page, setPage] = useState('home')
  const [activeTool, setActiveTool] = useState('post')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [toast, setToast] = useState(null)
  const [history, setHistory] = useState([])
  const [bizName, setBizName] = useState('')
  const [bizCategory, setBizCategory] = useState('')
  const [bizLocation, setBizLocation] = useState('')

  // Post form state
  const [platform, setPlatform] = useState('Instagram')
  const [tone, setTone] = useState('Friendly')

  // Reply form state
  const [sentiment, setSentiment] = useState('positive')

  // Flyer form state
  // Text form state
  const [textCategory, setTextCategory] = useState('promotional')

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const business = {
    name: bizName || 'My Business',
    category: bizCategory || 'General',
    location: bizLocation || 'Your Town',
    products: ['Product']
  }

  const generate = useCallback(async (type) => {
    setGenerating(true)
    setResult(null)

    const options = {}
    if (type === 'post') {
      options.platform = platform
      options.tone = tone
    }
    if (type === 'reply') {
      options.sentiment = sentiment
    }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, business, options })
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        setHistory(prev => [{ type: data.data.type || type, content: data.data.content || data.data.body, date: new Date().toLocaleTimeString() }, ...prev].slice(0, 10))
      }
    } catch (err) {
      showToast('Generation failed. Try again.')
    } finally {
      setGenerating(false)
    }
  }, [business, platform, tone, sentiment, showToast])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    showToast('Copied to clipboard!')
  }

  const renderForm = () => {
    switch (activeTool) {
      case 'post':
        return (
          <div className="generator-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)}>
                  {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)}>
                  {['Professional', 'Casual', 'Friendly', 'Playful', 'Urgent', 'Warm'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => generate('post')} disabled={generating}>
                {generating ? <><span className="spinner" /> Generating...</> : '✨ Generate Post'}
              </button>
            </div>
          </div>
        )
      case 'reply':
        return (
          <div className="generator-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Review Type</label>
                <select value={sentiment} onChange={e => setSentiment(e.target.value)}>
                  {SENTIMENTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => generate('reply')} disabled={generating}>
                {generating ? <><span className="spinner" /> Generating...</> : '💬 Generate Reply'}
              </button>
            </div>
          </div>
        )
      case 'flyer':
        return (
          <div className="generator-form">
            <p style={{ color: 'var(--gray-500)', marginBottom: 16, fontSize: '0.9rem' }}>
              Generate a promotional flyer perfect for printing or sharing on social media.
            </p>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => generate('flyer')} disabled={generating}>
                {generating ? <><span className="spinner" /> Generating...</> : '📄 Generate Flyer'}
              </button>
            </div>
          </div>
        )
      case 'text':
        return (
          <div className="generator-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Message Type</label>
                <select value={textCategory} onChange={e => setTextCategory(e.target.value)}>
                  <option value="promotional">Promotional</option>
                  <option value="reminder">Reminder</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => generate('text')} disabled={generating}>
                {generating ? <><span className="spinner" /> Generating...</> : '✉️ Generate Text'}
              </button>
            </div>
          </div>
        )
    }
  }

  const renderResult = () => {
    if (!result) return null
    if (result.type === 'flyer') {
      return (
        <div className="result-card">
          <div className="result-header">
            <h3>📄 Your Flyer</h3>
            <span className="badge badge-green">FLYER</span>
          </div>
          <div className="result-body">
            <div className="flyer-preview">
              <h2>{result.headline}</h2>
              <h3>{result.subheadline}</h3>
              <div className="body">{result.body}</div>
              <button className="cta-btn">{result.cta}</button>
            </div>
          </div>
          <div className="result-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => copyToClipboard(`${result.headline}\n${result.subheadline}\n\n${result.body}`)}>📋 Copy</button>
            <button className="btn btn-ghost btn-sm" onClick={() => generate('flyer')}>🔄 Regenerate</button>
          </div>
        </div>
      )
    }

    return (
      <div className="result-card">
        <div className="result-header">
          <h3>
            {result.type === 'post' && '📱'}
            {result.type === 'reply' && '💬'}
            {result.type === 'text' && '✉️'}
            {' '}Generated {result.type === 'post' ? 'Post' : result.type === 'reply' ? 'Reply' : 'Message'}
          </h3>
          <div>
            {result.platform && <span className="badge badge-blue" style={{ marginRight: 4 }}>{result.platform}</span>}
            {result.sentiment && <span className={`badge ${result.sentiment === 'positive' ? 'badge-green' : result.sentiment === 'negative' ? 'badge-orange' : 'badge-purple'}`}>{result.sentiment}</span>}
            {result.category && <span className="badge badge-purple">{result.category}</span>}
          </div>
        </div>
        <div className="result-body">
          <div className="content-text">{result.content}</div>
        </div>
        <div className="result-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => copyToClipboard(result.content)}>📋 Copy</button>
          <button className="btn btn-ghost btn-sm" onClick={() => generate(activeTool)}>🔄 Regenerate</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="logo" onClick={e => { e.preventDefault(); setPage('home') }}>
            ⚡ <span>ContentAI</span>
          </a>
          <nav className="nav">
            <a href="#" onClick={e => { e.preventDefault(); setPage('home') }}>Home</a>
            <a href="#" onClick={e => { e.preventDefault(); setPage('dashboard') }}>Dashboard</a>
            <a href="#" onClick={e => { e.preventDefault(); setPage('pricing') }}>Pricing</a>
          </nav>
        </div>
      </header>

      {page === 'home' && (
        <>
          {/* Hero */}
          <section className="hero">
            <div className="container">
              <h1>AI Content for<br />Local Businesses</h1>
              <p>Generate social posts, customer replies, flyers, and text messages in seconds. Save hours every week.</p>
              <div>
                <button className="btn btn-primary" onClick={() => setPage('dashboard')}>Start Creating Free</button>
                <button className="btn btn-secondary" onClick={() => setPage('pricing')}>See Pricing</button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="features">
            <div className="container">
              <h2>What You Can Create</h2>
              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-icon icon-blue">📱</div>
                  <h3>Social Media Posts</h3>
                  <p>Engaging posts for Instagram, Facebook, Twitter, and LinkedIn. Pick your tone and platform.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon icon-pink">💬</div>
                  <h3>Customer Replies</h3>
                  <p>Respond to reviews — positive, neutral, or negative — with the right tone every time.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon icon-green">📄</div>
                  <h3>Flyers & Announcements</h3>
                  <p>Professional flyers for sales, events, grand openings, and seasonal promotions.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon icon-orange">✉️</div>
                  <h3>Text Messages</h3>
                  <p>Promotional texts, appointment reminders, and announcements ready to send.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {page === 'dashboard' && (
        <section className="dashboard">
          <div className="container">
            <h1>Content Dashboard</h1>
            <p className="subtitle">Set up your business details once, generate content instantly.</p>

            {/* Business Info */}
            <div className="generator-form" style={{ marginBottom: 24, background: 'white' }}>
              <h3 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 700 }}>🏪 Your Business</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" placeholder="e.g. Joe's Coffee" value={bizName} onChange={e => setBizName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" placeholder="e.g. Coffee Shop" value={bizCategory} onChange={e => setBizCategory(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Downtown" value={bizLocation} onChange={e => setBizLocation(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Tool Tabs */}
            <div className="tool-tabs">
              {TOOLS.map(t => (
                <button
                  key={t.id}
                  className={`tool-tab ${activeTool === t.id ? 'active' : ''}`}
                  onClick={() => { setActiveTool(t.id); setResult(null) }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Form */}
            {renderForm()}

            {/* Result */}
            {result && <div style={{ marginTop: 24 }}>{renderResult()}</div>}

            {/* History */}
            {history.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>Recent Generations</h3>
                <div className="history-list">
                  {history.map((item, i) => (
                    <div key={i} className="history-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                        <span className={`type badge-${item.type === 'post' ? 'blue' : item.type === 'reply' ? 'pink' : item.type === 'flyer' ? 'green' : 'orange'}`}>{item.type}</span>
                        <span className="preview">{item.content}</span>
                      </div>
                      <span className="date">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {page === 'pricing' && (
        <section className="pricing">
          <div className="container">
            <h2>Simple, Transparent Pricing</h2>
            <p className="pricing-sub">Start free. Upgrade when you need more.</p>
            <div className="pricing-grid">
              <div className="pricing-card">
                <h3>Starter</h3>
                <div className="price">$0 <span>/month</span></div>
                <p className="desc">Try it out, no commitment</p>
                <ul>
                  <li>10 generations per month</li>
                  <li>All content types</li>
                  <li>Basic business profile</li>
                  <li>Copy to clipboard</li>
                </ul>
                <button className="btn btn-secondary" onClick={() => setPage('dashboard')}>Get Started</button>
              </div>
              <div className="pricing-card featured">
                <div className="badge">Most Popular</div>
                <h3>Pro</h3>
                <div className="price">$75 <span>/month</span></div>
                <p className="desc">For growing businesses</p>
                <ul>
                  <li>1,000 generations per month</li>
                  <li>All content types</li>
                  <li>Unlimited business profiles</li>
                  <li>Export to PDF / CSV</li>
                  <li>Priority support</li>
                  <li>Save & organize content</li>
                </ul>
                <button className="btn btn-primary" onClick={() => setPage('dashboard')}>Subscribe Now</button>
              </div>
              <div className="pricing-card">
                <h3>Agency</h3>
                <div className="price">$115 <span>/month</span></div>
                <p className="desc">For agencies &amp; multi-location</p>
                <ul>
                  <li>10,000 generations per month</li>
                  <li>All content types</li>
                  <li>Up to 20 business profiles</li>
                  <li>Team collaboration</li>
                  <li>API access</li>
                  <li>White-label exports</li>
                  <li>Dedicated account manager</li>
                </ul>
                <button className="btn btn-secondary" onClick={() => setPage('dashboard')}>Contact Sales</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p><strong>ContentAI</strong> — AI-powered content for local businesses. Built for busy owners who need results, fast.</p>
        </div>
      </footer>

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
