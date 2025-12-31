# Quickstart: Agent Simulator Hook

**Feature**: 001-agent-simulator-hook
**Date**: 2025-12-31

## Installation

The hook will be located at `/hooks/useAgentSimulator.ts` in the project root.

No additional installation is required - the hook uses only React 19 and TypeScript (already installed as project dependencies).

## Basic Usage

### Import the Hook

```typescript
import { useAgentSimulator } from '@/hooks/useAgentSimulator'
```

### Use in a Component

```typescript
function Dashboard() {
  const {
    currentAgentState,
    transcript,
    isRunning,
    interrupt,
    stop,
    start
  } = useAgentSimulator();

  return (
    <div>
      <div>Current State: {currentAgentState}</div>
      <div>Messages: {transcript.length}</div>
      <button onClick={interrupt}>Interrupt</button>
      <button onClick={stop}>End Call</button>
    </div>
  );
}
```

## Hook API

### Return Value

```typescript
interface UseAgentSimulatorReturn {
  currentAgentState: AgentState // Current agent state
  transcript: TranscriptMessage[] // All messages (append-only)
  isRunning: boolean // Simulation active?
  interrupt: () => void // Force listening state
  stop: () => void // Stop simulation
  start: () => void // Start/restart simulation
}
```

### Properties

| Property          | Type                                                | Read/Write | Description                         |
| ----------------- | --------------------------------------------------- | ---------- | ----------------------------------- |
| currentAgentState | 'idle' \| 'listening' \| 'processing' \| 'speaking' | Read       | Current agent state                 |
| transcript        | TranscriptMessage[]                                 | Read       | Array of all messages               |
| isRunning         | boolean                                             | Read       | Whether simulation is cycling       |
| interrupt         | () => void                                          | Write      | Force transition to listening state |
| stop              | () => void                                          | Write      | Stop the simulation                 |
| start             | () => void                                          | Write      | Start/restart the simulation        |

## Behavior

### Automatic Start

The hook automatically starts the simulation when the component mounts:

```typescript
function Dashboard() {
  const { currentAgentState } = useAgentSimulator();
  // Simulation is already running!
  // currentAgentState will cycle: speaking → listening → processing → speaking...
  return <div>{currentAgentState}</div>;
}
```

### State Cycle

States cycle automatically at the following intervals:

1. **speaking** (5 seconds) - Agent speaking
2. **listening** (1 second) - Silence
3. **processing** (instant) - Agent thinking
4. **user-speaking** (3 seconds) - User speaking
5. Back to **speaking** - Repeat

### Transcript Messages

Messages are automatically generated when entering speaking states:

```typescript
function Dashboard() {
  const { transcript } = useAgentSimulator();

  return (
    <div>
      {transcript.map(msg => (
        <div key={msg.id}>
          <strong>{msg.speaker}:</strong> {msg.content} ({msg.timestamp})
        </div>
      ))}
    </div>
  );
}
```

Output example:

```
Agent: Hello, how can I help you? (2025-12-31T10:00:00.000Z)
User: I need help with my account (2025-12-31T10:00:09.000Z)
Agent: Sure, I can help with that (2025-12-31T10:00:17.000Z)
...
```

### Interrupt

Force the agent to listening state immediately:

```typescript
function Dashboard() {
  const { currentAgentState, interrupt } = useAgentSimulator();

  return (
    <div>
      <div>State: {currentAgentState}</div>
      <button onClick={interrupt}>Interrupt Agent</button>
    </div>
  );
}
```

When clicked:

1. Current timer is cleared
2. State becomes 'listening' immediately
3. New timer started for 1 second (listening duration)
4. Cycle resumes after timer expires

### Stop

Stop the simulation and freeze current state:

```typescript
function Dashboard() {
  const { currentAgentState, isRunning, stop } = useAgentSimulator();

  return (
    <div>
      <div>State: {currentAgentState} ({isRunning ? 'Running' : 'Stopped'})</div>
      <button onClick={stop}>End Call</button>
    </div>
  );
}
```

When clicked:

1. Current timer is cleared
2. isRunning becomes false
3. currentAgentState remains unchanged
4. No more state transitions occur
5. Transcript messages are preserved

### Start/Restart

Start or restart the simulation:

```typescript
function Dashboard() {
  const { currentAgentState, isRunning, start } = useAgentSimulator();

  return (
    <div>
      <div>State: {currentAgentState} ({isRunning ? 'Running' : 'Stopped'})</div>
      <button onClick={start}>Start</button>
    </div>
  );
}
```

Behavior:

- If stopped: Starts simulation from current state (resumes cycle)
- If already running: No effect (idempotent)
- If idle: Starts simulation from idle → speaking

## Lifecycle

### Mount

```typescript
function Dashboard() {
  const { currentAgentState } = useAgentSimulator();
  // Hook initializes:
  // - isRunning = true
  // - currentAgentState = 'idle' (transitions to 'speaking' immediately)
  // - transcript = []
  // - Active timer started for speaking (5 seconds)
  return <div>{currentAgentState}</div>;
}
```

### Unmount

```typescript
function Dashboard() {
  const { currentAgentState } = useAgentSimulator();
  // When component unmounts:
  // - Active timer cleared (no memory leaks)
  // - Simulation stops
  return <div>{currentAgentState}</div>;
}
```

## Multiple Instances

Each hook instance is isolated:

```typescript
function Dashboard() {
  const agent1 = useAgentSimulator();  // Instance 1 - independent
  const agent2 = useAgentSimulator();  // Instance 2 - independent

  return (
    <div>
      <div>Agent 1: {agent1.currentAgentState}</div>
      <div>Agent 2: {agent2.currentAgentState}</div>
    </div>
  );
}
```

Each instance has:

- Its own state (independent cycles)
- Its own transcript (separate message history)
- Its own timers (no interference)

## Error Handling

The hook handles errors internally:

- **Missing IDs**: Auto-generated via counter
- **Invalid States**: TypeScript prevents invalid values
- **Timer Cleanup**: Always called on unmount/stop
- **Duplicate Interrupts**: Idempotent (safe to call multiple times)

## Integration Example

Complete dashboard integration with all features:

```typescript
function Dashboard() {
  const {
    currentAgentState,
    transcript,
    isRunning,
    interrupt,
    stop
  } = useAgentSimulator();

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Live AI Dashboard</h1>

      {/* State Display */}
      <div className="mb-4">
        <span className="text-gray-400">Current State:</span>{' '}
        <span className="font-bold text-cyan-400">{currentAgentState}</span>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={interrupt}
          disabled={!isRunning}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 rounded"
        >
          Interrupt Agent
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded"
        >
          End Call
        </button>
      </div>

      {/* Transcript */}
      <div className="bg-gray-800 rounded p-4 max-h-96 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Transcript</h2>
        {transcript.map(msg => (
          <div key={msg.id} className="mb-2">
            <span className={msg.speaker === 'Agent' ? 'text-cyan-400' : 'text-magenta-400'}>
              {msg.speaker}:
            </span>{' '}
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Testing

### Manual Testing

1. **Start**: Load page and verify simulation starts automatically
2. **State Transitions**: Observe state changes every 5s → 1s → 3s cycle
3. **Transcript**: Verify messages appear for speaking states
4. **Interrupt**: Click interrupt and verify immediate transition to listening
5. **Stop**: Click stop and verify state freezes
6. **Memory**: Let run for 10 minutes, verify no memory leaks
7. **Unmount**: Navigate away and back, verify clean restart

### Expected Behavior

- States cycle at correct intervals (within 100ms tolerance)
- Messages appear for every speaking state
- Interrupt works immediately (within 50ms)
- Stop freezes state immediately
- No memory leaks after extended runtime
- Clean restart after unmount/remount

## Troubleshooting

### Simulation Not Starting

**Symptom**: State remains 'idle'

**Solution**: Ensure component is mounted. Check browser console for errors.

### Messages Not Appearing

**Symptom**: Transcript array is empty

**Solution**: Wait for first speaking state entry (occurs on mount). Messages only generated for speaking states.

### Timer Not Firing

**Symptom**: State stuck in same state

**Solution**: Check if browser tab is backgrounded (some browsers throttle timers). Verify useEffect cleanup not called prematurely.

### Memory Leak Detected

**Symptom**: Memory increases continuously

**Solution**: Ensure component unmounts properly. Check that useEffect cleanup function is called. Verify no duplicate timers created.

## Support

For issues or questions:

1. Check hook implementation at `/hooks/useAgentSimulator.ts`
2. Review data model at `specs/001-agent-simulator-hook/data-model.md`
3. Verify TypeScript types match interface definitions
4. Check React 19 and Next.js 16 are properly installed
