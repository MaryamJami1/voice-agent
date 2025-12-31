# Quickstart: Phase 5 - Read Requirements from phase.md file

## Overview
This guide will help you get started with the requirements reading functionality for phase.md files.

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation
1. Navigate to your project directory:
   ```bash
   cd your-project-directory
   ```

2. The requirements reading functionality is part of the core library, so it should be available in the `lib/requirements-reader/` directory.

## Basic Usage

### Reading Requirements from a Phase File
```typescript
import { readRequirements } from './lib/requirements-reader';

// Read requirements from a phase.md file
const result = await readRequirements('./path/to/phase.md');

console.log(`Found ${result.phaseContext.requirementsCount} requirements in phase ${result.phaseContext.phaseId}`);
console.log('Requirements:', result.requirements);
console.log('Validation results:', result.validationResults);
```

### Validating Requirements Format
```typescript
import { validateRequirementsFormat } from './lib/requirements-reader';

const validationResult = await validateRequirementsFormat(requirementsArray);
if (validationResult.every(vr => vr.isValid)) {
  console.log('All requirements are properly formatted');
} else {
  console.log('Validation errors:', validationResult.filter(vr => !vr.isValid));
}
```

### Processing Multiple Phase Files
```typescript
import { readRequirementsFromMultipleFiles, MultiFileProcessor } from './lib/requirements-reader';

// Method 1: Using the convenience function
const phaseFiles = ['./phase1.md', './phase2.md', './phase3.md'];
const allResults = await readRequirementsFromMultipleFiles(phaseFiles);

allResults.forEach(result => {
  console.log(`Phase ${result.phaseContext.phaseId}: ${result.requirements.length} requirements`);
});

// Method 2: Using the MultiFileProcessor for more advanced scenarios
const processor = new MultiFileProcessor();
const processedResults = await processor.processMultipleFiles(phaseFiles);
```

## Configuration Options
The requirements reader supports the following options:
- `filePattern`: Pattern to match phase files (default: `phase*.md`)
- `validationEnabled`: Whether to perform format validation (default: true)
- `errorHandling`: Strategy for handling errors (default: throw on error)

## Common Tasks

### Extract Specific Requirements
```typescript
// Filter requirements by priority
const highPriorityRequirements = requirements.filter(req => req.priority === 'P1');

// Find requirements containing specific keywords
const searchResults = requirements.filter(req =>
  req.description.toLowerCase().includes('performance')
);
```

### Export Processed Requirements
```typescript
// Requirements are already in a structured format, so you can serialize them directly
const requirements = await readRequirements('./path/to/phase.md');

// Export to JSON format
const jsonData = JSON.stringify(requirements, null, 2);
console.log(jsonData);

// Or process the requirements as needed
const processed = requirements.requirements.map(req => ({
  id: req.id,
  description: req.description,
  priority: req.priority
}));
```

## Troubleshooting

### File Not Found Errors
- Ensure the file path is correct
- Check that the file exists in the specified location
- Verify read permissions for the file

### Parsing Errors
- Check that the phase.md file follows the expected format
- Ensure requirement IDs follow the pattern **FR-XXX** or **SC-XXX**
- Verify proper markdown formatting

### Validation Failures
- Review validation error messages for specific issues
- Ensure all required fields are present in the requirements
- Check that requirement format matches the specification