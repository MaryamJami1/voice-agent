# Tasks: Agent Simulator Hook

**Input**: Design documents from `/specs/001-agent-simulator-hook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual testing only - no automated tests requested in specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: Repository root with `hooks/` directory
- Paths shown below match plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify hooks directory exists at repository root
- [x] T002 Verify TypeScript is properly configured for Next.js 16 project

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Define AgentState type in hooks/useAgentSimulator.ts
- [x] T004 [P] Define TranscriptMessage interface in hooks/useAgentSimulator.ts
- [x] T005 [P] Define UseAgentSimulatorReturn interface in hooks/useAgentSimulator.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Automatic Agent State Simulation (Priority: P1) 🎯 MVP

**Goal**: Implement core hook that automatically cycles through agent states on mount and stops on unmount

**Independent Test**: Mount a component that uses the hook and observe state changes over time (speaking → listening → processing → speaking). Verify state is exposed and cleanup occurs on unmount.

### Implementation for User Story 1

- [x] T006 [US1] Create useAgentSimulator function skeleton in hooks/useAgentSimulator.ts
- [x] T007 [US1] Implement useState for currentAgentState with initial value 'idle' in hooks/useAgentSimulator.ts
- [x] T008 [US1] Implement useState for isRunning with initial value false in hooks/useAgentSimulator.ts
- [x] T009 [US1] Implement useState for activeTimer with initial value null in hooks/useAgentSimulator.ts
- [x] T010 [US1] Implement useState for transcript array with initial empty array in hooks/useAgentSimulator.ts
- [x] T011 [US1] Implement useState for messageCounter with initial value 0 in hooks/useAgentSimulator.ts
- [x] T012 [US1] Create transitionToState function to handle state changes in hooks/useAgentSimulator.ts
- [x] T013 [US1] Implement useEffect that starts simulation on mount (idle → speaking transition) in hooks/useAgentSimulator.ts
- [x] T014 [US1] Implement cleanup function in useEffect to clear activeTimer on unmount in hooks/useAgentSimulator.ts
- [x] T015 [US1] Set isRunning to true when simulation starts in hooks/useAgentSimulator.ts
- [x] T016 [US1] Return UseAgentSimulatorReturn object with currentAgentState, transcript, isRunning from hook in hooks/useAgentSimulator.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (hook starts on mount, stops on unmount, exposes state)

---

## Phase 4: User Story 2 - State Duration Configuration (Priority: P1)

**Goal**: Configure specific time durations for each state (speaking: 5s, silence: 1s, user-speaking: 3s)

**Independent Test**: Run hook and measure time between state transitions. Verify: speaking lasts 5s (±100ms), listening lasts 1s (±100ms), user-speaking lasts 3s (±100ms).

### Implementation for User Story 2

- [x] T017 [US2] Define state duration constants in hooks/useAgentSimulator.ts (SPEAKING_DURATION = 5000, LISTENING_DURATION = 1000, USER_SPEAKING_DURATION = 3000)
- [x] T018 [US2] Implement setTimeout for speaking state with SPEAKING_DURATION in transitionToState function in hooks/useAgentSimulator.ts
- [x] T019 [US2] Implement setTimeout for listening state with LISTENING_DURATION in transitionToState function in hooks/useAgentSimulator.ts
- [x] T020 [US2] Implement setTimeout for user-speaking state with USER_SPEAKING_DURATION in transitionToState function in hooks/useAgentSimulator.ts
- [x] T021 [US2] Add timer cleanup before setting new timer in transitionToState function in hooks/useAgentSimulator.ts
- [x] T022 [US2] Implement state cycle logic: speaking → listening → processing → user-speaking → speaking in transitionToState function in hooks/useAgentSimulator.ts
- [x] T023 [US2] Ensure processing state transitions immediately to user-speaking (0ms) in hooks/useAgentSimulator.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently (hook cycles with correct durations)

---

## Phase 5: User Story 3 - Transcript Message Generation (Priority: P2)

**Goal**: Generate transcript messages with speaker labels and timestamps when entering speaking states

**Independent Test**: Observe transcript array as hook runs. Verify: messages appear for agent speaking and user speaking states, each has speaker label, timestamp, unique content.

### Implementation for User Story 3

- [x] T024 [P] [US3] Implement generateMessageContent function in hooks/useAgentSimulator.ts (returns unique placeholder text)
- [x] T025 [US3] Implement createTranscriptMessage function in hooks/useAgentSimulator.ts (creates TranscriptMessage with id, speaker, content, timestamp)
- [x] T026 [US3] Add message generation to transitionToState when entering speaking state (speaker='Agent') in hooks/useAgentSimulator.ts
- [x] T027 [US3] Add message generation to transitionToState when entering user-speaking state (speaker='User') in hooks/useAgentSimulator.ts
- [x] T028 [US3] Append new TranscriptMessage to transcript array in transitionToState function in hooks/useAgentSimulator.ts
- [x] T029 [US3] Increment messageCounter after creating each message in hooks/useAgentSimulator.ts

**Checkpoint**: All user stories (1, 2, 3) should now be independently functional (hook cycles with durations and generates messages)

---

## Phase 6: User Story 4 - Simulation Control (Priority: P2)

**Goal**: Provide stop, start, and interrupt methods to control the simulation

**Independent Test**: Test stop() (verify state freezes and timers cleared), start() (verify simulation resumes), interrupt() (verify immediate transition to listening). Test idempotency by calling methods multiple times.

### Implementation for User Story 4

- [x] T030 [US4] Implement stop function in hooks/useAgentSimulator.ts (clears activeTimer, sets isRunning to false, preserves current state)
- [x] T031 [US4] Make stop function idempotent in hooks/useAgentSimulator.ts (safe to call multiple times)
- [x] T032 [US4] Implement start function in hooks/useAgentSimulator.ts (resumes simulation from current state, begins from idle if stopped)
- [x] T033 [US4] Implement interrupt function in hooks/useAgentSimulator.ts (clears activeTimer, transitions to listening state, starts listening timer)
- [x] T034 [US4] Make interrupt function idempotent in hooks/useAgentSimulator.ts (safe to call multiple times)
- [x] T035 [US4] Add stop method to UseAgentSimulatorReturn in hooks/useAgentSimulator.ts
- [x] T036 [US4] Add start method to UseAgentSimulatorReturn in hooks/useAgentSimulator.ts
- [x] T037 [US4] Add interrupt method to UseAgentSimulatorReturn in hooks/useAgentSimulator.ts

**Checkpoint**: All user stories (1, 2, 3, 4) should now be fully functional (complete hook with all control methods)

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T038 Add TypeScript JSDoc comments for all exported functions in hooks/useAgentSimulator.ts
- [x] T039 Verify hook matches contract interface in contracts/hook-interface.ts
- [x] T040 Test hook with multiple concurrent instances in hooks/useAgentSimulator.test.tsx (manual test file)
- [x] T041 Run development server and verify hook works with dashboard component
- [x] T042 Validate all acceptance scenarios from spec.md are satisfied
- [x] T043 Verify memory leak prevention: run for 10 minutes, check browser memory profiler

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories must proceed sequentially: P1 (US1) → P1 (US2) → P2 (US3) → P2 (US4)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 - Builds upon state cycling from US1
- **User Story 3 (P2)**: Depends on User Story 2 - Requires state transitions with durations from US2
- **User Story 4 (P2)**: Depends on User Story 2 - Can control the simulation established in US1/US2

### Within Each User Story

- Core implementation before integration
- Tasks without dependencies marked [P] can run in parallel
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002 only)
- All Foundational tasks marked [P] can run in parallel (T003, T004, T005)
- Within US3: T024 (generateMessageContent) can run in parallel with other tasks
- Within Polish: T038, T039 can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch all type definitions together (no dependencies):
Task: "Define AgentState type in hooks/useAgentSimulator.ts"
Task: "Define TranscriptMessage interface in hooks/useAgentSimulator.ts"
Task: "Define UseAgentSimulatorReturn interface in hooks/useAgentSimulator.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only - Recommended for Quick Demo)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (state simulation)
4. Complete Phase 4: User Story 2 (state durations)
5. **STOP and VALIDATE**: Test hook manually - verify it cycles through states with correct timing
6. Create simple dashboard component to demonstrate state changes
7. Deploy/demo if ready

**MVP delivers**: Hook that auto-starts on mount, cycles through states (speaking → listening → user-speaking) with correct durations, stops on unmount. No transcripts, no control methods.

### Incremental Delivery (Recommended for Full Feature)

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Hook starts and stops properly
3. Add User Story 2 → Test independently → Hook cycles with correct timing
4. Add User Story 3 → Test independently → Hook generates transcript messages
5. Add User Story 4 → Test independently → Hook has full control (stop/start/interrupt)
6. Polish → Complete and validate all acceptance scenarios

**Each increment adds value without breaking previous stories**.

### Parallel Team Strategy

With multiple developers (if available):

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (basic state cycling)
   - Developer B: Can wait for US1 to complete (dependencies exist)
3. After US1 complete:
   - Developer A: User Story 3 (transcript generation - can work in parallel with US4)
   - Developer B: User Story 4 (simulation control)
4. After US2 complete (Developer A or B):

**Note**: Due to task dependencies in this single-hook feature, parallel opportunities are limited. Best approach is sequential story completion by priority.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Manual testing is the primary validation method (no automated tests specified)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- TypeScript types MUST match contracts/hook-interface.ts
- NO manual memoization (useMemo, useCallback, React.memo) - rely on React Compiler
- All timers MUST be cleared to prevent memory leaks
- Hook MUST follow React 19 best practices
- Use useState for all state (no external libraries per constitution)
