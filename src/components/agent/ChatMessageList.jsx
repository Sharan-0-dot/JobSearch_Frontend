import { useEffect, useRef } from 'react'
import ChatMessageBubble from './ChatMessageBubble'
import Spinner from '../shared/Spinner'

export default function ChatMessageList({ messages, isSending }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
      {isSending && (
        <div className="flex justify-start">
          <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-surface border border-border">
            <Spinner size={16} className="text-ink-muted" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}