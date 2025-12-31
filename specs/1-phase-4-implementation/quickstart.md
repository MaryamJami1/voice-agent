# Quickstart Guide: Live Transcript Component

**Feature**: Live Transcript Component (Phase 4)
**Date**: 2025-12-31

## Overview

This guide provides instructions for implementing the Live Transcript Component, a scrolling chat-style interface for real-time messages in the Live AI Dashboard.

## Prerequisites

- Next.js 16 with App Router
- React 19 (strict version)
- TypeScript
- Tailwind CSS with dark mode enabled
- The `useAgentSimulator` hook (from Phase 2 implementation)

## Component Structure

```
components/
  └── LiveTranscript/
      ├── LiveTranscript.tsx
      ├── TranscriptMessage.tsx
      └── TranscriptList.tsx
```

## Implementation Steps

### 1. Create the TranscriptMessage Component

```tsx
// components/LiveTranscript/TranscriptMessage.tsx
import React from 'react'

interface TranscriptMessageProps {
  content: string
  speaker: 'agent' | 'user'
  timestamp: Date
}

const TranscriptMessage: React.FC<TranscriptMessageProps> = ({ content, speaker, timestamp }) => {
  // Implementation for displaying individual message with speaker styling
  // Use dark mode and futuristic styling (glassmorphism, neon accents)
}

export default TranscriptMessage
```

### 2. Create the LiveTranscript Component

```tsx
// components/LiveTranscript/LiveTranscript.tsx
import React, { useEffect, useRef, useState } from 'react'
import { TranscriptMessage as Message } from './TranscriptMessage'
import { useAgentSimulator } from '../../hooks/useAgentSimulator'

interface LiveTranscriptProps {
  className?: string
  autoScroll?: boolean
}

const LiveTranscript: React.FC<LiveTranscriptProps> = ({ className = '', autoScroll = true }) => {
  const { transcript } = useAgentSimulator() // Get messages from hook
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false)

  // Implement auto-scroll logic with useEffect
  // Handle user scroll detection
  // Render messages with proper styling

  return (
    <div className={`bg-gray-900 p-4 h-96 overflow-y-auto ${className}`} ref={scrollRef}>
      {/* Render transcript messages */}
    </div>
  )
}

export default LiveTranscript
```

### 3. Implement Auto-Scroll Logic

- Use `useRef` to reference the scroll container
- Implement `useEffect` to handle scrolling when new messages arrive
- Add scroll position detection to respect user scrolling
- Only auto-scroll when near the bottom of the container

### 4. Apply Styling

- Use Tailwind CSS for dark mode styling
- Implement glassmorphism effects: `bg-white/10 backdrop-blur-lg border border-white/20`
- Use neon accent colors: cyan for agent messages, magenta for user messages
- Ensure responsive design for different screen sizes

### 5. Integrate with useAgentSimulator Hook

- Import and use the hook to get real-time transcript messages
- Subscribe to transcript updates
- Ensure synchronization with other dashboard components

## Testing Checklist

- [ ] Component renders without errors
- [ ] Messages display with correct speaker labels and timestamps
- [ ] Auto-scroll works when new messages arrive
- [ ] User scrolling is respected (auto-scroll disables when scrolled up)
- [ ] Auto-scroll re-enables when scrolled back to bottom
- [ ] Dark mode styling applied correctly
- [ ] Responsive design works on different screen sizes
- [ ] Integration with useAgentSimulator hook functions properly
- [ ] No manual memoization used (relies on React Compiler)

## Key Considerations

- Do not use manual memoization (useMemo, useCallback, React.memo) - rely on React Compiler
- Use direct props for refs (no forwardRef)
- All state comes from useAgentSimulator hook
- Follow the futuristic design system (dark mode, glassmorphism, neon accents)
- Component should work independently but integrate with the overall dashboard
