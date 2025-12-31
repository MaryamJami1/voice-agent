# Requirements Reader Library

## Overview

The Requirements Reader library is designed to read, parse, and validate requirements from phase.md files. It enables automated processing of phase-specific requirements for the project's phase-based development workflow.

## Features

- **File Reading**: Reads requirements from markdown files with support for various naming conventions
- **Parsing**: Extracts requirements in standard formats (e.g., FR-XXX, SC-XXX)
- **Validation**: Validates requirement format and structure
- **Multi-Phase Support**: Handles multiple phase files and maintains context
- **Error Handling**: Comprehensive error handling with specific error types
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install # The library is part of the project
```

## Usage

### Basic Usage

```typescript
import { readRequirements } from 'lib/requirements-reader'

// Read requirements from a phase.md file
const requirements = await readRequirements('./path/to/phase.md')
console.log(`Found ${requirements.phaseContext.requirementsCount} requirements`)
console.log('Requirements:', requirements.requirements)
```

### Reading Multiple Files

```typescript
import { readRequirementsFromMultipleFiles } from 'lib/requirements-reader'

// Read requirements from multiple phase files
const filePaths = ['./phase1.md', './phase2.md', './phase3.md']
const allRequirements = await readRequirementsFromMultipleFiles(filePaths)

allRequirements.forEach((result) => {
  console.log(`Phase ${result.phaseContext.phaseId}: ${result.requirements.length} requirements`)
})
```

### Advanced Usage with Multi-File Processor

```typescript
import { MultiFileProcessor } from 'lib/requirements-reader'

const processor = new MultiFileProcessor()

// Process multiple files
const results = await processor.processMultipleFiles(['./phase1.md', './phase2.md'])

// Get combined results
const combined = combinePhaseRequirements(results)
console.log(`Total requirements: ${combined.allRequirements.length}`)
console.log(`Validation errors: ${combined.validationSummary.errors.length}`)
```

## API Reference

### Functions

#### `readRequirements(filePath: string)`

Reads and parses requirements from a single phase.md file.

**Parameters:**

- `filePath` (string): Path to the phase.md file

**Returns:**

- `Promise<PhaseRequirements>`: Object containing requirements and context

#### `readRequirementsFromMultipleFiles(filePaths: string[])`

Reads and parses requirements from multiple phase.md files.

**Parameters:**

- `filePaths` (string[]): Array of paths to phase.md files

**Returns:**

- `Promise<PhaseRequirements[]>`: Array of objects containing requirements and context

#### `processMultiplePhaseFiles(filePaths: string[])`

Processes multiple phase.md files using the MultiFileProcessor class.

**Parameters:**

- `filePaths` (string[]): Array of paths to phase.md files

**Returns:**

- `Promise<PhaseRequirements[]>`: Array of objects containing requirements and context

### Classes

#### `MultiFileProcessor`

Manages processing of multiple phase.md files with context tracking.

#### `PhaseContextManager`

Manages phase context information across multiple files.

### Types

#### `PhaseRequirement`

```typescript
{
  id: string // Requirement ID (e.g., "FR-001")
  description: string // Requirement description
  priority: string // Priority level (P1, P2, P3, etc.)
  status: string // Requirement status
  phase: string // Phase identifier
  sourceFile: string // Source file path
}
```

#### `PhaseContext`

```typescript
{
  phaseId: string // Unique phase identifier
  sourceFile: string // Source file path
  createdAt: Date // Creation timestamp
  requirementsCount: number // Number of requirements found
}
```

## Error Handling

The library provides specific error types for different failure scenarios:

- `FileNotFoundError`: When the specified file does not exist
- `FileReadError`: When there's an error reading the file
- `ParseError`: When there's an error parsing the requirements
- `ValidationError`: When requirements fail validation
- `RequirementsReaderError`: General library error

## Validation

Requirements are validated against the following schema:

- ID must follow the pattern: `^(FR|SC)-\d+$` (e.g., FR-001, SC-001)
- Description must be non-empty
- Priority must be one of: P1, P2, P3, P4, P5
- All required fields must be present

## File Format Support

The library expects phase.md files to follow this structure:

```markdown
# Feature Specification: [Phase Name]

## Requirements

### Functional Requirements

- **FR-001**: [Requirement text]
- **FR-002**: [Requirement text]

## Success Criteria

- **SC-001**: [Success criterion]
```

## Contributing

1. Make changes to the source files in `lib/requirements-reader/`
2. Update tests if applicable
3. Run tests to ensure functionality
4. Submit a pull request
