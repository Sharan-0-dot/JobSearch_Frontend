import { useState, useCallback } from 'react'
import { sendQuery, clearMemory } from '../../api/agentApi'
import { useUser } from '../../context/UserContext'
import ChatMessageList from './ChatMessageList'
import ChatInputBar from './ChatInputBar'
import ChatEmptyState from './ChatEmptyState'
import ClearMemoryButton from './ClearMemoryButton'

let idCounter = 0
const nextId = () => `msg-${++idCounter}`

export default function ChatPage() {
  const { userId } = useUser()
  const [messages, setMessages] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  const handleSend = useCallback(async (query) => {
    const userMessage = { id: nextId(), role: 'user', content: query }
    setMessages((prev) => [...prev, userMessage])
    setIsSending(true)

    try {
      const res = await sendQuery(userId, query)
      const agentMessage = {
        id: nextId(),
        role: 'agent',
        content: res.response,
        toolsUsed: res.toolsUsed,
        warning: res.warning,
        executionTimeMs: res.executionTimeMs,
      }
      setMessages((prev) => [...prev, agentMessage])
    } catch (err) {
      const errorMessage = {
        id: nextId(),
        role: 'agent',
        content: err.message || 'Something went wrong reaching the agent. Try again.',
        warning: null,
        toolsUsed: [],
        executionTimeMs: null,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsSending(false)
    }
  }, [userId])

  const handleClearMemory = useCallback(async () => {
    setIsClearing(true)
    try {
      await clearMemory(userId)
      setMessages([])
    } catch {
      
    } finally {
      setIsClearing(false)
    }
  }, [userId])

  return (
    <div className="flex flex-col h-full">
      {messages.length > 0 && (
        <div className="flex justify-end px-4 pt-3">
          <ClearMemoryButton onClear={handleClearMemory} disabled={isClearing || isSending} />
        </div>
      )}

      {messages.length === 0 ? (
        <ChatEmptyState onPromptClick={handleSend} />
      ) : (
        <ChatMessageList messages={messages} isSending={isSending} />
      )}

      <ChatInputBar onSend={handleSend} disabled={isSending} />
    </div>
  )
}