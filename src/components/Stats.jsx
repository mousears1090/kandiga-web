import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ value, suffix = '', duration = 1500 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(eased * value)
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  const formatted = Number.isInteger(value) ? Math.round(display) : display.toFixed(1)
  return <span ref={ref}>{formatted}{suffix}</span>
}

const stats = [
  { value: 95, suffix: '%', label: 'Accuracy', sub: '44-turn multi-turn conversation' },
  { value: 12, suffix: '+ t/s', label: '35B MoE speed', sub: '3-bit quantization on M4' },
  { value: 2.7, suffix: ' GB', label: '122B GPU RAM', sub: 'Down from 70GB standard' },
  { value: 3.1, suffix: 's', label: 'Avg per turn', sub: 'Persistent KV cache' },
]

const rows = [
  { label: 'Model', col1: 'Qwen3 4B', col2: 'Qwen3.5-35B MoE', col3: 'Qwen3.5-122B MoE', col4: 'Gemma 4 26B MoE' },
  { label: 'Parameters', col1: '4B (dense)', col2: '35B (3B active)', col3: '122B (10B active)', col4: '26B (4B active)' },
  { label: 'Quantization', col1: '3-bit', col2: '3-bit', col3: '3-bit', col4: '4-bit' },
  { label: 'Speed*', col1: '31 tok/s', col2: '~12 tok/s', col3: '~4 tok/s', col4: '~10 tok/s' },
  { label: 'Standard RAM', col1: '2.4 GB', col2: '20 GB', col3: '70 GB', col4: '16 GB' },
  { label: 'Kandiga RAM', col1: '1.8 GB', col2: '1.0 GB', col3: '2.7 GB', col4: '1.35 GB', highlight: true },
]

const models = [
  {
    name: 'Qwen3 4B',
    sub: 'Dense · Router & tool calling',
    specs: [
      { label: 'Speed', value: '31 tok/s' },
      { label: 'RAM', value: '1.8 GB', good: true },
      { label: 'Quant', value: '3-bit' },
      { label: 'Role', value: 'Router' },
    ],
  },
  {
    name: 'Qwen3.5-35B MoE',
    sub: '3B active · 256 experts',
    specs: [
      { label: 'Speed', value: '~12 tok/s' },
      { label: 'RAM', value: '1.0 GB', good: true },
      { label: 'Quant', value: '3-bit' },
      { label: 'Role', value: 'Brain' },
    ],
  },
  {
    name: 'Qwen3.5-122B MoE',
    sub: '10B active · 256 experts',
    featured: true,
    specs: [
      { label: 'Speed', value: '~4 tok/s' },
      { label: 'RAM', value: '2.7 GB', good: true },
      { label: 'Quant', value: '3-bit' },
      { label: 'Role', value: 'Reasoner' },
    ],
  },
  {
    name: 'Gemma 4 26B MoE',
    sub: '4B active · 128 experts · Day-one support',
    specs: [
      { label: 'Speed', value: '~10 tok/s' },
      { label: 'RAM', value: '1.35 GB', good: true },
      { label: 'Quant', value: '4-bit' },
      { label: 'Role', value: 'General' },
    ],
  },
]

export default function Stats() {
  return (
    <section className="py-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((s, i) => (
          <div key={i} className="feature-card text-center">
            <div className="text-2xl md:text-3xl font-bold text-[var(--text-bright)] mb-1 tracking-tight">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-[var(--text)]">{s.label}</div>
            <div className="text-xs text-[var(--text-muted)]">{s.sub}</div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-[var(--text-bright)] mb-2">Supported models</h3>
      <p className="text-sm text-[var(--text-muted)] mb-5">Four models, three running simultaneously. Pick what fits your Mac.</p>

      {/* Mobile: model cards stacked */}
      <div className="flex flex-col gap-4 md:hidden">
        {models.map((m, i) => (
          <div key={i} className={`rounded-xl p-4 border ${m.featured
            ? 'bg-[var(--card)] border-[var(--cyan)]/30'
            : 'bg-[var(--surface)] border-[var(--card-border)]'}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className={`font-semibold text-sm ${m.featured ? 'text-[var(--cyan)]' : 'text-[var(--text-bright)]'}`}>{m.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">{m.sub}</div>
              </div>
              {m.featured && (
                <span className="text-[10px] font-medium text-[var(--cyan)] bg-[var(--cyan-dim)] px-2 py-0.5 rounded-full">Flagship</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {m.specs.map((s, j) => (
                <div key={j} className="flex justify-between items-baseline">
                  <span className="text-[11px] text-[var(--text-muted)]">{s.label}</span>
                  <span className={`text-[13px] font-medium ${
                    s.good ? 'text-[var(--cyan)]' : s.bad ? 'text-red-400/80' : 'text-[var(--text)]'
                  }`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block feature-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="pb-3 text-left text-[var(--text-muted)] font-medium"></th>
              <th className="pb-3 text-left text-[var(--text-bright)] font-medium">Qwen3 4B</th>
              <th className="pb-3 text-left text-[var(--text-bright)] font-medium">Qwen3.5-35B</th>
              <th className="pb-3 text-left text-[var(--cyan)] font-medium">Qwen3.5-122B</th>
              <th className="pb-3 text-left text-[var(--text-bright)] font-medium">Gemma 4 26B</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[var(--card-border)]/30 last:border-0">
                <td className="py-3 text-[var(--text-muted)]">{row.label}</td>
                <td className="py-3 text-[var(--text)]">{row.col1}</td>
                <td className="py-3 text-[var(--text)]">{row.col2}</td>
                <td className={`py-3 font-medium ${row.highlight ? 'text-[var(--cyan)]' : 'text-[var(--text-bright)]'}`}>{row.col3}</td>
                <td className="py-3 text-[var(--text)]">{row.col4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-[var(--text-muted)] mt-4 opacity-60">
        * MoE speeds estimated for M4 Mac Mini internal NVMe. Actual speed depends on SSD bandwidth — expert weights are loaded from disk per token.
      </p>
    </section>
  )
}
