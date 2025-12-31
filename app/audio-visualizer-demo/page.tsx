'use client'

import React from 'react'
import AudioVisualizer from '@/components/AudioVisualizer/AudioVisualizer'
import { useAgentSimulator } from '@/hooks/useAgentSimulator'

export default function AudioVisualizerDemo() {
  const { currentAgentState } = useAgentSimulator()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Audio Visualizer Demo</h1>

      <div className="flex flex-col items-center space-y-8">
        <div className="text-xl mb-4">
          Current State:{' '}
          <span className="font-mono bg-gray-800 px-3 py-1 rounded">{currentAgentState}</span>
        </div>

        <div className="w-full max-w-md">
          <AudioVisualizer agentState={currentAgentState} size="large" className="mx-auto" />
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          <p>The visualizer above responds to the agent state from the useAgentSimulator hook.</p>
          <p>
            It shows different animations based on the current state: idle, listening, processing,
            or speaking.
          </p>
        </div>
      </div>
    </div>
  )
}
