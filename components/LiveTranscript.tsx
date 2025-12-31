'use client'

import React, { useRef, useEffect } from 'react'
import { useAgentSimulator } from '@/hooks/useAgentSimulator'
import { TranscriptMessage, LiveTranscriptProps } from '@/types/transcript'
import { formatTimestamp } from '@/lib/transcript'

const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  messages: externalMessages = [],
  onScroll,
  className = '',
  autoScroll = true,
  ...props
}) => {
  const { transcript } = useAgentSimulator()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)

  // Use the hook's transcript if no external messages are provided
  const messages = externalMessages.length > 0 ? externalMessages : transcript

  // Handle scroll events to determine if auto-scroll should be enabled
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (onScroll) onScroll()

    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
      // If user has scrolled up from the bottom, disable auto-scroll
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 5 // 5px buffer
      shouldAutoScrollRef.current = isScrolledToBottom
    }
  }

  // Auto-scroll to bottom when messages change and auto-scroll is enabled
  useEffect(() => {
    if (scrollContainerRef.current && autoScroll && shouldAutoScrollRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
        }
      })
    }
  }, [messages, autoScroll])

  // Reset auto-scroll when component mounts or messages are cleared
  useEffect(() => {
    shouldAutoScrollRef.current = true
  }, [messages.length])

  return (
    <div
      ref={scrollContainerRef}
      className={`glass-card-strong rounded-xl p-4 h-96 overflow-y-auto border border-gray-700/50 shadow-2xl ${className}`}
      onScroll={handleScroll}
      role="log"
      aria-label="Conversation transcript"
      aria-live="polite"
    >
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.speaker === 'Agent' ? 'justify-start' : 'justify-end'} transition-opacity duration-300 ease-in-out opacity-100`}
            role="listitem"
          >
            <div
              className={`max-w-[90%] md:max-w-[80%] p-4 rounded-xl ${
                message.speaker === 'Agent'
                  ? 'bg-slate-800/80 backdrop-blur-md text-white rounded-tl-none border-2 border-neon-cyan/50 shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-500/50'
                  : 'bg-slate-700/80 backdrop-blur-md text-white rounded-tr-none border-2 border-neon-purple/50 shadow-lg shadow-purple-500/30 transition-all duration-200 hover:shadow-purple-500/50'
              }`}
              aria-label={`${message.speaker} said: ${message.content}`}
            >
              <div className="flex justify-between items-baseline">
                <span
                  className={`text-sm font-semibold ${
                    message.speaker === 'Agent'
                      ? 'text-neon-cyan glow-cyan'
                      : 'text-neon-purple glow-purple'
                  }`}
                  aria-hidden="true"
                >
                  {message.speaker}
                </span>
                <span
                  className="text-xs opacity-70 ml-2"
                  aria-label={`Message time: ${formatTimestamp(message.timestamp)}`}
                >
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <p className="mt-1">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveTranscript
