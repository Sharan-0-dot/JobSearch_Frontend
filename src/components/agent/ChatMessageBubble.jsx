import ToolsUsedTag from './ToolsUsedTag'

export default function ChatMessageBubble({ message }) {
  const { role, content, toolsUsed, warning, executionTimeMs } = message

  if (role === 'user') {
    return (
      <div className="flex justify-end animate-message-in">
        <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-accent text-surface font-body text-body">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start animate-message-in">
      <div className="max-w-[75%] flex flex-col">
        <div
          className={`px-4 py-2.5 rounded-2xl rounded-bl-sm font-body text-body
            ${warning
              ? 'bg-warn-soft text-ink border border-warn/30'
              : 'bg-surface text-ink border border-border'}`}
        >
          {content}
          {warning && (
            <p className="mt-2 font-body text-caption text-warn">
              {warning} Try including a role, location, or job type.
            </p>
          )}
        </div>
        {!warning && <ToolsUsedTag tools={toolsUsed} />}
        {executionTimeMs != null && (
          <span className="font-mono text-caption text-ink-muted mt-1 ml-1">
            {executionTimeMs}ms
          </span>
        )}
      </div>
    </div>
  )
}