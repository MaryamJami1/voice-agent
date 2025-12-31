/**
 * Hook Contract: useAgentSimulator
 *
 * This file defines the public TypeScript interface for the useAgentSimulator hook.
 * All consuming components must adhere to this contract.
 */

/**
 * Represents the current mode of the agent.
 */
export type AgentState = 'idle' | 'listening' | 'processing' | 'speaking'

/**
 * Represents a single line of conversation.
 */
export interface TranscriptMessage {
  /** Unique identifier for the message */
  id: string

  /** Who is speaking - either 'Agent' or 'User' */
  speaker: 'Agent' | 'User'

  /** Message content (placeholder text) */
  content: string

  /** Timestamp when the message was generated */
  timestamp: Date
}

/**
 * Return value from useAgentSimulator hook.
 * All consuming components receive these properties.
 */
export interface UseAgentSimulatorReturn {
  /**
   * Current agent state (read-only).
   * Cycles through: idle → speaking → listening → processing → user-speaking → speaking...
   */
  currentAgentState: AgentState

  /**
   * Array of all transcript messages (read-only, append-only).
   * Messages are added when entering speaking states.
   */
  transcript: TranscriptMessage[]

  /**
   * Whether the simulation is currently running (read-only).
   * true = state cycle is active, false = simulation is frozen/stopped.
   */
  isRunning: boolean

  /**
   * Interrupt the agent - forces immediate transition to listening state.
   *
   * Side effects:
   * - Clears current timer
   * - Sets currentAgentState to 'listening'
   * - Starts new timer for listening duration (1 second)
   * - Does NOT generate a transcript message
   * - Resumes cycle from listening after timer expires
   *
   * Idempotent: Safe to call multiple times.
   */
  interrupt: () => void

  /**
   * Stop the simulation - halts all state transitions.
   *
   * Side effects:
   * - Clears current timer
   * - Sets isRunning to false
   * - Leaves currentAgentState unchanged (frozen)
   * - Does NOT clear transcript messages
   *
   * Idempotent: Safe to call multiple times.
   */
  stop: () => void

  /**
   * Start or restart the simulation.
   *
   * Side effects:
   * - If stopped: Resumes cycle from current state
   * - If idle: Starts simulation from idle → speaking
   * - If already running: No effect (idempotent)
   */
  start: () => void
}

/**
 * Hook signature.
 * Accepts no parameters, returns UseAgentSimulatorReturn.
 */
export declare function useAgentSimulator(): UseAgentSimulatorReturn

/**
 * Contract Guarantees:
 *
 * 1. State transitions occur within 100ms of specified durations (5s, 1s, 3s)
 * 2. Transcript messages are never deleted (append-only)
 * 3. All timers are cleared on unmount/stop (no memory leaks)
 * 4. Multiple hook instances do not share state (isolated)
 * 5. Interrupt action is idempotent (safe to call multiple times)
 * 6. Stop action is idempotent (safe to call multiple times)
 * 7. Hook automatically starts simulation on mount (currentAgentState → speaking)
 * 8. Hook automatically stops simulation on unmount (cleanup timers)
 */
