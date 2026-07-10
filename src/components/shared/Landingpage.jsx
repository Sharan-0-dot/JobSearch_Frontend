import { useNavigate } from 'react-router-dom'

const DIFFERENTIATORS = [
  {
    label: 'Autonomous Agent',
    title: 'Not just a chatbot',
    description:
      'A planner decides which tools to invoke, executor tools perform deterministic search and ranking, and a synthesizer agent explains the results — a real agentic loop, not a single prompt wrapper.',
  },
  {
    label: 'Hybrid Ranking',
    title: 'Transparent, not a black box',
    description:
      'Matches are scored with a deterministic formula (skill overlap, location, experience, tech stack, salary) — reproducible and explainable. The LLM layer only explains the reasoning, it never invents the score.',
  },
  {
    label: 'Resume Intelligence',
    title: 'Active career coaching',
    description:
      'Gap analysis against any job description, ATS keyword suggestions, and structural skill extraction from your resume — not just a search box.',
  },
  {
    label: 'Semantic Search',
    title: '768-dim vector matching',
    description:
      'Resumes and jobs are embedded into vector space with pgvector, so "Spring Boot APIs" and "Java microservices" are understood as related — not just string-matched.',
  },
]

const STACK = [
  { name: 'Spring Boot 3.x', role: 'REST API & DI' },
  { name: 'LangChain4j', role: 'Agent orchestration' },
  { name: 'Gemini / Llama 3', role: 'LLM (cloud / local)' },
  { name: 'PostgreSQL + pgvector', role: 'Semantic search' },
  { name: 'Resilience4j', role: 'Circuit breaker, retry' },
  { name: 'Apache Tika + PDFBox', role: 'Resume parsing' },
]

const FLOW_STEPS = [
  'You ask something in plain language — e.g. "Find backend internships in Bangalore with Spring Boot."',
  'A planner agent decides which tools to call: live job search, semantic ranking, resume comparison, or profile lookup.',
  'Jobs are scored with a deterministic formula, then an LLM layer explains why each one matches and what\u2019s missing.',
  'Everything is remembered across the conversation, and your feedback (liked/applied) improves future rankings.',
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg animate-message-in">
      <section className="px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-caption text-accent mb-4 uppercase tracking-wide">
            AI Job Search Agent
          </p>
          <h1 className="font-display text-display-lg text-ink mb-5">
            An agent that actually understands your career
          </h1>
          <p className="font-body text-body text-ink-muted max-w-lg mx-auto mb-8 leading-relaxed">
            Not another keyword-matching job board. This is an autonomous
            planner-executor agent that semantically matches you to real
            listings, explains its reasoning, and coaches your resume for
            the roles you actually want.
          </p>
          <button
            onClick={() => navigate('/app')}
            className="px-6 py-3 rounded-md bg-accent text-surface font-body text-body font-medium
                       hover:opacity-90 transition-opacity"
          >
            Enter the App
          </button>
          <p className="font-body text-caption text-ink-muted mt-4">
            Demo project — enter any username to explore, no signup or real data needed.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-display text-display text-ink mb-4">
              Why job search is broken
            </h2>
            <ul className="space-y-2 font-body text-body text-ink-muted">
              <li>— Thousands of irrelevant listings across scattered platforms</li>
              <li>— Keyword filters miss opportunities that are genuinely a fit</li>
              <li>— No feedback on why your resume gets rejected</li>
              <li>— Hours lost manually screening jobs one by one</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-display text-ink mb-2 text-center">
            What makes this different
          </h2>
          <p className="font-body text-body text-ink-muted text-center mb-8">
            Built as a production-grade agentic system, not an LLM wrapper.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-lg border border-border bg-surface"
              >
                <span className="inline-block font-mono text-caption text-accent bg-accent-soft px-2 py-0.5 rounded mb-3">
                  {item.label}
                </span>
                <h3 className="font-display text-ink font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-caption text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-display text-ink mb-6 text-center">
            How it works
          </h2>
          <ol className="space-y-4">
            {FLOW_STEPS.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span
                  className="shrink-0 w-7 h-7 rounded-full bg-accent text-surface
                             font-mono text-caption font-medium flex items-center justify-center"
                >
                  {i + 1}
                </span>
                <p className="font-body text-body text-ink-muted pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-xl mx-auto">
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="font-mono text-caption text-ink-muted mb-3">Example query</p>
            <p className="font-body text-body text-ink mb-4">
              "Find backend internships in Bangalore with Spring Boot"
            </p>
            <div className="h-px bg-border mb-4" />
            <p className="font-body text-caption text-ink-muted leading-relaxed">
              The agent fetches live listings, deduplicates them, ranks the
              top matches with a transparent score, and tells you exactly
              which skills to highlight — like your Kafka project — and
              which to add, like Redis.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-caption text-ink-muted uppercase tracking-wide mb-4 text-center">
            Built With
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STACK.map((tech) => (
              <div
                key={tech.name}
                className="rounded-md border border-border bg-surface px-3 py-2"
              >
                <p className="font-body text-caption text-ink font-medium">{tech.name}</p>
                <p className="font-body text-caption text-ink-muted">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-xl mx-auto text-center">
          <button
            onClick={() => navigate('/app')}
            className="px-6 py-3 rounded-md bg-accent text-surface font-body text-body font-medium
                       hover:opacity-90 transition-opacity"
          >
            Try the Demo
          </button>
        </div>
      </section>
    </div>
  )
}