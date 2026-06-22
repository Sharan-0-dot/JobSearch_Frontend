const examplePrompts = [
  'Find backend internships in Bangalore with Spring Boot',
  'Show me remote frontend roles for freshers',
  'What jobs match my uploaded resume?',
]

export default function ChatEmptyState({ onPromptClick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
      <h2 className="font-display text-display text-ink">
        Which jobs actually fit you?
      </h2>
      <p className="font-body text-body text-ink-muted max-w-md">
        Ask in plain language. The agent searches live listings, ranks them against
        your profile, and explains why each one matches.
      </p>
      <div className="flex flex-col gap-2 mt-2 w-full max-w-md">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className="text-left px-3 py-2 rounded-md border border-border bg-surface
                       font-body text-body text-ink-muted
                       hover:border-accent hover:text-ink transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}