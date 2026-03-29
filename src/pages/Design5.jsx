import { useEffect } from 'react'
import './Design5.css'

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

const categories = [
  { key: 'spatial', label: '3D Spatial', emoji: '🧊' },
  { key: 'logic', label: 'Circuit Logic', emoji: '🔌' },
  { key: 'timing', label: 'Tick Timing', emoji: '⏰' },
  { key: 'complexity', label: 'Complexity', emoji: '🏗️' },
]

function PixelBar({ value, color }) {
  const blocks = 20
  const filled = Math.round((value / 100) * blocks)

  return (
    <div className="d5-pixel-bar">
      {[...Array(blocks)].map((_, i) => (
        <div
          key={i}
          className={`d5-pixel-block ${i < filled ? 'd5-pixel-filled' : ''}`}
          style={{
            '--fill-color': color,
            '--delay': `${i * 0.03}s`,
          }}
        />
      ))}
    </div>
  )
}

function MedalBadge({ rank }) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
  if (medals[rank]) return <span className="d5-medal">{medals[rank]}</span>
  return <span className="d5-rank-num">#{rank}</span>
}

export default function Design5() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('d5-visible')
          }
        })
      },
      { threshold: 0.05 }
    )
    document.querySelectorAll('.d5-anim').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const sorted = [...models].sort((a, b) => b.score - a.score)
  const colors = ['#b33831', '#e06c48', '#50a162', '#40739e', '#8e6caf', '#c0813c', '#5dade2', '#45b39d']

  return (
    <div className="d5-root">
      {/* Pixel grid background */}
      <div className="d5-pixel-bg" />

      {/* Hero */}
      <header className="d5-hero">
        <div className="d5-hero-inner">
          <div className="d5-hero-badge">⛏️ MINECRAFT AI BENCHMARK</div>

          <div className="d5-hero-layout">
            <div className="d5-hero-text-area">
              <h1 className="d5-title">
                <span className="d5-title-pixel">Redstone</span>
                <span className="d5-title-normal">Bench</span>
              </h1>

              <p className="d5-hero-desc">
                Drop AI models into Minecraft. Watch them try to build redstone contraptions.
                Test 3D thinking, circuit logic, timing precision, and complex builds — 
                all within the game's unique constraints.
              </p>

              <div className="d5-hero-tags">
                {categories.map(cat => (
                  <div key={cat.key} className="d5-hero-tag">
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="d5-hero-visual">
              <div className="d5-block-scene">
                <div className="d5-block d5-block-1">
                  <div className="d5-block-top" />
                  <div className="d5-block-front" />
                  <div className="d5-block-side" />
                </div>
                <div className="d5-block d5-block-2">
                  <div className="d5-block-top" />
                  <div className="d5-block-front" />
                  <div className="d5-block-side" />
                </div>
                <div className="d5-block d5-block-3">
                  <div className="d5-block-top" />
                  <div className="d5-block-front" />
                  <div className="d5-block-side" />
                </div>
                <div className="d5-redstone-dust">
                  <img src="/redstone.png" alt="Redstone" className="d5-redstone-img" />
                </div>
              </div>
            </div>
          </div>

          <div className="d5-info-strip">
            <div className="d5-info-item">
              <span className="d5-info-val">{models.length}</span>
              <span className="d5-info-label">Models</span>
            </div>
            <div className="d5-info-sep">◆</div>
            <div className="d5-info-item">
              <span className="d5-info-val">127</span>
              <span className="d5-info-label">Challenges</span>
            </div>
            <div className="d5-info-sep">◆</div>
            <div className="d5-info-item">
              <span className="d5-info-val">15</span>
              <span className="d5-info-label">Block Signal Range</span>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <section className="d5-results">
        <h2 className="d5-section-title d5-anim">
          <span className="d5-title-block" />
          Leaderboard
          <span className="d5-title-block" />
        </h2>

        <div className="d5-model-list">
          {sorted.map((model, i) => (
            <div
              key={model.name}
              className="d5-model-card d5-anim"
              style={{ '--delay': `${i * 0.08}s`, '--accent': colors[i] }}
            >
              <div className="d5-card-left">
                <MedalBadge rank={i + 1} />
                <img src={model.icon} alt="" className="d5-card-icon" />
                <div className="d5-card-meta">
                  <div className="d5-card-name">{model.name}</div>
                  <div className="d5-card-provider">{model.provider}</div>
                </div>
              </div>

              <div className="d5-card-center">
                {categories.map(cat => (
                  <div key={cat.key} className="d5-cat-row">
                    <span className="d5-cat-emoji">{cat.emoji}</span>
                    <span className="d5-cat-label">{cat.label}</span>
                    <PixelBar value={model[cat.key]} color={colors[i]} />
                    <span className="d5-cat-val">{model[cat.key]}%</span>
                  </div>
                ))}
              </div>

              <div className="d5-card-right">
                <div className="d5-score-block" style={{ '--accent': colors[i] }}>
                  <span className="d5-score-num">{model.score}</span>
                  <span className="d5-score-pct">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="d5-footer">
        <span>⛏️</span>
        <span>RedstoneBench 2026</span>
        <span>⛏️</span>
      </footer>
    </div>
  )
}
