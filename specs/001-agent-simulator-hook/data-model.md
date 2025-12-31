# Data Model: Agent Simulator Hook

**Feature**: 001-agent-simulator-hook
**Date**: 2025-12-31

## Overview

The `useAgentSimulator` hook manages three primary data structures: Agent State, Transcript Messages, and Simulation State. All data is stored in-memory within the hook instance.

## Type Definitions

### AgentState

Represents the current mode of the agent.

```typescript
type AgentState = 'idle' | 'listening' | 'processing' | 'speaking';
```

**Properties**:
- **idle**: Initial state before simulation starts
- **listening**: Agent is silently listening (1 second duration)
- **processing**: Agent is thinking (instant transition state)
- **speaking**: Agent is speaking (5 seconds) or user is speaking (3 seconds)

**Constraints**:
- Only one state can be active at any given time
- State transitions follow a defined cycle
- State can be interrupted at any point (forced to listening)

### TranscriptMessage

Represents a single line of conversation.

```typescript
interface TranscriptMessage {
  id: string;           // Unique identifier
  speaker: 'Agent' | 'User';  // Who is speaking
  content: string;       // Message text (placeholder)
  timestamp: Date;       // When the message was generated
}
```

**Properties**:

| Field | Type | Description | Validation |
|-------|------|-------------|-------------|
| id | string | Unique identifier | Non-empty string, uniqueness guaranteed |
| speaker | 'Agent' \| 'User' | Speaker label | Must be exactly 'Agent' or 'User' |
| content | string | Message text | Non-empty string |
| timestamp | Date | Generation time | Valid Date object |

**Generation Rules**:
- Message created when entering 'speaking' state with speaker='Agent'
- Message created when entering 'speaking' state with speaker='User' (user-speaking)
- Messages are append-only (never deleted)
- Messages are ordered chronologically (newest last)

**Default Content**:
- Agent messages: Generic placeholder text
- User messages: Generic placeholder text
- Content uniqueness: Use counter or timestamp to ensure variation

### SimulationState (Internal Runtime State)

Represents the runtime control state (not exposed to consumers).

```typescript
interface SimulationState {
  isRunning: boolean;      // Whether simulation is active
  currentAgentState: AgentState;  // Current agent state
  transcript: TranscriptMessage[];  // All messages
  activeTimer: number | null;  // Current setTimeout ID (internal)
  messageCounter: number;   // For generating unique message IDs
}
```

**Properties**:

| Field | Type | Visibility | Description |
|-------|------|-------------|-------------|
| isRunning | boolean | Exposed | Whether simulation is cycling |
| currentAgentState | AgentState | Exposed | Current agent state |
| transcript | TranscriptMessage[] | Exposed | Array of all messages |
| activeTimer | number \| null | Internal | Current timer ID for cleanup |
| messageCounter | number | Internal | Counter for unique message IDs |

**Lifecycle**:
- Initialization: isRunning=false, currentAgentState='idle', transcript=[], activeTimer=null, messageCounter=0
- Start: isRunning=true, begin state cycle from idle→speaking
- Stop: isRunning=false, clear activeTimer, preserve transcript
- Unmount: isRunning=false, clear activeTimer (same as stop)

## State Transition Machine

### State Cycle (Main Loop)

```
idle
  ↓ (start)
speaking (5 seconds)
  ↓
listening (1 second silence)
  ↓
processing (instant)
  ↓
user-speaking (3 seconds)
  ↓
speaking (repeat cycle)
```

### State Transitions Table

| Current State | Trigger | Next State | Duration | Message Generated? |
|---------------|---------|-------------|----------|-------------------|
| idle | start() | speaking | 5000ms | Yes (Agent) |
| speaking | timer expire | listening | 1000ms | No |
| listening | timer expire | processing | 0ms | No |
| processing | immediate | user-speaking | 3000ms | Yes (User) |
| user-speaking | timer expire | speaking | 5000ms | Yes (Agent) |
| any state | interrupt() | listening | 1000ms | No |
| any state | stop() | [current state frozen] | ∞ | No |

### Interrupt Behavior

The `interrupt()` action:
1. Clears current activeTimer
2. Sets currentAgentState to 'listening'
3. Starts new timer for 1000ms (listening duration)
4. Does NOT generate a transcript message
5. Resumes cycle from listening after timer expires

### Stop Behavior

The `stop()` action:
1. Clears current activeTimer
2. Sets isRunning to false
3. Leaves currentAgentState unchanged (frozen)
4. Does NOT clear transcript messages
5. Can be called multiple times safely (idempotent)

## Timer Configuration

| State | Duration (ms) | Timer Type | Cleanup Method |
|-------|-----------------|-------------|-----------------|
| speaking | 5000 | setTimeout | clearTimeout(timerId) |
| listening | 1000 | setTimeout | clearTimeout(timerId) |
| user-speaking | 3000 | setTimeout | clearTimeout(timerId) |
| processing | 0 | N/A (immediate) | N/A |

## Relationships

```
┌─────────────────────────────────────────┐
│        useAgentSimulator Hook           │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   AgentState (exposed)            │  │
│  │   - 'idle' │ 'listening'         │  │
│  │   - 'processing' │ 'speaking'     │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   TranscriptMessage[] (exposed)   │  │
│  │   - id: string                   │  │
│  │   - speaker: 'Agent'|'User'      │  │
│  │   - content: string              │  │
│  │   - timestamp: Date              │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   isRunning (exposed)             │  │
│  │   - boolean                       │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   Internal Runtime State          │  │
│  │   - activeTimer: number|null      │  │
│  │   - messageCounter: number        │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## Validation Rules

1. **State Uniqueness**: Only one AgentState active at any time
2. **Timer Cleanup**: activeTimer must be cleared before setting new timer
3. **Message Uniqueness**: Each TranscriptMessage must have a unique id
4. **Speaker Validity**: speaker field must be exactly 'Agent' or 'User'
5. **Thread Safety**: All state updates must be synchronous (React ensures this)

## Memory Management

- **Message Retention**: Transcript messages are never deleted (append-only)
- **Timer Cleanup**: All timers cleared on unmount/stop via useEffect cleanup
- **Instance Isolation**: Multiple hook instances do not share state or timers
- **Memory Leak Prevention**: useEffect cleanup function always called on unmount

## Performance Characteristics

- **State Transition Latency**: < 1ms (React state update)
- **Timer Precision**: ± 100ms (browser setTimeout tolerance)
- **Message Append Time**: < 1ms (array push operation)
- **Unmount Cleanup Time**: < 1ms (clearTimeout call)
