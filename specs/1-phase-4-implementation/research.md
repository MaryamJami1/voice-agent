# Research: Live Transcript Component

**Feature**: Live Transcript Component (Phase 4)
**Date**: 2025-12-31

## Auto-scroll Implementation Research

### Decision: Use Intersection Observer API with scroll container ref
### Rationale:
- Provides smooth auto-scroll behavior without interfering with user-initiated scrolls
- React-compatible approach that works well with useEffect hooks
- Detects when user has scrolled away from the bottom and adjusts auto-scroll behavior accordingly

### Alternatives Considered:
- `scrollIntoView()` method: Simple but can interfere with user scrolling experience
- Manual scroll position tracking: More complex but offers more control
- CSS-based solutions: Limited functionality for dynamic content

## Transcript Message Format Research

### Decision: Based on phase.md and simulation hook requirements, messages will follow a structure with speaker, content, and timestamp
### Rationale:
- Phase 4 requirements specify messages must have timestamps and speaker labels (Agent/User)
- Integration with useAgentSimulator hook requires understanding its message structure
- Consistency with overall simulation state pattern

### Expected Message Structure:
```typescript
{
  id: string,
  content: string,
  speaker: 'agent' | 'user',
  timestamp: Date,
  state: string // associated agent state
}
```

## Real-time Update Pattern Research

### Decision: Use useEffect with messages array as dependency to trigger updates
### Rationale:
- React's useEffect hook is the standard pattern for side effects when data changes
- Listening to changes in the messages array from useAgentSimulator hook will trigger UI updates
- Compatible with React Compiler optimization principles

### Alternatives Considered:
- useState with manual updates: More complex and error-prone
- Custom hooks for message handling: Over-engineering for this use case
- Context API: Not needed as messages come from useAgentSimulator hook directly

## Dark Mode Styling Research

### Decision: Use Tailwind CSS classes for futuristic design system
### Rationale:
- Consistent with project's Tailwind CSS requirement
- Matches the dark mode and futuristic aesthetic specified in constitution
- Glassmorphism effects achievable with backdrop-blur and bg-opacity classes

### Styling Pattern:
- Dark background: `bg-gray-900` or similar dark base
- Glassmorphism: `bg-white/10 backdrop-blur-lg border border-white/20`
- Neon accents: `text-cyan-400` for agent, `text-magenta-400` for user (using appropriate Tailwind colors)
- Message bubbles: `rounded-lg p-4 mb-2 max-w-[80%]`

## Scroll Behavior Research

### Decision: Implement smart auto-scroll that respects user interaction
### Rationale:
- Users may scroll up to read history, so auto-scroll should be disabled when user scrolls away from bottom
- Should re-enable auto-scroll when user scrolls back near the bottom
- Provides the best balance between real-time updates and user control

### Implementation Pattern:
- Track scroll position and container dimensions
- Calculate if user is near the bottom of the scroll container
- Only auto-scroll if user is already near the bottom
- Provide visual indicator when new messages arrive while scrolled up

## Additional Research Findings

### Performance Considerations
- Limit DOM elements by virtualizing long message lists if needed
- Use React Compiler for optimization (no manual memoization)
- Consider message pagination for very long conversations

### Accessibility Considerations
- Add ARIA labels for message status
- Ensure proper contrast ratios for dark mode
- Keyboard navigation support for message list

### Integration Requirements
- Component must accept messages from useAgentSimulator hook
- Should provide callback for user interactions if needed
- Must work with existing dashboard layout and styling