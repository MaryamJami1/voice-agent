<!--
Sync Impact Report:
Version Change: 0.0.0 → 1.0.0
Modified Principles: None (initial creation)
Added Sections: Core Principles (6 principles), Technical Constraints, Development Workflow, Governance
Removed Sections: None
Templates Updated:
  - ✅ .specify/templates/plan-template.md (aligned constitution check section)
  - ✅ .specify/templates/spec-template.md (aligned requirements section)
  - ✅ .specify/templates/tasks-template.md (aligned task organization)
Follow-up TODOs: None
-->

# Live AI Dashboard Constitution

## Core Principles

### I. React-First Architecture

All components must follow React 19 best practices with strict adherence to Next.js 16 App Router conventions. Component design must prioritize composition, reusability, and clear props interfaces. Each component should have a single responsibility and accept props directly for refs (no forwardRef usage). Rationale: Ensures maintainable, performant code that leverages React 19's latest capabilities and Next.js 16 optimizations.

### II. State Management Discipline (NON-NEGOTIABLE)

All state management must use React's built-in hooks and avoid unnecessary complexity. Use `useOptimistic` for immediate UI updates on user actions (e.g., Interrupt button). Use `useState` for local component state. Do not use global state management libraries unless explicitly justified. Rationale: Simplicity and leverage of React 19's built-in capabilities without external dependencies.

### III. Compiler-Optimized Performance

Rely on React Compiler for automatic optimization. Do not use manual memoization techniques - no `useMemo`, no `useCallback`, no `React.memo`. Write clean, pure component code that the compiler can optimize. Rationale: React 19's compiler handles optimization automatically; manual memoization is error-prone and unnecessary.

### IV. Simulation-Driven Development

The `useAgentSimulator` hook is the single source of truth for agent state. All UI components (AudioVisualizer, LiveTranscript, ControlPanel) must consume this hook and remain synchronized with its state cycle. Never create duplicate state or bypass the simulation hook. Rationale: Ensures consistent state across all components and prevents desynchronization issues.

### V. Component Co-location

Keep components close to where they're used. Hooks go in `/hooks`, components in `/components`, utilities in `/lib`. Structure should mirror usage patterns rather than technical layers. Rationale: Improves code discoverability, reduces coupling, and makes the codebase easier to navigate for frontend developers.

### VI. Visual Consistency

All UI must follow the futuristic design system: dark mode by default, glassmorphism effects (backdrop blur, translucent layers), and neon accent colors (cyan, magenta, purple). Tailwind CSS classes should be organized and consistent across components. Rationale: Creates a cohesive, professional user experience and makes the design system maintainable.

## Technical Constraints

### Framework Requirements

- Next.js 16 with App Router is mandatory
- React 19 (strictly enforced)
- Tailwind CSS for styling
- Dark mode enabled by default

### Code Quality

- TypeScript is required for type safety
- ESLint and Prettier for code consistency
- No manual memoization (React Compiler only)
- Props must be passed directly (no forwardRef for refs)

### Simulation Requirements

- Must use custom `useAgentSimulator` hook
- Agent states: idle, listening, processing, speaking
- State cycle: speaking (5s) → silence (1s) → user speaking (3s)
- Audio Visualizer and Live Transcript must sync with state cycle

### Control Behavior

- Interrupt button: use `useOptimistic` for immediate UI update, force `listening` state
- End Call button: stop simulation, display final state
- All controls must be clearly labeled and provide immediate feedback

## Development Workflow

### Component Development

1. Identify component responsibility and props interface
2. Create component in appropriate directory (`/components/[name].tsx`)
3. Implement using React 19 best practices
4. Integrate with `useAgentSimulator` hook if state-dependent
5. Apply Tailwind CSS styling following design system
6. Test state transitions and visual behavior

### State Management

1. All shared state comes from `useAgentSimulator` hook
2. Local state uses `useState` for component-specific needs
3. Optimistic updates use `useOptimistic` for immediate feedback
4. Never duplicate state between components
5. Verify synchronization across all components after changes

### Testing Approach

- Manual testing of state transitions is mandatory
- Verify AudioVisualizer animations for each state
- Verify Live Transcript auto-scroll and message sync
- Verify Interrupt and End Call buttons behavior
- Test on multiple screen sizes (mobile, tablet, desktop)

### AI Usage Integration

- Initial UI components must be generated using AI coding agent (Cursor, Windsurf, or v0)
- Capture AI workflow proof: screen recording or chat logs
- AI-generated code must be reviewed and adapted to follow constitution principles
- Document AI prompts and outcomes for reference

## Governance

### Amendment Procedure

1. Propose amendment with clear rationale and impact analysis
2. Document changes in Sync Impact Report at top of constitution file
3. Update constitution version according to semantic versioning:
   - MAJOR: Backward incompatible principle changes
   - MINOR: New principle or section additions
   - PATCH: Clarifications and non-semantic refinements
4. Review and approve by project lead
5. Update dependent templates if required
6. Communicate changes to all developers

### Compliance Review

- All pull requests must verify compliance with constitution principles
- Code reviews must explicitly check for violations (e.g., manual memoization, forwardRef usage)
- Complex architecture decisions must be justified against Simplicity principle
- Use Constitution Check section in plan.md for formal verification

### Versioning Policy

- Constitution version follows MAJOR.MINOR.PATCH format
- Ratification date is the original adoption date
- Last amended date updates on each version change
- Version bump must be justified in Sync Impact Report

**Version**: 1.0.0 | **Ratified**: 2025-12-31 | **Last Amended**: 2025-12-31
