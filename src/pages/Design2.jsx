import { useEffect, useState, useRef } from 'react'
import './Design2.css'

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

function TypeWriter({ text, speed = 30, delay = 0, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [displayed, started, text, speed])

  return <>{displayed}<span className="d2-cursor">█</span></>
}

function AsciiBar({ value, width = 30 }) {
  const filled = Math.round((value / 100) * width)
  const empty = width - filled
  return (
    <span className="d2-ascii-bar">
      [<span className="d2-bar-filled">{'█'.repeat(filled)}</span>
      <span className="d2-bar-empty">{'░'.repeat(empty)}</span>]
      {' '}{String(value).padStart(3, ' ')}%
    </span>
  )
}

export default function Design2() {
  const [bootPhase, setBootPhase] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const resultsRef = useRef(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase(1), 500),
      setTimeout(() => setBootPhase(2), 1200),
      setTimeout(() => setBootPhase(3), 2000),
      setTimeout(() => setBootPhase(4), 2800),
      setTimeout(() => { setBootPhase(5); setShowContent(true) }, 3500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!showContent) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('d2-visible')
          }
        })
      },
      { threshold: 0.05 }
    )
    document.querySelectorAll('.d2-animate-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [showContent])

  const sortedModels = [...models].sort((a, b) => b.score - a.score)

  return (
    <div className="d2-root">
      <div className="d2-scanlines" />
      <div className="d2-vignette" />

      <div className="d2-terminal">
        {/* Boot Sequence */}
        <div className="d2-boot">
          {bootPhase >= 0 && (
            <div className="d2-boot-line">
              <span className="d2-prompt">SYSTEM</span> Initializing RedstoneBench v2.0.26...
            </div>
          )}
          {bootPhase >= 1 && (
            <div className="d2-boot-line">
              <span className="d2-prompt">LOAD</span> Minecraft environment connected ✓
            </div>
          )}
          {bootPhase >= 2 && (
            <div className="d2-boot-line">
              <span className="d2-prompt">LOAD</span> Redstone signal analysis module ✓
            </div>
          )}
          {bootPhase >= 3 && (
            <div className="d2-boot-line">
              <span className="d2-prompt">LOAD</span> 8 models queued for evaluation ✓
            </div>
          )}
          {bootPhase >= 4 && (
            <div className="d2-boot-line d2-boot-ready">
              <span className="d2-prompt">READY</span> All systems operational. Benchmark data loaded.
            </div>
          )}
        </div>

        {showContent && (
          <>
            {/* Hero */}
            <header className="d2-hero">
              <pre className="d2-ascii-art">{`
  ██████╗ ███████╗██████╗ ███████╗████████╗ ██████╗ ███╗   ██╗███████╗
  ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝
  ██████╔╝█████╗  ██║  ██║███████╗   ██║   ██║   ██║██╔██╗ ██║█████╗  
  ██╔══██╗██╔══╝  ██║  ██║╚════██║   ██║   ██║   ██║██║╚██╗██║██╔══╝  
  ██║  ██║███████╗██████╔╝███████║   ██║   ╚██████╔╝██║ ╚████║███████╗
  ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝
              `}</pre>
              <pre className="d2-ascii-sub">{`
  ██████╗ ███████╗███╗   ██╗ ██████╗██╗  ██╗
  ██╔══██╗██╔════╝████╗  ██║██╔════╝██║  ██║
  ██████╔╝█████╗  ██╔██╗ ██║██║     ███████║
  ██╔══██╗██╔══╝  ██║╚██╗██║██║     ██╔══██║
  ██████╔╝███████╗██║ ╚████║╚██████╗██║  ██║
  ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝
              `}</pre>

              <div className="d2-hero-info">
                <div className="d2-divider">{'─'.repeat(70)}</div>
                <p className="d2-hero-desc">
                  <TypeWriter
                    text="AI models enter a live Minecraft 3D environment. They must build working redstone contraptions under real constraints: 15-block signal range, tick-precise timing, and multi-component spatial reasoning."
                    speed={15}
                    delay={200}
                  />
                </p>
                <div className="d2-divider">{'─'.repeat(70)}</div>
              </div>

              <div className="d2-hero-redstone">
                <img src="/redstone.png" alt="Redstone" className="d2-redstone-img" />
                <span className="d2-redstone-label">REDSTONE_DUST.png // 16x16px // signal_source</span>
              </div>

              <div className="d2-test-grid">
                <div className="d2-test-item">
                  <span className="d2-test-id">[TEST_01]</span>
                  <span className="d2-test-name">3D_SPATIAL_REASONING</span>
                  <span className="d2-test-status d2-status-pass">ACTIVE</span>
                </div>
                <div className="d2-test-item">
                  <span className="d2-test-id">[TEST_02]</span>
                  <span className="d2-test-name">CIRCUIT_LOGIC_GATES</span>
                  <span className="d2-test-status d2-status-pass">ACTIVE</span>
                </div>
                <div className="d2-test-item">
                  <span className="d2-test-id">[TEST_03]</span>
                  <span className="d2-test-name">TICK_TIMING_PRECISION</span>
                  <span className="d2-test-status d2-status-pass">ACTIVE</span>
                </div>
                <div className="d2-test-item">
                  <span className="d2-test-id">[TEST_04]</span>
                  <span className="d2-test-name">COMPLEXITY_MANAGEMENT</span>
                  <span className="d2-test-status d2-status-pass">ACTIVE</span>
                </div>
              </div>
            </header>

            {/* Results */}
            <section className="d2-results" ref={resultsRef}>
              <div className="d2-results-header">
                <span className="d2-prompt">RESULTS</span>
                <span className="d2-results-title">{'═'.repeat(10)} MODEL PERFORMANCE MATRIX {'═'.repeat(10)}</span>
              </div>

              {sortedModels.map((model, i) => (
                <div
                  key={model.name}
                  className="d2-model-block d2-animate-in"
                  style={{ '--delay': `${i * 0.12}s` }}
                >
                  <div className="d2-model-header">
                    <span className="d2-model-rank">#{String(i + 1).padStart(2, '0')}</span>
                    <img src={model.icon} alt="" className="d2-model-icon" />
                    <span className="d2-model-name">{model.name}</span>
                    <span className="d2-model-provider">// {model.provider}</span>
                    <span className="d2-model-overall">OVERALL: {model.score}%</span>
                  </div>
                  <div className="d2-model-bars">
                    <div className="d2-bar-row">
                      <span className="d2-bar-label">SPATIAL  </span>
                      <AsciiBar value={model.spatial} />
                    </div>
                    <div className="d2-bar-row">
                      <span className="d2-bar-label">LOGIC    </span>
                      <AsciiBar value={model.logic} />
                    </div>
                    <div className="d2-bar-row">
                      <span className="d2-bar-label">TIMING   </span>
                      <AsciiBar value={model.timing} />
                    </div>
                    <div className="d2-bar-row">
                      <span className="d2-bar-label">COMPLEX  </span>
                      <AsciiBar value={model.complexity} />
                    </div>
                  </div>
                </div>
              ))}

              <div className="d2-footer-line">
                <div className="d2-divider">{'─'.repeat(70)}</div>
                <p>RedstoneBench v2.0 // {models.length} models evaluated // 127 total challenges</p>
                <p>EOF</p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
