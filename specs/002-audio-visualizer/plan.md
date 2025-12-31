# Implementation Plan: Audio Visualizer Component

**Branch**: `002-audio-visualizer` | **Date**: 2025-12-31 | **Spec**: [../spec.md](../spec.md)
**Input**: Feature specification from `/specs/002-audio-visualizer/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The Audio Visualizer Component is a React component that provides animated visual feedback synchronized with agent states (idle, listening, processing, speaking) from the `useAgentSimulator` hook. The component will implement canvas or CSS animations with futuristic styling (glassmorphism, neon accents) to create an engaging visual representation of agent activity.

## Technical Context

**Language/Version**: TypeScript with React 19 (strict mode), Next.js 16 with App Router
**Primary Dependencies**: React 19, Next.js 16, Tailwind CSS, useAgentSimulator hook (custom)
**Storage**: N/A (component state only)
**Testing**: Jest with React Testing Library for component testing
**Target Platform**: Web browser (client-side React component)
**Project Type**: Web application frontend component
**Performance Goals**: 60fps animation performance, <100ms response to state changes, responsive across mobile/tablet/desktop
**Constraints**: Must not use forwardRef for refs (direct ref prop), no manual memoization (React Compiler only), must integrate with existing useAgentSimulator hook
**Scale/Scope**: Single component with multiple visual states, responsive design for all screen sizes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Constitution Compliance Verification:

1. **React-First Architecture**: ✅ Component will follow React 19 best practices with Next.js 16 App Router conventions, single responsibility, and direct props for refs (no forwardRef)

2. **State Management Discipline**: ✅ Component will consume state only from the `useAgentSimulator` hook (single source of truth), avoiding duplicate state

3. **Compiler-Optimized Performance**: ✅ No manual memoization techniques (useMemo, useCallback, React.memo) will be used - relying on React Compiler for optimization

4. **Simulation-Driven Development**: ✅ Component will consume the `useAgentSimulator` hook as the single source of truth for agent state, ensuring synchronization

5. **Component Co-location**: ✅ Component will be placed in `/components` directory following the co-location principle

6. **Visual Consistency**: ✅ Component will implement futuristic design system with dark mode, glassmorphism effects, and neon accent colors (cyan, magenta, purple)

### Gates Status: All gates pass - Ready for Phase 0 research

## Project Structure

### Documentation (this feature)

```text
specs/002-audio-visualizer/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
app/
├── page.tsx             # Main dashboard page
└── layout.tsx

components/
├── AudioVisualizer/     # New directory for visualizer component
│   └── AudioVisualizer.tsx
├── LiveTranscript/
│   └── LiveTranscript.tsx
└── ControlPanel/
    └── ControlPanel.tsx

hooks/
└── useAgentSimulator.ts  # Single source of truth for agent states

lib/
└── utils.ts             # Utility functions

public/
└── [assets]

styles/
└── globals.css          # Global styles including Tailwind directives
```

**Structure Decision**: Web application frontend component structure selected. The AudioVisualizer component will be created in the components/AudioVisualizer directory, consuming state from the useAgentSimulator hook in the hooks directory. This follows the co-location principle from the constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
