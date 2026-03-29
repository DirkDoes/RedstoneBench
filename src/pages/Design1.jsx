import { useEffect, useRef } from 'react'
import './Design1.css'

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
  { key: 'spatial', label: '3D Spatial', desc: 'Block placement & orientation' },
  { key: 'logic', label: 'Circuit Logic', desc: 'Signal routing & gates' },
  { key: 'timing', label: 'Tick Timing', desc: 'Delay & pulsing accuracy' },
  { key: 'complexity', label: 'Complexity', desc: 'Multi-component builds' },
]

export default function Design1() {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('d1-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.d1-animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="d1-root">
      {/* Decorative corner elements */}
      <div className="d1-corner d1-corner-tl" />
      <div className="d1-corner d1-corner-tr" />
      <div className="d1-corner d1-corner-bl" />
      <div className="d1-corner d1-corner-br" />

      {/* Hero */}
      <header className="d1-hero" ref={heroRef}>
        <div className="d1-hero-inner">
          <div className="d1-stamp">EST. 2026</div>

          <div className="d1-hero-content">
            <div className="d1-hero-left">
              <div className="d1-label-tag">BENCHMARK REPORT</div>
              <h1 className="d1-title">
                <span className="d1-title-line">Redstone</span>
                <span className="d1-title-line d1-title-accent">Bench</span>
              </h1>
              <p className="d1-subtitle">
                How well can AI models reason about Minecraft redstone circuitry?
                Tested in a live 3D environment with real constraints — signal decay
                at 15 blocks, tick-based timing, and moving components.
              </p>

              <div className="d1-hero-stats">
                <div className="d1-stat">
                  <span className="d1-stat-num">8</span>
                  <span className="d1-stat-label">Models Tested</span>
                </div>
                <div className="d1-stat-divider" />
                <div className="d1-stat">
                  <span className="d1-stat-num">4</span>
                  <span className="d1-stat-label">Test Categories</span>
                </div>
                <div className="d1-stat-divider" />
                <div className="d1-stat">
                  <span className="d1-stat-num">127</span>
                  <span className="d1-stat-label">Total Challenges</span>
                </div>
              </div>
            </div>

            <div className="d1-hero-right">
              <div className="d1-redstone-frame">
                <img src="/redstone.png" alt="Redstone" className="d1-redstone-img" />
                <div className="d1-redstone-glow" />
              </div>
              <div className="d1-blueprint-lines">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="d1-bp-line" style={{ '--delay': `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="d1-scroll-hint">
            <span>Scroll to see results</span>
            <div className="d1-scroll-arrow">↓</div>
          </div>
        </div>

        {/* Background decorative grid */}
        <div className="d1-grid-bg" />
      </header>

      {/* Test categories overview */}
      <section className="d1-categories d1-animate-in">
        <div className="d1-section-header">
          <div className="d1-section-line" />
          <h2 className="d1-section-title">What We Test</h2>
          <div className="d1-section-line" />
        </div>

        <div className="d1-cat-grid">
          {categories.map((cat, i) => (
            <div key={cat.key} className="d1-cat-card d1-animate-in" style={{ '--delay': `${i * 0.15}s` }}>
              <span className="d1-cat-num">0{i + 1}</span>
              <h3 className="d1-cat-name">{cat.label}</h3>
              <p className="d1-cat-desc">{cat.desc}</p>
              <div className="d1-cat-ornament" />
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="d1-results">
        <div className="d1-section-header d1-animate-in">
          <div className="d1-section-line" />
          <h2 className="d1-section-title">Model Performance</h2>
          <div className="d1-section-line" />
        </div>

        <div className="d1-results-table d1-animate-in">
          <div className="d1-table-header">
            <div className="d1-th d1-th-model">Model</div>
            {categories.map(cat => (
              <div key={cat.key} className="d1-th">{cat.label}</div>
            ))}
            <div className="d1-th d1-th-overall">Overall</div>
          </div>

          {[...models].sort((a, b) => b.score - a.score).map((model, i) => (
            <div
              key={model.name}
              className="d1-table-row d1-animate-in"
              style={{ '--delay': `${i * 0.08}s` }}
            >
              <div className="d1-td d1-td-model">
                <span className="d1-rank">#{i + 1}</span>
                <img src={model.icon} alt="" className="d1-model-icon" />
                <div>
                  <div className="d1-model-name">{model.name}</div>
                  <div className="d1-model-provider">{model.provider}</div>
                </div>
              </div>
              {categories.map(cat => (
                <div key={cat.key} className="d1-td">
                  <div className="d1-bar-track">
                    <div
                      className="d1-bar-fill"
                      style={{ '--width': `${model[cat.key]}%` }}
                    />
                  </div>
                  <span className="d1-bar-val">{model[cat.key]}%</span>
                </div>
              ))}
              <div className="d1-td d1-td-overall">
                <span className="d1-overall-score">{model.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="d1-footer">
        <div className="d1-footer-ornament" />
        <p>RedstoneBench © 2026 — A benchmark by redstone enthusiasts</p>
      </footer>
    </div>
  )
}
