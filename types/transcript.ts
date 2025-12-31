/**
 * Type definitions for transcript-related entities
 * Based on data-model.md specifications
 */

export interface TranscriptMessage {
  id: string
  content: string
  speaker: 'Agent' | 'User'
  timestamp: Date
  status?: 'pending' | 'delivered' | 'read'
}

export interface TranscriptList {
  messages: TranscriptMessage[]
  lastUpdated: Date
  autoScrollEnabled?: boolean
}

export interface LiveTranscriptProps {
  messages: TranscriptMessage[]
  onScroll?: () => void
  className?: string
  autoScroll?: boolean
}
