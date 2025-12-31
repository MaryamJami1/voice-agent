'use client';

/**
 * Dashboard component demonstrating the useAgentSimulator hook.
 * This is a simple test component to verify the hook works correctly.
 */

import { useState, useOptimistic, startTransition } from 'react';
import { useAgentSimulator } from '@/hooks/useAgentSimulator';
import AudioVisualizer from './AudioVisualizer/AudioVisualizer';

export default function Dashboard() {
  const {
    currentAgentState,
    transcript,
    isRunning,
    interrupt,
    stop,
    start,
  } = useAgentSimulator();

  // Use optimistic state for interrupt action to provide immediate UI feedback
  const [optimisticState, setOptimisticState] = useOptimistic(
    currentAgentState,
    (currentState, newState: 'idle' | 'listening' | 'processing' | 'speaking') => newState
  );

  // Function to handle interrupt with optimistic update
  const handleInterrupt = () => {
    // Wrap the optimistic state update in startTransition
    startTransition(() => {
      // Optimistically update the UI to listening state immediately
      setOptimisticState('listening');
    });

    // Then call the actual interrupt function
    interrupt();
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Live AI Dashboard</h1>

      {/* Audio Visualizer - Central Component */}
      <div className="flex justify-center mb-8">
        <AudioVisualizer
          agentState={optimisticState}
          size="large"
          animationType="rings"
          className="mb-6"
        />
      </div>

      {/* State Display */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="mb-2">
          <span className="text-gray-400">Current State:</span>{' '}
          <span className="font-bold text-cyan-400">{optimisticState}</span>
        </div>
        <div>
          <span className="text-gray-400">Simulation Status:</span>{' '}
          <span className={isRunning ? 'text-green-400' : 'text-red-400'}>
            {isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleInterrupt}
          disabled={!isRunning}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          Interrupt Agent
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          End Call
        </button>
        <button
          onClick={start}
          disabled={isRunning}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          Start
        </button>
      </div>

      {/* Transcript */}
      <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
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
  );
}
