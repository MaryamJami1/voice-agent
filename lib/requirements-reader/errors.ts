// lib/requirements-reader/errors.ts
// Error handling framework for requirements reading functionality

export class RequirementsReaderError extends Error {
  public readonly code: string
  public readonly details?: any

  constructor(message: string, code: string, details?: any) {
    super(message)
    this.name = 'RequirementsReaderError'
    this.code = code
    this.details = details
  }
}

export class FileNotFoundError extends RequirementsReaderError {
  constructor(filePath: string) {
    super(`File not found: ${filePath}`, 'FILE_NOT_FOUND')
  }
}

export class FileReadError extends RequirementsReaderError {
  constructor(filePath: string, originalError?: any) {
    super(`Failed to read file: ${filePath}`, 'FILE_READ_ERROR', originalError)
  }
}

export class ParseError extends RequirementsReaderError {
  constructor(message: string) {
    super(message, 'PARSE_ERROR')
  }
}

export class ValidationError extends RequirementsReaderError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details)
  }
}

export class FormatError extends RequirementsReaderError {
  constructor(message: string) {
    super(message, 'FORMAT_ERROR')
  }
}

export class ProcessingError extends RequirementsReaderError {
  constructor(message: string) {
    super(message, 'PROCESSING_ERROR')
  }
}

/**
 * Creates a standardized error response
 * @param error - The error to format
 * @returns Formatted error object with message and code
 */
export function formatError(error: Error): { message: string; code: string } {
  if (error instanceof RequirementsReaderError) {
    return {
      message: error.message,
      code: error.code,
    }
  }

  return {
    message: error.message,
    code: 'UNKNOWN_ERROR',
  }
}
