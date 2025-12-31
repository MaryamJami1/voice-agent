# Frontend Intern Challenge: The "Live" AI Dashboard

## Objective

Build a visually stunning, responsive dashboard that monitors a simulated Voice AI agent session.  
This challenge tests your ability to:

- Build complex user interfaces
- Manage real-time state simulations
- Effectively utilize AI coding agents

---

## The Scenario

You are building the **"Active Call" interface** for a Voice AI startup.  
Since there is no live backend available, you must create a **custom simulation hook** (e.g., `useAgentSimulator`) to mimic a real conversation cycle.

---

## Feature Requirements

### 1. Audio Visualizer

A central UI element (waves, bars, or glowing rings) that reacts to the agent’s current status.

**Agent States:**

- **Idle** – Low activity
- **Listening** – Reactive to simulated user input
- **Processing** – Pulse / loading animation
- **Speaking** – High activity

---

### 2. Live Transcript

- A scrolling chat-style interface
- New messages should appear automatically
- Messages must stay in sync with the simulation loop

---

### 3. Control Panel

Buttons:

- **Interrupt Agent**
- **End Call**

**Interrupt Behavior:**

- When clicked, the visualizer must immediately switch to **Listening** mode

---

## Technical Requirements

- **Framework:** Next.js 16
  - App Router is mandatory
- **Library:** React 19 (strictly enforced)

### Constraints

1. Use `useOptimistic` to handle the immediate UI update when the **Interrupt** button is clicked.
2. If refs are used for the canvas or visualizer:
   - Pass the ref directly as a prop
   - **Do not** use `forwardRef`
3. **No manual memoization**
   - Do not use `useMemo` or `useCallback`
   - Rely on the React Compiler

---

## Styling

- Tailwind CSS
- Dark Mode
- Futuristic design
  - Glassmorphism
  - Neon accents

---

## AI Usage (Required)

You must use an AI coding agent such as:

- Cursor
- Windsurf
- v0

AI should be used to generate the **initial UI components**.

---

## Simulation Logic (Important)

This must **not** be a static page.

Your `useAgentSimulator` hook should:

- Start a timer on page load
- Automatically cycle through states, for example:
  - Agent speaking – 5 seconds
  - Silence – 1 second
  - User speaking – 3 seconds

The **Audio Visualizer** and **Live Transcript** must remain fully synchronized with this cycle.

---

## Deliverables

- ✅ Deployed link (Vercel)
- ✅ GitHub repository
- ✅ Proof of AI workflow:
  - 30-second screen recording **or**
  - Screenshot of chat logs showing how the AI was prompted to build the initial UI structure
