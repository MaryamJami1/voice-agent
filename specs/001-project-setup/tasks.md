# Tasks: Project Setup & Infrastructure

**Input**: Design documents from `/specs/001-project-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Tests are NOT requested in this feature specification - manual testing only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single frontend project**: `app/`, `components/`, `hooks/`, `lib/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 16 project with App Router using project initialization command
- [x] T002 Configure TypeScript and install React 19 dependency in package.json
- [x] T003 [P] Install Tailwind CSS and its dependencies in package.json
- [x] T004 [P] Install code quality tools (ESLint, Prettier) in package.json
- [x] T005 Create directory structure: components/, hooks/, lib/ at project root
- [x] T006 Create placeholder .gitkeep files in components/, hooks/, lib/

**Checkpoint**: Project initialization complete with all dependencies and directory structure ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Configure Tailwind CSS in tailwind.config.ts with dark mode enabled
- [x] T008 [P] Create app/globals.css with Tailwind directives and dark mode styles
- [x] T009 [P] Configure ESLint rules in .eslintrc.json for project standards
- [x] T010 [P] Configure Prettier in .prettierrc for code formatting
- [x] T011 [P] Configure TypeScript in tsconfig.json for Next.js 16 compatibility
- [x] T012 [P] Configure Next.js 16 in next.config.js with App Router settings
- [x] T013 Update package.json scripts: dev, build, start, lint, format, type-check

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Initial Project Environment Setup (Priority: P1) 🎯 MVP

**Goal**: Provide developers with a fully configured environment to start building the Live AI Dashboard

**Independent Test**: A developer can clone the repository, run the development server, and see a dark-themed page with all required directories present.

### Implementation for User Story 1

- [x] T014 [P] [US1] Create app/layout.tsx with root layout and HTML structure
- [x] T015 [US1] Apply dark mode configuration in app/layout.tsx using Tailwind dark mode class
- [x] T016 [P] [US1] Create app/page.tsx with default landing page content
- [x] T017 [US1] Style app/page.tsx with dark mode classes for initial page display
- [x] T018 [US1] Configure public/favicon.ico for browser tab icon

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Code Quality and Development Tools Configuration (Priority: P2)

**Goal**: Ensure consistent code formatting and type checking throughout the development process

**Independent Test**: The developer can write code that triggers linting errors, run the lint command, and see clear error messages with suggested fixes.

### Implementation for User Story 2

- [x] T019 [P] [US2] Create .eslintrc.json with ESLint configuration for React and TypeScript rules
- [x] T020 [P] [US2] Create .prettierrc with Prettier formatting rules (tabs, semicolons, quotes)
- [x] T021 [US2] Add lint script to package.json that runs ESLint on all source files
- [x] T022 [US2] Add format script to package.json that runs Prettier with write mode
- [x] T023 [US2] Add type-check script to package.json that runs TypeScript compiler with noEmit
- [x] T024 [US2] Configure pre-commit hook to run linting (optional, if supported by project setup)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation

- [x] T025 [P] Create README.md with project overview, setup instructions, and quick reference
- [x] T026 [P] Verify all scripts in package.json work correctly (dev, build, lint, format, type-check)
- [x] T027 Test development server startup and verify no console errors
- [x] T028 Verify dark mode styling is applied correctly on the default page
- [x] T029 Verify all required directories (components, hooks, lib) exist and are accessible

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion - No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion - No dependencies on other stories
- **Polish (Phase 5)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on User Story 1

### Within Each User Story

- No test phase (manual testing only)
- Configuration files before application code
- Core implementation before polish

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- All User Story 1 configuration tasks marked [P] can run in parallel
- All User Story 2 configuration tasks marked [P] can run in parallel
- User Story 1 and User Story 2 can be worked on in parallel (both depend on Foundational phase only)

---

## Parallel Example: User Story 1 & User Story 2

```bash
# After Phase 2 (Foundational) is complete, launch both stories in parallel:

# User Story 1 tasks:
Task: "Create app/layout.tsx with root layout and HTML structure"
Task: "Create app/page.tsx with default landing page content"
Task: "Configure public/favicon.ico for browser tab icon"

# User Story 2 tasks (can run simultaneously with US1):
Task: "Create .eslintrc.json with ESLint configuration for React and TypeScript rules"
Task: "Create .prettierrc with Prettier formatting rules"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (start dev server, verify dark theme, check directories)
5. Demo/confirm ready for next phase (Phase 2 of overall project: Core Simulation Hook)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Confirm working
3. Add User Story 2 → Test independently → Confirm working
4. Add Polish → Final validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Manual testing required for validation
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
