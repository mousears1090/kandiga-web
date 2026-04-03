import { useEffect, useState } from 'react'

function CodeBlock({ children, lang = '' }) {
  const [copied, setCopied] = useState(false)
  const text = typeof children === 'string' ? children : children.join('\n')

  return (
    <div className="relative my-5">
      {lang && (
        <div className="absolute top-0 left-0 px-3 py-1 text-[10px] font-mono text-[var(--text-muted)] bg-[#0e0e16] rounded-tl-lg rounded-br-lg border-b border-r border-[var(--card-border)]">
          {lang}
        </div>
      )}
      <div className="bg-[#0a0a12] border border-[var(--card-border)] rounded-lg px-5 py-4 font-mono text-xs sm:text-sm text-[var(--text)] overflow-x-auto">
        <button
          className="absolute top-3 right-3 bg-[var(--card)] border border-[var(--card-border)] text-[var(--text-muted)] px-2 py-0.5 rounded text-xs cursor-pointer hover:text-[var(--text)] hover:border-[var(--cyan)] transition-all"
          onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className="whitespace-pre-wrap">{children}</pre>
      </div>
    </div>
  )
}

function ComparisonTable() {
  const rows = [
    { model: 'Qwen3 4B 3-bit', kandiga: '1.8 GB', normal: '2.4 GB', speed: '31 tok/s' },
    { model: 'Qwen3.5-35B MoE', kandiga: '1.0 GB', normal: '20 GB', speed: '8.1 tok/s' },
    { model: 'Qwen3.5-122B MoE', kandiga: '2.7 GB', normal: '70 GB', speed: '2.2 tok/s', featured: true },
    { model: 'Gemma 4 26B MoE', kandiga: '1.35 GB', normal: '16 GB', speed: '7.1 tok/s' },
  ]

  return (
    <div className="my-8">
      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((r, i) => (
          <div key={i} className={`rounded-xl p-4 border ${r.featured
            ? 'bg-[var(--card)] border-[var(--cyan)]/30'
            : 'bg-[var(--surface)] border-[var(--card-border)]'}`}>
            <div className={`font-semibold text-sm mb-2 ${r.featured ? 'text-[var(--cyan)]' : 'text-[var(--text-bright)]'}`}>{r.model}</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-[var(--text-muted)] mb-0.5">Kandiga</div>
                <div className="text-[var(--cyan)] font-medium">{r.kandiga}</div>
              </div>
              <div>
                <div className="text-[var(--text-muted)] mb-0.5">Normal</div>
                <div className="text-[var(--text)]">{r.normal}</div>
              </div>
              <div>
                <div className="text-[var(--text-muted)] mb-0.5">Speed</div>
                <div className="text-[var(--text)]">{r.speed}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block feature-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="pb-3 text-left text-[var(--text-muted)] font-medium">Model</th>
              <th className="pb-3 text-left text-[var(--cyan)] font-medium">Kandiga RAM</th>
              <th className="pb-3 text-left text-[var(--text-muted)] font-medium">Normal RAM</th>
              <th className="pb-3 text-left text-[var(--text-muted)] font-medium">Speed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[var(--card-border)]/30 last:border-0">
                <td className={`py-3 font-medium ${r.featured ? 'text-[var(--cyan)]' : 'text-[var(--text-bright)]'}`}>{r.model}</td>
                <td className="py-3 text-[var(--cyan)] font-medium">{r.kandiga}</td>
                <td className="py-3 text-[var(--text-muted)]">{r.normal}</td>
                <td className="py-3 text-[var(--text)]">{r.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function BlogPost() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--void)] border-b border-[var(--card-border)]" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 no-underline">
            <img src="/logo.png" alt="Kandiga" className="w-7 h-7 rounded" />
            <span className="font-bold text-[var(--cyan)] text-[15px] font-mono uppercase tracking-wider">kandiga</span>
          </a>
          <a href="#" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to home
          </a>
        </div>
      </nav>

      {/* Article */}
      <article className={`max-w-[720px] mx-auto px-6 md:px-10 pt-28 sm:pt-36 pb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--cyan)]/20 bg-[var(--cyan-dim)] text-xs text-[var(--cyan)]">
            Release
          </span>
          <span className="text-xs text-[var(--text-muted)]">April 3, 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[var(--text-bright)] leading-[1.15] tracking-tight mb-6">
          Running 122B Parameters in 2.7GB: How We Built a Production AI Agent on Apple Silicon
        </h1>

        <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-12">
          A technical deep-dive into Selective Expert Materialization, 3-bit quantization, and the TriEngine architecture that lets three AI models run simultaneously on a 16GB Mac Mini.
        </p>

        <div className="glow-line mb-12" />

        {/* --- The Problem --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">The Problem</h2>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          Running large AI models locally has a fundamental constraint: memory. A 35B-parameter model at 4-bit quantization needs roughly 20GB of RAM. A 122B model needs 70GB. The new 397B models? Over 200GB. Most consumer machines top out at 16-24GB.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          The alternative is cloud APIs. But they are slow (network round-trips on every token), expensive (pennies per query add up fast), and fundamentally privacy-invasive -- your data leaves your machine.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-8">
          We wanted something different: frontier-class AI running entirely on a consumer Mac, with no cloud dependency, no API keys, and no compromises on quality. The question was whether the physics of memory bandwidth and SSD throughput would even allow it.
        </p>

        {/* --- The Breakthrough --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">The Breakthrough: Selective Expert Materialization</h2>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          The key insight comes from how Mixture-of-Experts (MoE) models actually work. A 35B MoE model has 35 billion parameters on paper, but it only activates <span className="text-[var(--cyan)]">3 billion</span> of them for any given token. The other 32 billion sit idle. A 122B model activates just 10B per token.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          MoE models split their feed-forward layers into hundreds of small "expert" networks. A learned router decides which 8 of 256 experts to activate for each token. The shared layers (attention, layer norms, embedding) are relatively small -- about 1GB for the 35B model.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          Selective Expert Materialization exploits this sparsity:
        </p>

        <div className="my-6 space-y-3">
          {[
            'Keep shared layers (attention, norms, router gates) permanently on GPU -- about 1GB',
            'Store all 256 expert MLP weights on SSD as pre-split binary files',
            'When a token needs experts #42, #128, and #201, load just those three via pread()',
            'Custom NEON-vectorized dequantization kernel runs on CPU P-cores via GCD',
            'GPU handles attention while CPU handles expert compute in parallel',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] mt-2 shrink-0" />
              <span className="text-[var(--text)] leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-[var(--text)] leading-relaxed mb-8">
          The result: a 35B model running in <span className="text-[var(--cyan)] font-medium">1.0GB of GPU RAM</span>. A 122B model in <span className="text-[var(--cyan)] font-medium">2.7GB</span>. Both on a machine that normally could not load these models at all.
        </p>

        {/* --- 3-Bit --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">3-Bit: Less Data = More Speed</h2>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          The standard quantization for local LLMs is 4-bit: each weight occupies 4 bits instead of 16. This works well for dense models. But we realized that MoE experts have a unique property: because each expert specializes in a narrow domain, their weight distributions are more compressible.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          We dropped to 3-bit quantization using MLX's native <code className="text-[var(--cyan)] bg-[var(--cyan-dim)] px-1.5 py-0.5 rounded text-xs font-mono">mx.quantize(bits=3)</code> -- 8 levels per weight instead of 16. The impact was dramatic:
        </p>

        <div className="my-6 grid sm:grid-cols-2 gap-4">
          {[
            { label: '22% less SSD I/O per token', desc: 'Less data to read = faster inference' },
            { label: '35B: 6.7 to 8.1 tok/s', desc: '+21% speed improvement' },
            { label: '122B: 1.3 to 2.2 tok/s', desc: '+69% speed improvement' },
            { label: '22% less RAM', desc: 'Shared layers shrink proportionally' },
          ].map((item, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--card-border)] rounded-lg p-4">
              <div className="text-sm font-medium text-[var(--cyan)] mb-1">{item.label}</div>
              <div className="text-xs text-[var(--text-muted)]">{item.desc}</div>
            </div>
          ))}
        </div>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          The tricky part was the kernel. MLX packs 3-bit weights in a specific bit layout -- not aligned to byte boundaries. We wrote <code className="text-[var(--cyan)] bg-[var(--cyan-dim)] px-1.5 py-0.5 rounded text-xs font-mono">repack_experts_3bit.py</code> to compress the expert binary files and a matching NEON dequantization kernel that extracts 3-bit values from the packed format at full throughput.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-8">
          One important finding: 3-bit works for MoE models because experts are individually less critical. But it breaks dense models for instruction following. A 9B dense model at 3-bit loses the ability to follow complex instructions reliably. Double quantization kills it. This is an MoE-specific win.
        </p>

        {/* --- The Agent Pipeline --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">The Agent Pipeline</h2>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          Kandiga is not just an inference engine. It is a production AI agent that orchestrates three models simultaneously, each handling what it does best:
        </p>

        <div className="my-6 space-y-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
              <span className="text-sm font-semibold text-[var(--text-bright)]">4B Router (1.8GB)</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Handles routing decisions and tool calling using native Qwen format via apply_chat_template. 28/30 accuracy on tool calling benchmarks at 3-bit. Fast at 31 tok/s.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
              <span className="text-sm font-semibold text-[var(--text-bright)]">35B Brain (1.0GB GPU)</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Handles response writing, code generation, and syntax checking. Reviews code from other models and fixes errors before delivery. 8.1 tok/s at 3-bit.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--cyan)]/30 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
              <span className="text-sm font-semibold text-[var(--cyan)]">122B Reasoner (2.7GB GPU)</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Activated for complex coding tasks that require deep reasoning. Lazy-loaded -- only materializes when the 35B model is not enough. 2.2 tok/s at 3-bit.
            </p>
          </div>
        </div>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          All three models fit in <span className="text-[var(--cyan)] font-medium">5.5GB of GPU RAM</span> on a 16GB Mac. The pipeline achieves 95% accuracy on a 44-turn multi-turn conversation benchmark, with an average of 3.1 seconds per turn thanks to the persistent KV cache.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          LoopGuard monitors the agent pipeline and prevents infinite loops -- a common failure mode in agentic systems where the model gets stuck in a tool-call cycle. Auto-save detects inline code generation and writes files to disk automatically, eliminating the copy-paste workflow.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-8">
          The persistent KV cache is the secret to the 3.1s per turn number. Most local LLMs replay your entire conversation history on every message. By turn 30, you are re-processing thousands of tokens. Kandiga keeps the model's internal state in memory. Follow-ups only process the new message. Turn 50 is as fast as turn 1.
        </p>

        {/* --- Gemma 4 --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">Gemma 4 on Day One</h2>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          When Google released Gemma 4 26B-A4B, we had it running via SEM the same day. The model uses 128 experts across 30 layers with standard transformer attention -- a straightforward architecture for our engine to handle.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          The result: <span className="text-[var(--cyan)] font-medium">7.1 tok/s at 1.35GB GPU RAM</span>. That is a 26B model running faster than most 7B models run on the same hardware, because we only load the 4B of active parameters.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          It was not entirely smooth. We had to fix the mlx_lm sanitize method to handle a weight naming mismatch in Gemma 4's architecture. And tool calling is broken at 4-bit quantization -- the model generates valid text but the structured output for function calls degrades. Text generation works well though.
        </p>

        <p className="text-[var(--text)] leading-relaxed mb-8">
          Day-one support for new MoE models is a design goal. The SEM architecture is model-agnostic -- any MoE model with standard expert routing can be split and loaded with the same pipeline.
        </p>

        {/* --- The Numbers --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">The Numbers</h2>

        <p className="text-[var(--text)] leading-relaxed mb-4">
          Here is the comparison. "Normal RAM" is what you need to load the full model into GPU memory with standard MLX inference. "Kandiga RAM" is our GPU footprint with Selective Expert Materialization.
        </p>

        <ComparisonTable />

        <p className="text-[var(--text)] leading-relaxed mb-8">
          The 35B model goes from 20GB to 1.0GB -- a <span className="text-[var(--cyan)] font-medium">20x reduction</span>. The 122B model goes from 70GB to 2.7GB -- a <span className="text-[var(--cyan)] font-medium">26x reduction</span>. Both run on a machine with 16GB total unified memory, leaving plenty of headroom for the OS and applications.
        </p>

        {/* --- What We Learned --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 tracking-tight">What We Learned</h2>

        <div className="my-6 space-y-5">
          {[
            {
              title: '3-bit quantization works for MoE models',
              desc: 'Experts are individually less sensitive to quantization because each one handles a narrow domain. Dense models at 3-bit lose instruction-following ability.',
            },
            {
              title: 'Native tool calling format matters',
              desc: 'We spent weeks engineering custom routing prompts. Then we tried the model\'s trained format via apply_chat_template and got 28/30 accuracy immediately. The model\'s trained format works better than any prompt engineering.',
            },
            {
              title: 'Persistent KV cache is essential',
              desc: 'Replaying conversation history every turn is wasteful and gets slower as the conversation grows. Keeping the KV cache alive is the difference between 3s and 30s per turn.',
            },
            {
              title: 'The 4B model is smarter than expected',
              desc: '28/30 on native tool calling at 3-bit quantization. It handles routing, classification, and structured output reliably. You do not always need a big model for reasoning about what to do.',
            },
            {
              title: 'SSD bandwidth is the real bottleneck',
              desc: 'On Apple Silicon, the SSD delivers about 5-7 GB/s sequential read. With 3-bit quantization, we read less data per token, which directly translates to higher tok/s. This is why 3-bit helps MoE models more than it helps dense models.',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[var(--cyan-dim)] border border-[var(--cyan)]/20 text-[var(--cyan)] flex items-center justify-center text-[10px] font-semibold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-medium text-[var(--text-bright)] mb-1">{item.title}</div>
                <div className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- What's Next --- */}
        <h2 className="text-2xl font-semibold text-[var(--text-bright)] mb-4 mt-12 tracking-tight">What's Next</h2>

        <div className="my-6 space-y-3">
          {[
            { label: '397B model support', desc: '224GB download in progress. 17B active parameters, 512 experts.' },
            { label: 'iOS app', desc: 'MLX Swift module built, pending Xcode setup. Same SEM engine on iPhone/iPad.' },
            { label: 'Skill learning', desc: 'Agents create reusable tools from successful tasks. Learn once, use forever.' },
            { label: 'Production deployment', desc: 'HTTPS endpoint, API key management, rate limiting -- all running on a single Mac.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--card-border)] rounded-lg p-4">
              <span className="text-[var(--cyan)] text-sm mt-0.5">&#x2192;</span>
              <div>
                <div className="text-sm font-medium text-[var(--text-bright)]">{item.label}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CTA --- */}
        <div className="mt-16 glow-line" />
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-[var(--text-bright)] mb-4">Try it yourself</h3>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg px-5 py-4 max-w-md mx-auto mb-4">
            <div className="flex items-center justify-between gap-3 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[var(--cyan)]">$</span>
                <span className="text-[var(--text)]">pip install kandiga && kandiga setup</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText('pip install kandiga && kandiga setup')}
                className="shrink-0 bg-[var(--surface)] border border-[var(--card-border)] text-[var(--text-muted)] px-2.5 py-1 rounded text-xs cursor-pointer hover:text-[var(--text)] hover:border-[var(--cyan)] transition-all"
              >
                Copy
              </button>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Requires Apple Silicon Mac with 16GB+ RAM and Python 3.10+
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <a href="https://github.com/kantheon/kandiga" target="_blank" rel="noopener noreferrer"
               className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://pypi.org/project/kandiga" target="_blank" rel="noopener noreferrer"
               className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline">
              PyPI
            </a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline">
              Home
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--card-border)] text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <img src="/logo.png" alt="Kandiga" className="w-4 h-4 rounded" />
            <span>Built by <a href="https://kantheon.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--cyan)] transition-colors no-underline">Kantheon</a></span>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>
      </article>
    </div>
  )
}
