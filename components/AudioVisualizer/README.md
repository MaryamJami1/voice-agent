# Audio Visualizer Component

The Audio Visualizer Component is a React component that provides animated visual feedback synchronized with agent states from the `useAgentSimulator` hook. It implements canvas-based animations with futuristic styling (glassmorphism, neon accents).

## Usage Example

```tsx
'use client';

import { useAgentSimulator } from '@/hooks/useAgentSimulator';
import AudioVisualizer from '@/components/AudioVisualizer/AudioVisualizer';

export default function Dashboard() {
  const { currentAgentState } = useAgentSimulator();

  return (
    <div className="dashboard-container p-8">
      <h1>Live AI Dashboard</h1>
      <AudioVisualizer
        agentState={currentAgentState}
        size="large"
        animationType="rings"
        className="my-4"
        onStateChange={(newState) => console.log('State changed to:', newState)}
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
| onStateChange | function | No | undefined | Callback when visualizer responds to agent state change |
| onAnimationComplete | function | No | undefined | Callback when animation sequence completes |