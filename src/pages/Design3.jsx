import { useEffect } from 'react'
import './Design3.css'

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

const testAreas = [
  { id: '01', name: '3D Spatial Reasoning', desc: 'Can the model place blocks in 3D space, reason about orientation, and build structures that work from all angles?' },
  { id: '02', name: 'Circuit Logic', desc: 'Signal routing through AND, OR, NOT gates — but with Minecraft\'s unique 15-block signal decay constraint.' },
  { id: '03', name: 'Tick Timing', desc: 'Repeater delays, comparator mechanics, and pulse circuits demand precise understanding of game tick sequencing.' },
  { id: '04', name: 'Complexity Management', desc: 'Multi-component machines with pistons, hoppers, and moving parts. Keeping track of state across dozens of interacting elements.' },
]

export default function Design3() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('d3-visible')
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.d3-anim').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const sorted = [...models].sort((a, b) => b.score - a.score)
  const topModel = sorted[0]

  return (
    <div className="d3-root">
      {/* Hero */}
      <header className="d3-hero">
        <div className="d3-hero-top">
          <span className="d3-tag">BENCHMARK</span>
          <span className="d3-tag-year">2026</span>
        </div>

        <div className="d3-hero-main">
          <div className="d3-hero-text">
            <h1 className="d3-headline">
              <span className="d3-headline-red">Redstone</span>
              <br />
              Bench
            </h1>
          </div>
          <div className="d3-hero-right">
            <div className="d3-hero-redstone-wrap">
              <img src="/redstone.png" alt="Redstone" className="d3-redstone" />
            </div>
            <p className="d3-hero-body">
              Testing AI models in a live Minecraft environment. 
              3D spatial reasoning, circuit logic with 15-block signal decay, 
              tick-precise timing, and complex multi-component builds.
            </p>
          </div>
        </div>

        <div className="d3-hero-bar">
          <div className="d3-hero-bar-item">
            <span className="d3-bar-num">{models.length}</span>
            <span className="d3-bar-label">Models</span>
          </div>
          <div className="d3-hero-bar-item">
            <span className="d3-bar-num">4</span>
            <span className="d3-bar-label">Categories</span>
          </div>
          <div className="d3-hero-bar-item">
            <span className="d3-bar-num">127</span>
            <span className="d3-bar-label">Challenges</span>
          </div>
          <div className="d3-hero-bar-item d3-hero-bar-highlight">
            <span className="d3-bar-num">{topModel.score}%</span>
            <span className="d3-bar-label">Top Score</span>
          </div>
        </div>
      </header>

      {/* Test Areas */}
      <section className="d3-tests">
        <div className="d3-tests-label d3-anim">
          <span className="d3-vertical-text">WHAT WE MEASURE</span>
        </div>
        <div className="d3-tests-grid">
          {testAreas.map((area, i) => (
            <div key={area.id} className="d3-test-card d3-anim" style={{ '--delay': `${i * 0.1}s` }}>
              <div className="d3-test-id">{area.id}</div>
              <h3 className="d3-test-name">{area.name}</h3>
              <p className="d3-test-desc">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results — Large cards */}
      <section className="d3-results">
        <div className="d3-results-header d3-anim">
          <h2 className="d3-results-title">Results</h2>
          <div className="d3-results-line" />
        </div>

        <div className="d3-leaderboard">
          {sorted.map((model, i) => (
            <div key={model.name} className="d3-card d3-anim" style={{ '--delay': `${i * 0.08}s` }}>
              <div className="d3-card-rank">
                <span className="d3-rank-num">{i + 1}</span>
              </div>
              <div className="d3-card-info">
                <div className="d3-card-top">
                  <img src={model.icon} alt="" className="d3-card-icon" />
                  <div>
                    <div className="d3-card-name">{model.name}</div>
                    <div className="d3-card-provider">{model.provider}</div>
                  </div>
                </div>
                <div className="d3-card-metrics">
                  <div className="d3-metric">
                    <div className="d3-metric-label">Spatial</div>
                    <div className="d3-metric-bar-track">
                      <div className="d3-metric-bar-fill" style={{ '--w': `${model.spatial}%` }} />
                    </div>
                    <div className="d3-metric-val">{model.spatial}</div>
                  </div>
                  <div className="d3-metric">
                    <div className="d3-metric-label">Logic</div>
                    <div className="d3-metric-bar-track">
                      <div className="d3-metric-bar-fill" style={{ '--w': `${model.logic}%` }} />
                    </div>
                    <div className="d3-metric-val">{model.logic}</div>
                  </div>
                  <div className="d3-metric">
                    <div className="d3-metric-label">Timing</div>
                    <div className="d3-metric-bar-track">
                      <div className="d3-metric-bar-fill" style={{ '--w': `${model.timing}%` }} />
                    </div>
                    <div className="d3-metric-val">{model.timing}</div>
                  </div>
                  <div className="d3-metric">
                    <div className="d3-metric-label">Complexity</div>
                    <div className="d3-metric-bar-track">
                      <div className="d3-metric-bar-fill" style={{ '--w': `${model.complexity}%` }} />
                    </div>
                    <div className="d3-metric-val">{model.complexity}</div>
                  </div>
                </div>
              </div>
              <div className="d3-card-score">
                <span className="d3-score-val">{model.score}</span>
                <span className="d3-score-pct">%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="d3-footer">
        <span>RedstoneBench</span>
        <span>© 2026</span>
      </footer>
    </div>
  )
}
