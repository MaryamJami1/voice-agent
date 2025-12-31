# Quickstart: Audio Visualizer Component

## Overview
The Audio Visualizer Component is a React component that provides animated visual feedback synchronized with agent states from the `useAgentSimulator` hook. It implements canvas-based animations with futuristic styling (glassmorphism, neon accents).

## Prerequisites
- Node.js 18+ installed
- Next.js 16 project with App Router
- React 19 (strict mode)
- Tailwind CSS configured with dark mode
- `useAgentSimulator` hook available in project

## Installation
The component is part of the existing project structure and doesn't require separate installation. It will be created in the `/components/AudioVisualizer` directory.

## Basic Usage

```tsx
'use client';

import { useAgentSimulator } from '@/hooks/useAgentSimulator';
import { AudioVisualizer } from '@/components/AudioVisualizer/AudioVisualizer';

export default function Dashboard() {
  const { state } = useAgentSimulator();

  return (
    <div className="dashboard-container">
      <AudioVisualizer
        agentState={state}
        size="large"
        animationType="rings"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| agentState | 'idle' \| 'listening' \| 'processing' \| 'speaking' | Yes | - | Current agent state from useAgentSimulator hook |
| className | string | No | '' | Additional CSS classes for container |
| size | 'small' \| 'medium' \| 'large' | No | 'medium' | Visualizer display size |
| animationType | 'wave' \| 'bars' \| 'rings' | No | 'rings' | Type of visualization animation |

## Styling
The component uses Tailwind CSS classes for styling and implements the project's futuristic design system:
- Glassmorphism effects with backdrop blur
- Neon accent colors (cyan, magenta, purple)
- Dark mode by default
- Responsive design for all screen sizes

## Development Workflow
1. Create the component file at `/components/AudioVisualizer/AudioVisualizer.tsx`
2. Implement canvas-based animations based on agent state
3. Apply Tailwind CSS classes for glassmorphism and neon styling
4. Test state transitions to ensure visual feedback is accurate
5. Verify performance maintains 60fps across different states