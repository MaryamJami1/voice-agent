/**
 * Utility functions for transcript-related operations
 */

export function formatTimestamp(date: Date): string {
  // Format the date as HH:MM:SS
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(date: Date): string {
  // Format the date as YYYY-MM-DD HH:MM:SS
  return date.toLocaleString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
