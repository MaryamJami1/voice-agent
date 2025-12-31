---
id: 001
title: Project Constitution Initial
stage: constitution
date: 2025-12-31
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: User
command: /sp.constitution
labels: ["constitution", "governance", "initial-creation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - phase.md
tests:
  - None
---

## Prompt

/sp.constitution now write constition of this project

## Response snapshot

Created the project constitution for "Live AI Dashboard" project with the following structure:

**Core Principles (6):**
1. React-First Architecture - React 19 + Next.js 16 App Router conventions
2. State Management Discipline - useOptimistic, useState, no global state libraries
3. Compiler-Optimized Performance - No useMemo, useCallback, React.memo (rely on React Compiler)
4. Simulation-Driven Development - useAgentSimulator as single source of truth
5. Component Co-location - /hooks, /components, /lib directory structure
6. Visual Consistency - Dark mode, glassmorphism, neon accents, Tailwind CSS

**Technical Constraints:**
- Framework requirements (Next.js 16, React 19, Tailwind CSS)
- Code quality (TypeScript, ESLint/Prettier, no manual memoization)
- Simulation requirements (useAgentSimulator hook, state cycles, synchronization)
- Control behavior (Interrupt with useOptimistic, End Call with final state)

**Development Workflow:**
- Component development steps
- State management guidelines
- Manual testing approach
- AI usage integration requirements

**Governance:**
- Amendment procedure with semantic versioning
- Compliance review process
- Versioning policy

## Outcome

- ✅ Impact: Initial constitution established with version 1.0.0, providing clear governance for the Live AI Dashboard frontend project
- 🧪 Tests: None (constitution phase)
- 📁 Files: Created .specify/memory/constitution.md with complete governance framework
- 🔁 Next prompts: Create feature specification (/sp.specify) for the dashboard
- 🧠 Reflection: Constitution captures project-specific requirements for React 19 + Next.js 16, AI usage workflow, and simulation-driven architecture. All 6 principles are testable and declarative.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
