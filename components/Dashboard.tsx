'use client'

/**
 * Dashboard component demonstrating the useAgentSimulator hook.
 * This is a simple test component to verify the hook works correctly.
 */

import { useState, useOptimistic, startTransition } from 'react'
import { useAgentSimulator } from '@/hooks/useAgentSimulator'
import AudioVisualizer from './AudioVisualizer/AudioVisualizer'

export default function Dashboard() {
  const { currentAgentState, transcript, isRunning, interrupt, stop, start } = useAgentSimulator()

  // Use optimistic state for interrupt action to provide immediate UI feedback
  const [optimisticState, setOptimisticState] = useOptimistic(
    currentAgentState,
    (currentState, newState: 'idle' | 'listening' | 'processing' | 'speaking') => newState
  )

  // Function to handle interrupt with optimistic update
  const handleInterrupt = () => {
    // Wrap the optimistic state update in startTransition
    startTransition(() => {
      // Optimistically update the UI to listening state immediately
      setOptimisticState('listening')
    })

    // Then call the actual interrupt function
    interrupt()
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Live AI Dashboard</h1>

      {/* Audio Visualizer - Central Component */}
      <div className="flex justify-center mb-6 md:mb-8">
        <AudioVisualizer
          agentState={optimisticState}
          size="large"
          animationType="rings"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* State Display */}
      <div className="glass-card rounded-xl p-4 md:p-6 mb-6">
        <div className="mb-2">
          <span className="text-slate-400">Current State:</span>{' '}
          <span className="font-bold text-neon-cyan text-lg md:text-xl glow-cyan">
            {optimisticState}
          </span>
        </div>
        <div>
          <span className="text-slate-400">Simulation Status:</span>{' '}
          <span className={isRunning ? 'text-green-400' : 'text-red-400'}>
            {isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleInterrupt}
          disabled={!isRunning}
          className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-neon-cyan hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
        >
          Interrupt Agent
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-neon-magenta hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50 active:scale-95"
        >
          End Call
        </button>
        <button
          onClick={start}
          disabled={isRunning}
          className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
        >
          Start
        </button>
      </div>

      {/* Transcript */}
      <div className="glass-card rounded-xl p-4 md:p-6 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Transcript ({transcript.length} messages)</h2>
        {transcript.length === 0 ? (
          <p className="text-gray-400">No messages yet...</p>
        ) : (
          <div className="space-y-2">
            {transcript.map((msg) => (
              <div key={msg.id} className="p-3 bg-gray-700 rounded">
                <div className="text-sm text-gray-400 mb-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
                <div>
                  <span
                    className={`font-bold ${
                      msg.speaker === 'Agent' ? 'text-cyan-400' : 'text-magenta-400'
                    }`}
                  >
                    {msg.speaker}:
                  </span>{' '}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
