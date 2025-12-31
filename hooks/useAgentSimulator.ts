import { useState, useEffect } from 'react'

export type AgentState = 'idle' | 'listening' | 'processing' | 'speaking'

export interface TranscriptMessage {
  id: string
  speaker: 'Agent' | 'User'
  content: string
  timestamp: Date
}

export interface UseAgentSimulatorReturn {
  currentAgentState: AgentState
  transcript: TranscriptMessage[]
  isRunning: boolean
  interrupt: () => void
  stop: () => void
  start: () => void
}

const SPEAKING_DURATION = 5000
const LISTENING_DURATION = 1000
const USER_SPEAKING_DURATION = 3000

export function useAgentSimulator(): UseAgentSimulatorReturn {
  const [currentAgentState, setCurrentAgentState] = useState<AgentState>('idle')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [activeTimer, setActiveTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [messageCounter, setMessageCounter] = useState<number>(0)

  // Function to add messages to transcript
  const addMessage = (speaker: 'Agent' | 'User', content: string) => {
    const uniqueId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${messageCounter}`
    const newMessage: TranscriptMessage = {
      id: uniqueId,
      speaker,
      content,
      timestamp: new Date(),
    }
    setTranscript((prev) => [...prev, newMessage])
    setMessageCounter((prev) => prev + 1)
  }

  // Function to transition to a new state and potentially add messages
  const transitionToState = (nextState: AgentState) => {
    if (activeTimer !== null) {
      clearTimeout(activeTimer)
      setActiveTimer(null)
    }

    // Add message based on the state we're transitioning to
    if (nextState === 'speaking') {
      // When transitioning to speaking state, add an Agent message
      addMessage('Agent', 'Hello, how can I help you today?')
    } else if (nextState === 'listening') {
      // When transitioning to listening state, add a User message
      addMessage('User', 'I need help with something.')
    }

    setCurrentAgentState(nextState)

    switch (nextState) {
      case 'speaking':
        const timer = setTimeout(() => {
          transitionToState('listening')
        }, SPEAKING_DURATION)
        setActiveTimer(timer)
        break

      case 'listening':
        const listenTimer = setTimeout(() => {
          transitionToState('processing')
        }, LISTENING_DURATION)
        setActiveTimer(listenTimer)
        break

      case 'processing':
        // When transitioning to processing, we immediately transition to speaking with user message
        // This is handled in the processing case
        transitionToState('speaking')
        break

      default:
        break
    }
  }

  const stop = () => {
    if (activeTimer !== null) {
      clearTimeout(activeTimer)
      setActiveTimer(null)
    }
    // Reset agent state to idle to stop visualizer animations
    setCurrentAgentState('idle')
    setIsRunning(false)
  }

  const start = () => {
    if (isRunning) {
      return
    }

    setIsRunning(true)

    if (currentAgentState === 'idle') {
      transitionToState('speaking')
    } else {
      switch (currentAgentState) {
        case 'speaking':
          const timer = setTimeout(() => {
            transitionToState('listening')
          }, SPEAKING_DURATION)
          setActiveTimer(timer)
          break

        case 'listening':
          const listenTimer = setTimeout(() => {
            transitionToState('processing')
          }, LISTENING_DURATION)
          setActiveTimer(listenTimer)
          break

        case 'processing':
          transitionToState('speaking')
          break
      }
    }
  }

  const interrupt = () => {
    if (activeTimer !== null) {
      clearTimeout(activeTimer)
      setActiveTimer(null)
    }
    setCurrentAgentState('listening')
    // Add a User message when interrupting
    addMessage('User', 'Can you explain that further?')
    const timer = setTimeout(() => {
      transitionToState('processing')
    }, LISTENING_DURATION)
    setActiveTimer(timer)
  }

  useEffect(() => {
    setIsRunning(true)
    // Add initial Agent message when starting
    addMessage('Agent', 'Hello, how can I help you today?')
    transitionToState('speaking')

    return () => {
      if (activeTimer !== null) {
        clearTimeout(activeTimer)
      }
      setIsRunning(false)
    }
  }, [])

  return {
    currentAgentState,
    transcript,
    isRunning,
    interrupt,
    stop,
    start,
  }
}
