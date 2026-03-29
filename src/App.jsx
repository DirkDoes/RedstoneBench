import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import './index.css'

const CELL_SIZE = 24
const FILL_CHANCE = 0.18

const baseModels = [
  { name: 'claude-3.5-sonnet', provider: 'Anthropic', icon: 'claude.svg', baseScore: 91 },
  { name: 'gpt-o3', provider: 'OpenAI', icon: 'openai.svg', baseScore: 87 },
  { name: 'gpt-4o', provider: 'OpenAI', icon: 'openai.svg', baseScore: 82 },
  { name: 'claude-3-opus', provider: 'Anthropic', icon: 'claude.svg', baseScore: 79 },
  { name: 'gemini-2.0-pro', provider: 'Google', icon: 'gemini.svg', baseScore: 74 },
  { name: 'deepseek-r1', provider: 'DeepSeek', icon: 'deepseek.svg', baseScore: 69 },
  { name: 'grok-3', provider: 'xAI', icon: 'grok.svg', baseScore: 58 },
  { name: 'gemini-2.5-flash', provider: 'Google', icon: 'gemini.svg', baseScore: 51 },
]

const tabInfo = {
  general: {
    title: 'General Accuracy Distribution',
    desc: 'Overall success rate across all 127 redstone circuit challenges',
    icon: 'redstone',
    heading: 'General Overview',
    body: 'The general benchmark aggregates scores across all test categories — spatial reasoning, circuit logic, tick timing, and complex builds. Models are placed in a live Minecraft 3D environment and must build working redstone contraptions from scratch.',
  },
  logic: {
    title: 'Logic Gate Accuracy',
    desc: 'Success rate on AND, OR, NOT, and XOR gate construction',
    icon: 'repeater',
    heading: 'Circuit Logic',
    body: 'Tests the model\'s ability to construct fundamental logic gates using redstone. Minecraft redstone has unique constraints: signals decay over 15 blocks, repeaters add tick delays, and comparators enable analog signal processing. Models must reason about these rules to build functional circuits.',
  },
  static: {
    title: 'Static Movement Accuracy',
    desc: 'Piston, door, and trapdoor mechanism construction',
    icon: 'piston',
    heading: 'Static Movement',
    body: 'Evaluates contraptions that use pistons, sticky pistons, and slime/honey blocks to create mechanical movement. Models must understand block pushing limits (12 blocks max), quasi-connectivity, and the unique interaction between pistons and different block types.',
  },
  dynamic: {
    title: 'Dynamic Movement Accuracy',
    desc: 'Flying machines, item transport, and state machines',
    icon: 'slime',
    heading: 'Dynamic Movement',
    body: 'The most complex category — models must build self-propelling flying machines, item sorting systems, and multi-state contraptions. This requires understanding of observer blocks, BUD switches, and precise tick-level timing across moving components.',
  },
}

function randomizeScores() {
  return baseModels.map(m => ({
    ...m,
    score: Math.max(15, Math.min(97, m.baseScore + Math.floor((Math.random() - 0.5) * 24))),
  }))
}

function GridBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)

      const cols = Math.ceil(w / CELL_SIZE)
      const rows = Math.ceil(h / CELL_SIZE)

      ctx.fillStyle = '#0d0d0d'
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() < FILL_CHANCE) {
            ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          }
        }
      }
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return <canvas ref={canvasRef} className="bg-grid" />
}

function getRankClass(i) {
  if (i === 0) return 'rank-1'
  if (i === 1) return 'rank-2'
  if (i === 2) return 'rank-3'
  return 'rank-default'
}

/* ---- Shared mouse-reactive hook ---- */
function useMouseRotation(defaultX, defaultY, rangeX = 15, rangeY = 20) {
  const containerRef = useRef(null)
  const [rot, setRot] = useState({ x: defaultX, y: defaultY })

  useEffect(() => {
    function handleMouseMove(e) {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      setRot({ x: defaultX + dy * rangeX, y: defaultY + dx * rangeY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { containerRef, rot }
}

/* ---- Shared Box helper ---- */
function Box({ w, h, d, textures, style: extraStyle, faceStyle }) {
  const hw = w / 2, hh = h / 2, hd = d / 2
  return (
    <div className="p-box" style={{ width: w, height: h, ...extraStyle }}>
      {/* Front */}
      <div className="p-face" style={{
        width: w, height: h,
        top: 0, left: 0,
        transform: `translate3d(0, 0, ${hd}px)`,
        backgroundImage: `url(${textures.front})`,
        backgroundSize: `${w}px ${h}px`,
        ...faceStyle,
      }} />
      {/* Back */}
      <div className="p-face" style={{
        width: w, height: h,
        top: 0, left: 0,
        transform: `translate3d(0, 0, ${-hd}px) rotateY(180deg)`,
        backgroundImage: `url(${textures.back})`,
        backgroundSize: `${w}px ${h}px`,
        ...faceStyle,
      }} />
      {/* Right */}
      <div className="p-face" style={{
        width: d, height: h,
        top: 0, left: hw - hd,
        transform: `rotateY(90deg) translateZ(${hw}px)`,
        backgroundImage: `url(${textures.right})`,
        backgroundSize: `${d}px ${h}px`,
        ...faceStyle,
      }} />
      {/* Left */}
      <div className="p-face" style={{
        width: d, height: h,
        top: 0, left: hw - hd,
        transform: `rotateY(-90deg) translateZ(${hw}px)`,
        backgroundImage: `url(${textures.left})`,
        backgroundSize: `${d}px ${h}px`,
        ...faceStyle,
      }} />
      {/* Top */}
      <div className="p-face" style={{
        width: w, height: d,
        top: hh - hd, left: 0,
        transform: `rotateX(90deg) translateZ(${hh}px)`,
        backgroundImage: `url(${textures.top})`,
        backgroundSize: `${w}px ${d}px`,
        ...faceStyle,
      }} />
      {/* Bottom */}
      <div className="p-face" style={{
        width: w, height: d,
        top: hh - hd, left: 0,
        transform: `rotateX(-90deg) translateZ(${hh}px)`,
        backgroundImage: `url(${textures.bottom})`,
        backgroundSize: `${w}px ${d}px`,
        ...faceStyle,
      }} />
    </div>
  )
}

/* ---- Interactive 3D Redstone Icon (thin slab) ---- */
function RedstoneIcon() {
  const { containerRef, rot } = useMouseRotation(-20, 25)

  const U = 6  // slightly larger scale for the icon
  const W = 16 * U   // 96px face
  const D = 1 * U    // 6px thick (1 MC pixel)

  return (
    <div ref={containerRef} className="sidebar-icon-wrap">
      <div
        className="piston-3d redstone-glow"
        style={{
          width: W, height: W,
          transform: `perspective(400px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        }}
      >
        <Box w={W} h={W} d={D}
          textures={{
            front: 'redstone.png',
            back: 'redstone.png',
            left: 'redstone.png',
            right: 'redstone.png',
            top: 'redstone.png',
            bottom: 'redstone.png',
          }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </div>
  )
}

/* (old PistonIcon removed — using PistonIconFull below) */

/* (PoleFaces removed — using piston_pole.png directly now) */

/* ---- Interactive 3D Repeater ---- */
function RepeaterIcon() {
  const { containerRef, rot } = useMouseRotation(-30, 30)

  // Repeater: flat slab 16x4x16 with two torches on top
  // Torch: 2x6 actual body, but texture is 4x7 (1px overflow on sides, 1px on top)
  const U = 5
  const W = 16 * U     // slab width/depth = 80
  const slabH = 4 * U  // slab height = 20

  // Torch dimensions in screen px
  // Actual torch body: 2x6 MC → 10x30 screen
  // Texture size: 4x7 MC → 20x35 screen
  // The texture overflows 1 MC pixel (5 screen px) on each side
  const torchBodyW = 2 * U  // 10 — actual width
  const torchTexW = 4 * U   // 20 — texture width (1px overflow each side)
  const torchBodyH = 6 * U  // 30 — actual height
  const torchTexH = 7 * U   // 35 — texture height (1px overflow on top)
  const torchTopTex = 2 * U // 10 — torch head texture (but actual top is 2x2)
  const torchTopActual = torchBodyW // actual top = body width

  const totalH = slabH + torchBodyH // 50 total

  // Torch positions on the repeater (roughly at 1/3 and 2/3 along depth)
  const torch1Z = 4 * U   // 20px from front edge
  const torch2Z = 11 * U  // 55px from front edge

  function Torch({ offsetX, offsetZ }) {
    const overflow = 1 * U // 5px overflow on each side
    // The torch planes are arranged so the 4-wide texture
    // creates a 2-wide space within, with 1px overflow on each side
    const hw = torchBodyW / 2
    const hh = torchBodyH / 2
    const hd = torchBodyW / 2

    return (
      <div className="p-box" style={{
        width: torchTexW, height: torchTexH,
        position: 'absolute',
        bottom: slabH,
        left: offsetX - overflow,
      }}>
        {/* Front — placed at front edge of 2px body, but texture overflows */}
        <div className="p-face" style={{
          width: torchTexW, height: torchTexH,
          top: 0, left: 0,
          transform: `translate3d(${0}px, 0, ${offsetZ + hd}px)`,
          backgroundImage: `url(repeater/redstone_torch.png)`,
          backgroundSize: `${torchTexW}px ${torchTexH}px`,
        }} />
        {/* Back */}
        <div className="p-face" style={{
          width: torchTexW, height: torchTexH,
          top: 0, left: 0,
          transform: `translate3d(${0}px, 0, ${offsetZ - hd}px) rotateY(180deg)`,
          backgroundImage: `url(repeater/redstone_torch.png)`,
          backgroundSize: `${torchTexW}px ${torchTexH}px`,
        }} />
        {/* Right */}
        <div className="p-face" style={{
          width: torchTexW, height: torchTexH,
          top: 0, left: 0,
          transform: `translate3d(${0}px, 0, ${offsetZ}px) rotateY(90deg)`,
          backgroundImage: `url(repeater/redstone_torch.png)`,
          backgroundSize: `${torchTexW}px ${torchTexH}px`,
        }} />
        {/* Left */}
        <div className="p-face" style={{
          width: torchTexW, height: torchTexH,
          top: 0, left: 0,
          transform: `translate3d(${0}px, 0, ${offsetZ}px) rotateY(-90deg)`,
          backgroundImage: `url(repeater/redstone_torch.png)`,
          backgroundSize: `${torchTexW}px ${torchTexH}px`,
        }} />
        {/* Top — uses redstone_torch_head.png */}
        <div className="p-face" style={{
          width: torchTexW, height: torchTexW,
          top: 0, left: 0,
          transform: `translate3d(${0}px, ${overflow}px, ${offsetZ}px) rotateX(90deg)`,
          backgroundImage: `url(repeater/redstone_torch_head.png)`,
          backgroundSize: `${torchTexW}px ${torchTexW}px`,
        }} />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="sidebar-icon-wrap">
      <div
        className="piston-3d"
        style={{
          width: W, height: totalH,
          transform: `perspective(500px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        }}
      >
        {/* Slab base */}
        <Box w={W} h={slabH} d={W}
          textures={{
            front: 'repeater/repeater_side.png',
            back: 'repeater/repeater_side.png',
            left: 'repeater/repeater_side.png',
            right: 'repeater/repeater_side.png',
            top: 'repeater/repeater_top.png',
            bottom: 'repeater/repeater_bottom.png',
          }}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        />
        {/* Torch 1 (front) */}
        <Torch offsetX={W / 2 - torchBodyW / 2} offsetZ={-torch1Z + W / 2} />
        {/* Torch 2 (back) */}
        <Torch offsetX={W / 2 - torchBodyW / 2} offsetZ={-torch2Z + W / 2} />
      </div>
    </div>
  )
}

/* ---- Interactive 3D Slime Block ---- */
function SlimeBlockIcon() {
  const { containerRef, rot } = useMouseRotation(-25, 30)

  const U = 5
  const W = 16 * U  // 80
  const innerW = 12 * U // 60 — inner cube (+1 on each side from 10)

  const allSides = (tex) => ({ front: tex, back: tex, left: tex, right: tex, top: tex, bottom: tex })

  return (
    <div ref={containerRef} className="sidebar-icon-wrap">
      <div
        className="piston-3d"
        style={{
          width: W, height: W,
          transform: `perspective(500px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        }}
      >
        {/* Outer cube — semi-transparent */}
        <Box w={W} h={W} d={W}
          textures={allSides('slime_block.png')}
          style={{ position: 'absolute', top: 0, left: 0 }}
          faceStyle={{ opacity: 0.5 }}
        />
        {/* Inner cube — solid */}
        <Box w={innerW} h={innerW} d={innerW}
          textures={allSides('slimeblock_inner.png')}
          style={{
            position: 'absolute',
            top: (W - innerW) / 2,
            left: (W - innerW) / 2,
          }}
        />
      </div>
    </div>
  )
}


/* ---- Piston with piston_pole.png ---- */
function PistonIconFull() {
  const { containerRef, rot } = useMouseRotation(-25, 35)

  const U = 5
  const W = 16 * U
  const baseH = 12 * U
  const poleW = 4 * U
  const poleH = 16 * U
  const headH = 4 * U
  const totalH = baseH + poleH + headH

  const allSides = (tex) => ({ front: tex, back: tex, left: tex, right: tex, top: tex, bottom: tex })

  return (
    <div ref={containerRef} className="sidebar-icon-wrap">
      <div
        className="piston-3d"
        style={{
          width: W, height: totalH,
          transform: `perspective(500px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        }}
      >
        {/* Base body */}
        <Box w={W} h={baseH} d={W}
          textures={{
            front: 'piston/piston_side.png',
            back: 'piston/piston_side.png',
            left: 'piston/piston_side.png',
            right: 'piston/piston_side.png',
            top: 'piston/piston_inner.png',
            bottom: 'piston/piston_bottom.png',
          }}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        />
        {/* Pole — using dedicated piston_pole.png */}
        <Box w={poleW} h={poleH} d={poleW}
          textures={allSides('piston/piston_pole.png')}
          style={{ position: 'absolute', bottom: baseH, left: (W - poleW) / 2 }}
        />
        {/* Head plate */}
        <Box w={W} h={headH} d={W}
          textures={{
            front: 'piston/piston_top_side.png',
            back: 'piston/piston_top_side.png',
            left: 'piston/piston_top_side.png',
            right: 'piston/piston_top_side.png',
            top: 'piston/piston_top.png',
            bottom: 'piston/piston_top.png',
          }}
          style={{ position: 'absolute', bottom: baseH + poleH, left: 0 }}
        />
      </div>
    </div>
  )
}

function SidebarIcon({ type }) {
  switch (type) {
    case 'piston': return <PistonIconFull />
    case 'repeater': return <RepeaterIcon />
    case 'slime': return <SlimeBlockIcon />
    default: return <RedstoneIcon />
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('general')
  const [models, setModels] = useState(() => randomizeScores())

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'logic', label: 'Logic' },
    { id: 'static', label: 'Static Movement' },
    { id: 'dynamic', label: 'Dynamic Movement' },
  ]

  const handleTabChange = useCallback((id) => {
    setActiveTab(id)
    setModels(randomizeScores())
  }, [])

  const sorted = useMemo(() => [...models].sort((a, b) => b.score - a.score), [models])
  const info = tabInfo[activeTab]

  return (
    <>
      <GridBackground />

      <div className="page">
        {/* Header */}
        <div className="header">
          <div className="header-top">
            <div>
              <div className="logo">
                <span className="logo-red">REDSTONE</span>
                <span className="logo-white">BENCH</span>
              </div>
              <div className="subtitle">
                <span className="subtitle-dot">●</span>
                AI 3D Logic Analysis
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="nav-row">
            <div className="tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content area: card (3/4) + sidebar (1/4) */}
        <div className="content-row">
          {/* Stats Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{info.title}</div>
                <div className="card-desc">{info.desc}</div>
              </div>
              <button className="filter-btn">
                Filter Models [{sorted.length}/{sorted.length}]
              </button>
            </div>

            <div className="model-list">
              {sorted.map((model, i) => (
                <div key={model.name} className="model-row">
                  <span className={`model-rank ${getRankClass(i)}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <img src={model.icon} alt="" className="model-icon" />
                  <span className="model-name">{model.name}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${model.score}%` }} />
                  </div>
                  <span className="model-pct">{model.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <SidebarIcon type={info.icon} />
            <h3 className="sidebar-heading">{info.heading}</h3>
            <p className="sidebar-body">{info.body}</p>
          </div>
        </div>
      </div>
    </>
  )
}
