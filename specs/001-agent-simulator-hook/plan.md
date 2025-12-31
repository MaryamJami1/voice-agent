# Implementation Plan: Agent Simulator Hook

**Branch**: `001-agent-simulator-hook` | **Date**: 2025-12-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-agent-simulator-hook/spec.md`

## Summary

Create a custom React hook (`useAgentSimulator`) that manages real-time agent state simulation with automatic cycling through four states (idle, listening, processing, speaking) at specified intervals. The hook will serve as the single source of truth for all UI components (AudioVisualizer, LiveTranscript, ControlPanel) in the Live AI Dashboard, ensuring synchronized state management with proper cleanup and memory leak prevention.

## Technical Context

**Language/Version**: TypeScript 5.x (via Next.js 16)
**Primary Dependencies**: React 19, Next.js 16
**Storage**: N/A (in-memory state only)
**Testing**: Manual testing via development server
**Target Platform**: Web browser (modern browsers with JavaScript support)
**Project Type**: single (Next.js application)
**Performance Goals**: State transitions within 100ms tolerance, memory usage stable <10% increase over 10 minutes
**Constraints**: Must use React hooks (useState, useEffect), no manual memoization, auto-start on mount, stop on unmount
**Scale/Scope**: Single hook instance for dashboard, supports multiple concurrent instances without interference

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Principle Compliance

| Principle                           | Status  | Evidence                                                         |
| ----------------------------------- | ------- | ---------------------------------------------------------------- |
| I. React-First Architecture         | ✅ PASS | Custom hook using React 19 patterns, single responsibility       |
| II. State Management Discipline     | ✅ PASS | Uses useState, no global state libraries, single source of truth |
| III. Compiler-Optimized Performance | ✅ PASS | No useMemo/useCallback/React.memo usage planned                  |
| IV. Simulation-Driven Development   | ✅ PASS | Hook is the single source of truth for all components            |
| V. Component Co-location            | ✅ PASS | Hook will be placed in `/hooks` directory as per structure       |
| VI. Visual Consistency              | N/A     | Hook has no visual output, only state management                 |

### Constraint Compliance

| Constraint            | Status  | Evidence                                       |
| --------------------- | ------- | ---------------------------------------------- |
| Next.js 16 App Router | ✅ PASS | Hook works with React 19/Next.js 16            |
| React 19 enforced     | ✅ PASS | Uses React 19 hooks and patterns               |
| TypeScript required   | ✅ PASS | Hook will be implemented with TypeScript       |
| No manual memoization | ✅ PASS | Relies on React Compiler for optimization      |
| Props passed directly | ✅ PASS | Hook returns state directly, no ref forwarding |

### Simulation Requirements

| Requirement                                         | Status  | Evidence                                  |
| --------------------------------------------------- | ------- | ----------------------------------------- |
| Custom useAgentSimulator hook                       | ✅ PASS | This is the primary deliverable           |
| Agent states: idle, listening, processing, speaking | ✅ PASS | State enum includes all four states       |
| State cycle: 5s → 1s → 3s                           | ✅ PASS | Timer configuration matches specification |

**Gate Result**: ✅ **PASS** - All constitution principles and constraints are satisfied. No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-agent-simulator-hook/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
hooks/
└── useAgentSimulator.ts    # Custom hook for agent state simulation

components/
└── [Future phases - out of scope for this feature]
    ├── AudioVisualizer.tsx
    ├── LiveTranscript.tsx
    └── ControlPanel.tsx

app/
└── [Future phases - out of scope for this feature]
    └── dashboard/
        └── page.tsx
```

**Structure Decision**: Single project structure (Next.js application). The hook will be placed in `/hooks` directory following component co-location principle. This structure aligns with React 19 best practices and Next.js 16 App Router conventions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected - complexity tracking not required.

---

## Phase 0: Research (Self-Contained)

Since all technical decisions are clearly defined in the constitution and phase.md specifications, no external research is required. The following decisions are pre-determined:

| Decision                         | Source                             | Rationale                              |
| -------------------------------- | ---------------------------------- | -------------------------------------- |
| React hooks for state management | Constitution Principle II          | Simplicity, no external dependencies   |
| TypeScript for type safety       | Constitution Technical Constraints | Type safety for state enums and timers |
| No memoization libraries         | Constitution Principle III         | React Compiler handles optimization    |
| In-memory state only             | Spec Out of Scope                  | Simulation-only, no persistence needed |

**Research Status**: ✅ COMPLETE - All unknowns resolved via constitution and specification documents.

---

## Phase 1: Design & Contracts

### Data Model

The agent simulator hook will manage the following data structures:

```typescript
// Agent state enum (four states as per specification)
type AgentState = 'idle' | 'listening' | 'processing' | 'speaking'

// Transcript message structure
interface TranscriptMessage {
  id: string
  speaker: 'Agent' | 'User'
  content: string
  timestamp: Date
}

// Hook return value (exposed to consuming components)
interface UseAgentSimulatorReturn {
  currentAgentState: AgentState
  transcript: TranscriptMessage[]
  isRunning: boolean
  interrupt: () => void // Force transition to listening state
  stop: () => void // Stop the simulation
  start: () => void // Start/restart the simulation
}
```

### State Transition Machine

```
Initial State: idle

State Cycle (repeating):
    speaking (5 seconds)
         ↓
    listening (1 second silence)
         ↓
    processing (implicit transition)
         ↓
    user-speaking (3 seconds)
         ↓
    speaking (repeat cycle)

Interrupt Action:
    Any state → listening (immediate transition, reset timer)

Stop Action:
    Any state → [current state frozen, timers cleared]

Start Action:
    Idle → speaking (begin cycle from start)
```

### Timer Configuration

| State               | Duration                   | Timer Type |
| ------------------- | -------------------------- | ---------- |
| Speaking            | 5000ms                     | setTimeout |
| Listening (silence) | 1000ms                     | setTimeout |
| User Speaking       | 3000ms                     | setTimeout |
| Processing          | Instant (state transition) | N/A        |

### Key Entities

1. **AgentState**: Enum representing current mode of the agent
   - Values: 'idle', 'listening', 'processing', 'speaking'
   - Constraints: Only one state active at a time
   - Transitions: Follow defined cycle, can be interrupted

2. **TranscriptMessage**: Single line of conversation
   - Fields: id (unique), speaker, content, timestamp
   - Generation: Triggered on speaking state entry
   - Storage: In-memory array in hook

3. **SimulationState**: Runtime control state
   - Fields: isRunning (boolean), activeTimer (timeout ID)
   - Lifecycle: Auto-start on mount, auto-stop on unmount
   - Safety: All timers cleared on stop/unmount

### Quickstart

To use the `useAgentSimulator` hook in a component:

```typescript
import { useAgentSimulator } from '@/hooks/useAgentSimulator';

function Dashboard() {
  const {
    currentAgentState,
    transcript,
    isRunning,
    interrupt,
    stop
  } = useAgentSimulator();

  return (
    <div>
      <div>Current State: {currentAgentState}</div>
      <button onClick={interrupt}>Interrupt</button>
      <button onClick={stop}>End Call</button>
    </div>
  );
}
```

The hook automatically:

- Starts the simulation on component mount
- Cycles through states every 5s → 1s → 3s
- Generates transcript messages on speaking states
- Stops and cleans up on component unmount

### Contracts

Since this is an internal React hook (no external API), the "contract" is defined by the TypeScript interface exposed to consuming components:

```typescript
// Hook signature
function useAgentSimulator(): UseAgentSimulatorReturn

// Public interface
interface UseAgentSimulatorReturn {
  // Current agent state (read-only)
  currentAgentState: AgentState

  // Transcript messages (read-only, appends automatically)
  transcript: TranscriptMessage[]

  // Simulation status (read-only)
  isRunning: boolean

  // Interrupt agent - forces transition to listening state
  // Side effect: clears current timer, starts new timer for listening state
  interrupt: () => void

  // Stop simulation - halts all state transitions
  // Side effect: clears all timers, freezes current state
  stop: () => void

  // Start/restart simulation
  // Side effect: begins state cycle from idle → speaking
  start: () => void
}
```

**Contract Guarantees**:

- State transitions occur within 100ms of specified durations
- Transcript messages are never deleted (append-only)
- All timers are cleared on unmount/stop (no memory leaks)
- Multiple hook instances do not share state (isolated)
- Interrupt action is idempotent (can be called multiple times safely)

### Post-Design Constitution Check

Re-evaluating against constitution principles after completing Phase 1 design:

| Principle                           | Pre-Design | Post-Design | Notes                                                        |
| ----------------------------------- | ---------- | ----------- | ------------------------------------------------------------ |
| I. React-First Architecture         | ✅ PASS    | ✅ PASS     | Hook follows React 19 patterns, pure functions               |
| II. State Management Discipline     | ✅ PASS    | ✅ PASS     | Uses useState, no external libraries, single source of truth |
| III. Compiler-Optimized Performance | ✅ PASS    | ✅ PASS     | No memoization planned, relies on React Compiler             |
| IV. Simulation-Driven Development   | ✅ PASS    | ✅ PASS     | Hook is the definitive source of state for all components    |
| V. Component Co-location            | ✅ PASS    | ✅ PASS     | Hook in `/hooks`, clearly separated from UI components       |
| VI. Visual Consistency              | N/A        | N/A         | Hook has no visual output                                    |

**Gate Result**: ✅ **PASS** - All principles remain satisfied after design phase. No violations introduced.
