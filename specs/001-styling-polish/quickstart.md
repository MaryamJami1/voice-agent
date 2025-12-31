# Phase 6 Styling & Polish - Quickstart

## Overview

Phase 6 applies professional visual styling to the Live AI Dashboard including glassmorphism effects, neon accent colors, consistent dark mode, responsive design, and smooth animations.

**Prerequisites**: Phase 1-5 must be complete with all components functional.

---

## Setup

1. **Switch to feature branch**:

   ```bash
   git checkout 001-styling-polish
   ```

2. **Verify Phase 1-5 is complete**:
   - `useAgentSimulator` hook exists in `/hooks`
   - `AudioVisualizer` component exists in `/components/AudioVisualizer/`
   - `LiveTranscript` component exists in `/components/`
   - `Dashboard` component exists in `/components/`
   - All pages exist in `/app/`

3. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

---

## Development Workflow

### Step 1: Extend Tailwind Configuration

**File**: `tailwind.config.ts`

**Changes**: Add neon colors and custom animations to theme.

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Ensure dark mode is class-based
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#06b6d4', // cyan-500 - idle state
          magenta: '#d946ef', // fuchsia-500 - processing state
          purple: '#a855f7', // purple-500 - speaking state
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

**Testing**: Restart dev server and verify neon colors work:

```tsx
<div className="text-neon-cyan">Testing neon cyan</div>
```

---

### Step 2: Enhance Global Styles

**File**: `app/globals.css`

**Changes**: Add glassmorphism utilities and reduced motion support.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}

@layer utilities {
  /* Glassmorphism utilities */
  .glass-card {
    @apply bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-lg;
  }

  .glass-card-strong {
    @apply bg-gray-900/90 backdrop-blur-lg border border-white/20 shadow-xl;
  }

  /* Neon glow effects */
  .glow-cyan {
    @apply shadow-cyan-500/50;
  }

  .glow-magenta {
    @apply shadow-fuchsia-500/50;
  }

  .glow-purple {
    @apply shadow-purple-500/50;
  }

  /* Smooth transitions for interactive elements */
  .transition-smooth {
    @apply transition-all duration-200 ease-in-out;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .animate-pulse,
    .animate-spin,
    .animate-bounce {
      animation: none;
    }
  }
}
```

---

### Step 3: Style Components (Priority Order)

#### P1 Tasks: Glassmorphism & Neon Accents

##### Task 3: AudioVisualizer Component

**File**: `components/AudioVisualizer/AudioVisualizer.tsx`

**Changes**: Apply glassmorphism to container, enhance neon state colors.

```tsx
// Update container className (around line 329-335)
<div className={`
  relative rounded-2xl backdrop-blur-lg
  bg-gradient-to-br from-slate-900/30 to-slate-800/20
  border border-white/10 shadow-lg shadow-neon-cyan/20
  ${sizeClass}
  flex items-center justify-center
  transition-all duration-200 ease-in-out
`}>
```

**State Colors** (already implemented, verify colors match):

- Idle: `#06b6d4` (neon cyan, dim)
- Listening: `#00ffff` (neon cyan, medium)
- Processing: `#d946ef` (neon magenta)
- Speaking: `#a855f7` (neon purple)

---

##### Task 5: LiveTranscript Component

**File**: `components/LiveTranscript.tsx`

**Changes**: Enhance glassmorphism, improve neon accents.

```tsx
// Update container className (line 54)
className={`glass-card-strong rounded-xl h-96 overflow-y-auto border border-gray-700/50 shadow-2xl ${className}`}

// Update Agent message bubble (line 71)
className="bg-slate-800/80 backdrop-blur-md text-white rounded-tl-none border-2 border-neon-cyan/50 shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-500/50"

// Update User message bubble (line 72)
className="bg-slate-700/80 backdrop-blur-md text-white rounded-tr-none border-2 border-neon-purple/50 shadow-lg shadow-purple-500/30 transition-all duration-200 hover:shadow-purple-500/50"

// Update speaker labels (lines 78-79)
className={`text-sm font-semibold ${
  message.speaker === 'Agent' ? 'text-neon-cyan glow-cyan' : 'text-neon-purple glow-purple'
}`}
```

---

##### Task 7: Dashboard Component

**File**: `components/Dashboard.tsx`

**Changes**: Apply glassmorphism to containers, enhance neon accents on buttons.

```tsx
// Update main container (line 41)
<div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 lg:p-8">

// Update audio visualizer container (line 45)
<div className="flex justify-center mb-6 md:mb-8">
  <AudioVisualizer
    agentState={optimisticState}
    size="large"
    animationType="rings"
    className="transition-transform duration-300 hover:scale-105"
  />
</div>

// Update state display container (line 55)
<div className="glass-card rounded-xl p-4 md:p-6 mb-6">
  <div className="mb-2">
    <span className="text-slate-400">Current State:</span>{' '}
    <span className="font-bold text-neon-cyan text-lg md:text-xl glow-cyan">{optimisticState}</span>
  </div>
  <div>
    <span className="text-slate-400">Simulation Status:</span>{' '}
    <span className={isRunning ? 'text-green-400' : 'text-red-400'}>
      {isRunning ? 'Running' : 'Stopped'}
    </span>
  </div>
</div>

// Update controls container (line 69)
<div className="flex flex-wrap gap-4 mb-6">

// Update Interrupt button (lines 70-75)
<button
  onClick={handleInterrupt}
  disabled={!isRunning}
  className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-neon-cyan hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
>
  Interrupt Agent
</button>

// Update End Call button (lines 77-82)
<button
  onClick={stop}
  disabled={!isRunning}
  className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-neon-magenta hover:bg-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50 active:scale-95"
>
  End Call
</button>

// Update Start button (lines 84-89)
<button
  onClick={start}
  disabled={isRunning}
  className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
>
  Start
</button>

// Update transcript container (line 94)
<div className="glass-card rounded-xl p-4 md:p-6 max-h-96 overflow-y-auto">
```

---

#### P2 Tasks: Dark Mode & Responsive Design

##### Task 10: App Layout

**File**: `app/layout.tsx`

**Changes**: Ensure dark mode class on HTML element.

```tsx
<html lang="en" className="dark">
```

##### Task 12: Dashboard Page Layout

**File**: `app/dashboard/page.tsx`

**Changes**: Responsive grid layout (if separate page exists).

```tsx
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 lg:p-8">
      <Dashboard />
    </main>
  )
}
```

---

#### P3 Tasks: Animations & Polish

##### Task 17: Reduced Motion Support

**File**: `app/globals.css` (already added in Step 2)

Verify media query wraps all animations:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animation styles from Step 2 */
}
```

---

## Testing Manual Testing Required

### 1. Visual Inspection

**Glassmorphism Effects**:

- [ ] Blur is visible on all major components
- [ ] Background shows through glass elements
- [ ] Borders create subtle glass edges
- [ ] Shadow effects add depth

**Neon Accents**:

- [ ] Interactive elements use neon colors
- [ ] Agent states display correct colors:
  - Idle: cyan
  - Listening: cyan (brighter)
  - Processing: magenta
  - Speaking: purple
- [ ] Colors are harmonious, not clashing

**Dark Mode**:

- [ ] Background is consistent dark slate (#0f172a)
- [ ] Text is readable (high contrast)
- [ ] No light mode colors visible

---

### 2. Responsive Testing

Test at each breakpoint (use browser DevTools):

**Mobile (320px)**:

- [ ] All content fits without horizontal scrolling
- [ ] Touch targets are minimum 44x44px
- [ ] Layout stacks vertically
- [ ] Font sizes readable

**Tablet (768px)**:

- [ ] Content uses available space efficiently
- [ ] Two-column layouts where appropriate
- [ ] No horizontal scrolling

**Desktop (1024px+)**:

- [ ] Content uses wide screen space
- [ ] Multiple columns visible
- [ ] Margins and spacing appropriate

---

### 3. Animation Testing

**Transitions**:

- [ ] Hover states animate smoothly (150-300ms)
- [ ] Button clicks provide feedback (scale effect)
- [ ] No janky animations

**State Transitions**:

- [ ] Idle → Listening: Visual change is clear
- [ ] Listening → Processing: Visual change is clear
- [ ] Processing → Speaking: Visual change is clear
- [ ] Transitions animate at 60fps

**Reduced Motion**:

- [ ] Enable "Show animation" in browser settings (Firefox) or equivalent
- [ ] Animations are disabled or simplified
- [ ] Functionality remains intact

---

### 4. Performance Testing

**Chrome DevTools Performance**:

1. Open DevTools → Performance tab
2. Start recording
3. Trigger state transitions
4. Stop recording
5. Check:
   - [ ] Animations run at 60fps
   - [ ] No layout thrashing
   - [ ] No forced reflows

**Page Load Time**:

1. Open DevTools → Network tab
2. Throttle to "Fast 3G"
3. Reload page
4. Check:
   - [ ] Load time under 2 seconds
   - [ ] No console errors or warnings

---

### 5. Accessibility Testing

**Contrast Ratios**:

1. Install Axe DevTools extension (Chrome)
2. Run contrast audit
3. Check:
   - [ ] All text meets WCAG AA (4.5:1)
   - [ ] Large text meets WCAG AA (3:1)

**Keyboard Navigation**:

- [ ] Tab through interactive elements
- [ ] Focus indicators visible
- [ ] Enter/Space activate buttons

---

## Validation Checklist

Reference: `specs/001-styling-polish/checklists/requirements.md`

- [ ] Glassmorphism effects on all major components (SC-001)
- [ ] Neon accents on interactive elements (SC-002)
- [ ] Text contrast meets WCAG AA (SC-003)
- [ ] Responsive layout on mobile/tablet/desktop (SC-004)
- [ ] Smooth animations at 60fps (SC-005)
- [ ] All 4 agent states visually distinct (SC-006)
- [ ] Page load time under 2 seconds (SC-007)
- [ ] Reduced motion respected (SC-008)

---

## Troubleshooting

### Issue: Glassmorphism blur not visible

**Cause**: backdrop-filter not supported or not enough contrast between layers

**Solution**:

1. Verify browser supports backdrop-filter (Chrome 76+, Firefox 103+, Safari 9+)
2. Ensure background behind glass has color/texture
3. Increase opacity of glass background (try `bg-gray-900/90`)

---

### Issue: Animations janky on mobile

**Cause**: Animations trigger layout reflows

**Solution**:

1. Verify using only `transform` and `opacity` for animations
2. Check browser DevTools Performance for reflows
3. Reduce animation complexity or disable on mobile

---

### Issue: Contrast ratios failing WCAG

**Cause**: Colors too similar, insufficient contrast

**Solution**:

1. Use browser DevTools color picker to check contrast
2. Adjust hex values in neon colors (lighten or darken)
3. Run Axe DevTools audit for detailed issues

---

### Issue: Responsive layout breaking

**Cause**: Fixed widths or insufficient breakpoint coverage

**Solution**:

1. Remove fixed widths (use `w-full`, `max-w-*`)
2. Add responsive prefixes (`md:`, `lg:`) for all affected elements
3. Test at multiple breakpoints

---

## Code Quality Checks

Before committing:

1. **Run Prettier**:

   ```bash
   npm run format
   ```

2. **Run ESLint**:

   ```bash
   npm run lint
   ```

3. **Run TypeScript type check**:

   ```bash
   npm run type-check
   ```

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## Commit Message

```bash
git add .
git commit -m "Implement phase 6: Styling and polish

- Add neon accent colors to Tailwind theme
- Apply glassmorphism effects to all major components
- Implement responsive layouts (mobile/tablet/desktop)
- Add smooth CSS transitions (150-300ms)
- Ensure WCAG AA contrast compliance
- Add reduced motion support
- Optimize animations for 60fps performance

All success criteria met (SC-001 through SC-008)"
```

---

## Next Steps

After Phase 6 implementation is complete:

1. **Run all validation checks** from Testing section
2. **Update documentation**:
   - Add screenshots to README.md
   - Update component READMEs with styling notes
3. **Commit and push**:
   ```bash
   git push origin 001-styling-polish
   ```
4. **Merge to main branch** (after code review)
5. **Proceed to Phase 7**: Deployment & Documentation

---

## References

- **Feature Spec**: `specs/001-styling-polish/spec.md`
- **Implementation Plan**: `specs/001-styling-polish/plan.md`
- **Data Model**: `specs/001-styling-polish/data-model.md`
- **Research**: `specs/001-styling-polish/research.md`
- **Constitution**: `.specify/memory/constitution.md`
