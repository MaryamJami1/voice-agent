# Data Model: Phase 6 Styling & Polish

**Feature**: Phase 6 Styling & Polish
**Date**: 2025-12-31

## Overview

This feature does not involve data persistence or traditional data entities. All entities defined here are styling-related configuration values that will be applied through Tailwind CSS configuration and component styling.

---

## Styling Entities

### Entity: Glassmorphism Style

**Purpose**: Defines the visual characteristics for glassmorphism effects applied to UI components.

**Attributes**:

| Attribute       | Type   | Value                                  | Description                                     |
| --------------- | ------ | -------------------------------------- | ----------------------------------------------- |
| blurAmount      | number | 8px+                                   | Minimum backdrop blur amount (spec requirement) |
| opacity         | number | 0.7-0.9                                | Background opacity for glass effect             |
| borderTreatment | string | "border-white/10" or "border-white/20" | Subtle white border for glass edges             |
| shadowTreatment | string | "shadow-lg" or "shadow-cyan-500/10"    | Shadow for depth                                |

**Implementation**:

- Applied via Tailwind CSS utility classes
- blurAmount: `backdrop-blur-md` (12px) or `backdrop-blur-lg` (16px)
- opacity: rgba backgrounds like `bg-gray-900/80`
- borderTreatment: `border border-white/10`

**Usage Example**:

```tsx
<div className="bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-lg">
  {/* Content */}
</div>
```

---

### Entity: Neon Accent Palette

**Purpose**: Defines the set of neon accent colors used for interactive elements and state indicators.

**Attributes**:

| Color   | Hex Value | Tailwind Name | Usage                               |
| ------- | --------- | ------------- | ----------------------------------- |
| cyan    | #06b6d4   | cyan-500      | Idle state, agent speaker labels    |
| magenta | #d946ef   | fuchsia-500   | Processing state, user messages     |
| purple  | #a855f7   | purple-500    | Speaking state, user speaker labels |

**Implementation**:

- Extend Tailwind theme with custom `neon` color palette
- Add to `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      neon: {
        cyan: '#06b6d4',
        magenta: '#d946ef',
        purple: '#a855f7',
      },
    },
  },
}
```

**Usage Example**:

```tsx
<span className="text-neon-cyan">Current State</span>
<div className="bg-neon-magenta/20 border border-neon-magenta">Processing</div>
```

---

### Entity: Dark Theme Palette

**Purpose**: Defines the consistent dark mode color scheme used across all components.

**Attributes**:

| Color Role           | Hex Value | Tailwind Name | Usage                         |
| -------------------- | --------- | ------------- | ----------------------------- |
| Primary Background   | #0f172a   | slate-900     | Main page backgrounds         |
| Secondary Background | #1e293b   | slate-800     | Card/container backgrounds    |
| Tertiary Background  | #334155   | slate-700     | Hover states, nested elements |
| Primary Text         | #f1f5f9   | slate-100     | Main text content             |
| Secondary Text       | #94a3b8   | slate-400     | Metadata, labels              |
| Border               | #475569   | slate-600     | Component borders             |

**Implementation**:

- Default Tailwind slate palette already matches these values
- Ensure dark mode is enabled on `html` or `body` element
- Configure in `tailwind.config.ts`:

```typescript
darkMode: 'class'
```

**Usage Example**:

```tsx
<div className="bg-slate-900 text-slate-100 border border-slate-600">{/* Dark mode content */}</div>
```

---

### Entity: Responsive Breakpoints

**Purpose**: Defines screen size breakpoints for adaptive layouts.

**Attributes**:

| Breakpoint | Pixel Width | Tailwind Class | Device Type                 |
| ---------- | ----------- | -------------- | --------------------------- |
| mobile     | 320px       | default        | Small phones                |
| sm         | 640px       | `sm:`          | Large phones, small tablets |
| tablet     | 768px       | `md:`          | Tablets                     |
| desktop    | 1024px      | `lg:`          | Laptops, small desktops     |
| xl         | 1280px      | `xl:`          | Large desktops              |

**Implementation**:

- Use Tailwind's responsive prefix system
- Mobile-first approach: default styles for mobile, override with prefixes
- Minimum 320px per spec requirement

**Usage Example**:

```tsx
<div className="p-4 md:p-6 lg:p-8">{/* Mobile: p-4, Tablet: p-6, Desktop: p-8 */}</div>
```

---

### Entity: Animation Timing

**Purpose**: Defines duration and easing curves for smooth transitions.

**Attributes**:

| Property | Value       | Tailwind Class                                 | Description                          |
| -------- | ----------- | ---------------------------------------------- | ------------------------------------ |
| duration | 150-300ms   | `duration-150`, `duration-200`, `duration-300` | Transition duration                  |
| easing   | ease-in-out | `ease-in-out`                                  | Smooth acceleration and deceleration |

**Implementation**:

- Use Tailwind's transition utilities
- Apply to interactive elements for smooth UX

**Usage Example**:

```tsx
<button className="transition-all duration-200 ease-in-out hover:scale-105">Click me</button>
```

---

## Component Styling Maps

### AudioVisualizer Component

| Element          | Styling                     | Tailwind Classes                                                            |
| ---------------- | --------------------------- | --------------------------------------------------------------------------- |
| Container        | Glassmorphism + neon shadow | `bg-gray-900/30 backdrop-blur-md border border-white/10 shadow-cyan-500/20` |
| Idle State       | Dim cyan color              | `text-cyan-500`                                                             |
| Listening State  | Medium cyan                 | `text-cyan-400`                                                             |
| Processing State | Magenta                     | `text-fuchsia-500`                                                          |
| Speaking State   | Purple                      | `text-purple-500`                                                           |

### LiveTranscript Component

| Element           | Styling              | Tailwind Classes                                            |
| ----------------- | -------------------- | ----------------------------------------------------------- |
| Container         | Glassmorphism        | `bg-gray-900/80 backdrop-blur-lg border border-gray-700/50` |
| Agent Messages    | Cyan border + glow   | `border-neon-cyan/50 shadow-cyan-500/20`                    |
| User Messages     | Purple border + glow | `border-neon-purple/50 shadow-purple-500/20`                |
| Message Container | Glassmorphism bubble | `bg-gray-800/70 backdrop-blur-sm`                           |
| Auto-scroll       | Smooth behavior      | `scroll-behavior: smooth`                                   |

### Dashboard Component

| Element             | Styling          | Tailwind Classes                                          |
| ------------------- | ---------------- | --------------------------------------------------------- |
| Main Container      | Dark mode        | `bg-slate-900 text-slate-100`                             |
| Card Containers     | Glassmorphism    | `bg-slate-800/70 backdrop-blur-md border border-white/10` |
| Buttons (Interrupt) | Cyan neon        | `bg-neon-cyan hover:bg-neon-cyan/80`                      |
| Buttons (End Call)  | Red/magenta neon | `bg-neon-magenta hover:bg-neon-magenta/80`                |
| Buttons (Start)     | Green/cyan neon  | `bg-green-600 hover:bg-green-700`                         |
| State Display       | High contrast    | `text-neon-cyan font-bold`                                |

---

## Tailwind Configuration

### Extended Theme

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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

---

## Validation Rules

### Contrast Requirements (WCAG AA)

| Element                   | Foreground | Background | Contrast Ratio | Status  |
| ------------------------- | ---------- | ---------- | -------------- | ------- |
| Neon cyan on dark bg      | #06b6d4    | #0f172a    | ~6.8:1         | ✅ PASS |
| Neon magenta on dark bg   | #d946ef    | #0f172a    | ~5.2:1         | ✅ PASS |
| Neon purple on dark bg    | #a855f7    | #0f172a    | ~4.9:1         | ✅ PASS |
| Primary text on dark bg   | #f1f5f9    | #0f172a    | ~13.5:1        | ✅ PASS |
| Secondary text on dark bg | #94a3b8    | #0f172a    | ~4.5:1         | ✅ PASS |

### Glassmorphism Opacity Ranges

| Component        | Minimum Opacity | Maximum Opacity | Purpose                     |
| ---------------- | --------------- | --------------- | --------------------------- |
| Main containers  | 0.7             | 0.9             | Readability + blur effect   |
| Message bubbles  | 0.7             | 0.8             | Distinguish from background |
| Overlay elements | 0.5             | 0.7             | Subtle layering             |

---

## Relationships

**No data relationships** - these are independent styling entities.

However, there are **usage patterns**:

1. **Glassmorphism Style** + **Dark Theme Palette** = Consistent glass effect across dark mode
2. **Neon Accent Palette** + **Agent States** = State-specific visual feedback
3. **Responsive Breakpoints** + **Component Styling Maps** = Adaptive layouts
4. **Animation Timing** + **Interactive Elements** = Smooth user experience

---

## Notes

- All styling is implemented through Tailwind CSS utility classes
- No JavaScript state changes required for this feature
- Styling is applied to existing components (no new components)
- Constitution compliance: No manual memoization, relies on React Compiler
- Performance: Using CSS transforms/opacity for 60fps animations
