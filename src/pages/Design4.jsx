import { useEffect, useRef } from 'react'
import './Design4.css'

const models = [
  { name: 'GPT-4o', provider: 'OpenAI', icon: '/openai.svg', score: 82, spatial: 78, logic: 88, timing: 76, complexity: 84 },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: '/claude.svg', score: 91, spatial: 89, logic: 94, timing: 87, complexity: 92 },
  { name: 'Gemini 2.0 Pro', provider: 'Google', icon: '/gemini.svg', score: 74, spatial: 71, logic: 79, timing: 68, complexity: 76 },
  { name: 'Grok-3', provider: 'xAI', icon: '/grok.svg', score: 58, spatial: 52, logic: 65, timing: 49, complexity: 62 },
  { name: 'DeepSeek R1', provider: 'DeepSeek', icon: '/deepseek.svg', score: 69, spatial: 66, logic: 75, timing: 61, complexity: 70 },
  { name: 'GPT-o3', provider: 'OpenAI', icon: '/openai.svg', score: 87, spatial: 85, logic: 91, timing: 82, complexity: 88 },
  { name: 'Claude 3 Opus', provider: 'Anthropic', icon: '/claude.svg', score: 79, spatial: 76, logic: 83, timing: 73, complexity: 80 },
  { name: 'Gemini 2.5 Flash', provider: 'Google', icon: '/gemini.svg', score: 51, spatial: 45, logic: 58, timing: 42, complexity: 55 },
]

const categories = ['spatial', 'logic', 'timing', 'complexity']
const catLabels = { spatial: '3D Spatial', logic: 'Circuit Logic', timing: 'Tick Timing', complexity: 'Complexity' }
const catIcons = { spatial: '⬡', logic: '⚡', timing: '⏱', complexity: '⚙' }

function ScoreRing({ value, size = 100, stroke = 6, color }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg className="d4-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
      />
      <circle
        className="d4-ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color || 'url(#molten)'}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        style={{ '--target-offset': offset }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <defs>
        <linearGradient id="molten" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#f7c948" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Design4() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Particle background
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame
    let particles = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#ff6b35' : '#f7c948',
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10 || p.x > canvas.width + 10) { p.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })
      ctx.globalAlpha = 1
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('d4-visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.d4-anim').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const sorted = [...models].sort((a, b) => b.score - a.score)

  return (
    <div className="d4-root">
      <canvas ref={canvasRef} className="d4-particles" />

      {/* Hero */}
      <header className="d4-hero">
        <div className="d4-hero-glow" />

        <div className="d4-hero-content">
          <div className="d4-badge">AI × MINECRAFT</div>

          <div className="d4-hero-center">
            <div className="d4-redstone-orb">
              <img src="/redstone.png" alt="Redstone" className="d4-redstone-img" />
              <div className="d4-orb-ring d4-orb-ring-1" />
              <div className="d4-orb-ring d4-orb-ring-2" />
              <div className="d4-orb-ring d4-orb-ring-3" />
            </div>

            <h1 className="d4-title">
              <span className="d4-title-top">Redstone</span>
              <span className="d4-title-bottom">Bench</span>
            </h1>
          </div>

          <p className="d4-desc">
            Models are dropped into a live 3D Minecraft world. Can they master redstone?
            Signal decay, tick timing, spatial builds, and complex contraptions — all tested.
          </p>

          <div className="d4-hero-cats">
            {categories.map(cat => (
              <div key={cat} className="d4-hero-cat">
                <span className="d4-hero-cat-icon">{catIcons[cat]}</span>
                <span className="d4-hero-cat-name">{catLabels[cat]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="d4-scroll-cue">
          <div className="d4-scroll-line" />
        </div>
      </header>

      {/* Results */}
      <section className="d4-results">
        <h2 className="d4-section-title d4-anim">Model Leaderboard</h2>

        <div className="d4-grid">
          {sorted.map((model, i) => (
            <div
              key={model.name}
              className={`d4-model-card d4-anim ${i === 0 ? 'd4-card-top' : ''}`}
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <div className="d4-card-header">
                <div className="d4-card-rank-badge">
                  <span>{i + 1}</span>
                </div>
                <img src={model.icon} alt="" className="d4-card-icon" />
                <div className="d4-card-identity">
                  <div className="d4-card-name">{model.name}</div>
                  <div className="d4-card-provider">{model.provider}</div>
                </div>
              </div>

              <div className="d4-card-ring-area">
                <ScoreRing value={model.score} size={110} stroke={5} />
                <div className="d4-card-ring-text">
                  <span className="d4-ring-val">{model.score}</span>
                  <span className="d4-ring-pct">%</span>
                </div>
              </div>

              <div className="d4-card-details">
                {categories.map(cat => {
                  const val = model[cat]
                  return (
                    <div key={cat} className="d4-detail-row">
                      <span className="d4-detail-label">{catLabels[cat]}</span>
                      <div className="d4-detail-bar">
                        <div className="d4-detail-fill" style={{ '--w': `${val}%` }} />
                      </div>
                      <span className="d4-detail-val">{val}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="d4-footer">
        <div className="d4-footer-line" />
        <p>RedstoneBench © 2026</p>
      </footer>
    </div>
  )
}
