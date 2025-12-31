# Research: Agent Simulator Hook

**Feature**: 001-agent-simulator-hook
**Date**: 2025-12-31

## Summary

This document consolidates research findings for the `useAgentSimulator` hook implementation. All technical decisions were pre-determined by the constitution and specification documents, requiring no external research.

## Decisions

### State Management Approach

| Decision                   | Selected                          | Rationale                                                       |
| -------------------------- | --------------------------------- | --------------------------------------------------------------- |
| State management mechanism | React hooks (useState, useEffect) | Constitution Principle II requires using React's built-in hooks |
| External state libraries   | Not used                          | Simplicity and leverage of React 19's capabilities              |
| State isolation            | Per-instance (no global state)    | Multiple hook instances can run without interference            |

### Timer Implementation

| Decision        | Selected                                     | Rationale                                                              |
| --------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| Timer API       | setTimeout                                   | JavaScript standard, clears on component unmount via useEffect cleanup |
| Timer precision | Standard browser timing                      | Within 100ms tolerance achievable without special APIs                 |
| Timer cleanup   | useEffect dependency array with clearTimeout | Ensures no memory leaks on unmount/stop                                |

### Type Safety

| Decision          | Selected                                       | Rationale                                        |
| ----------------- | ---------------------------------------------- | ------------------------------------------------ | ------------ | ----------- | --------------------------------------- |
| Type system       | TypeScript                                     | Constitution requires TypeScript for type safety |
| State enum        | Union type ('idle'                             | 'listening'                                      | 'processing' | 'speaking') | Clear, exhaustive type for agent states |
| Message interface | Interface with id, speaker, content, timestamp | Provides structure for transcript messages       |

### Performance Optimization

| Decision          | Selected                      | Rationale                                               |
| ----------------- | ----------------------------- | ------------------------------------------------------- |
| Memoization       | None (rely on React Compiler) | Constitution Principle III prohibits manual memoization |
| Component updates | Automatic via React 19        | React Compiler handles optimization automatically       |

### Message Generation

| Decision           | Selected                                  | Rationale                                                          |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------------ |
| Content source     | Generic placeholder text                  | Spec assumption: "Message content can be generic placeholder text" |
| Message uniqueness | Sequential counter or timestamp-based IDs | Ensures each message is uniquely identifiable                      |
| Trigger timing     | On state entry (speaking states only)     | Matches spec requirement for synchronized generation               |

## Alternatives Considered

### Alternative 1: Redux/MobX for State Management

**Rejected Because**: Constitution Principle II explicitly requires using React's built-in hooks and avoiding unnecessary complexity.

### Alternative 2: requestAnimationFrame for Timers

**Rejected Because**: setTimeout is sufficient for 1-5 second intervals and provides easier cleanup pattern with clearTimeout.

### Alternative 3: Class-Based Component Pattern

**Rejected Because**: Constitution Principle I requires React 19 best practices with hooks, class components are deprecated pattern.

### Alternative 4: Web Workers for Timer Logic

**Rejected Because**: Unnecessary complexity for simple state simulation; main thread performance is not a concern for this use case.

## Best Practices Applied

1. **React Hooks Rules**: Only call hooks at top level, only call hooks from React functions
2. **Cleanup Pattern**: useEffect cleanup function returns clearTimeout to prevent memory leaks
3. **Type Safety**: All interfaces and types explicitly defined with TypeScript
4. **Idempotent Operations**: `interrupt()` and `stop()` can be called safely multiple times
5. **Pure Functions**: Hook returns read-only state; mutations only occur via returned methods

## External References

None required - all decisions derived from internal constitution and specification documents.

## Research Status

✅ **COMPLETE** - All technical decisions finalized and documented.
