# Data Model: Live Transcript Component

**Feature**: Live Transcript Component (Phase 4)
**Date**: 2025-12-31

## Entity: TranscriptMessage

### Attributes
- `id`: string
  - Unique identifier for the message
  - Required: Yes
  - Format: UUID or timestamp-based string

- `content`: string
  - The text content of the message
  - Required: Yes
  - Max length: No specific limit (constrained by UI)

- `speaker`: 'agent' | 'user'
  - Identifies who spoke the message
  - Required: Yes
  - Values: 'agent' for AI agent messages, 'user' for user messages

- `timestamp`: Date
  - When the message was created/sent
  - Required: Yes
  - Format: ISO 8601 date string or JavaScript Date object

- `status`: 'pending' | 'delivered' | 'read'
  - Current status of the message (for potential future use)
  - Required: No
  - Default: 'delivered'

### Relationships
- Part of a TranscriptList collection
- Associated with an agent state from useAgentSimulator hook

### Validation Rules
- `content` must not be empty or whitespace only
- `speaker` must be either 'agent' or 'user'
- `timestamp` must be a valid date
- `id` must be unique within the transcript context

## Entity: TranscriptList

### Attributes
- `messages`: TranscriptMessage[]
  - Ordered collection of messages
  - Required: Yes
  - Minimum: 0 messages (empty transcript)
  - Maximum: No specific limit (constrained by UI performance)

- `lastUpdated`: Date
  - Timestamp of the last message update
  - Required: Yes
  - Format: ISO 8601 date string or JavaScript Date object

- `autoScrollEnabled`: boolean
  - Whether auto-scroll is currently active
  - Required: No
  - Default: true

### Relationships
- Contains multiple TranscriptMessage entities
- Associated with a useAgentSimulator hook instance

### Validation Rules
- `messages` array items must conform to TranscriptMessage schema
- `messages` must be ordered chronologically (oldest first)
- `lastUpdated` must be a valid date

## Component Props Interface: LiveTranscriptProps

### Attributes
- `messages`: TranscriptMessage[]
  - Array of messages to display
  - Required: Yes
  - Default: []

- `onScroll`: () => void
  - Callback when user scrolls manually
  - Required: No
  - Type: Function that takes no parameters and returns void

- `className`: string
  - Additional CSS classes to apply
  - Required: No
  - Default: ''

- `autoScroll`: boolean
  - Whether to enable auto-scroll behavior
  - Required: No
  - Default: true

## UI State Model

### Scroll State
- `isUserScrolledUp`: boolean
  - Indicates if user has scrolled away from the bottom
  - Used to determine if auto-scroll should be active

- `shouldAutoScroll`: boolean
  - Whether auto-scroll should be performed on new messages
  - Calculated based on scroll position and user interaction

### Display State
- `formattedMessages`: Formatted version of messages with UI-specific properties
  - May include additional properties for display purposes
  - Processed from raw TranscriptMessage objects

## Integration Model

### Hook Integration
The component will integrate with useAgentSimulator hook which provides:
- Current agent state ('idle', 'listening', 'processing', 'speaking')
- Transcript messages array
- State change callbacks

### Data Flow
1. useAgentSimulator hook provides messages
2. LiveTranscript component receives messages as props
3. Component renders messages with appropriate styling based on speaker
4. Auto-scroll behavior responds to new messages
5. User scroll interactions may temporarily disable auto-scroll