// examples/requirements-usage.ts
// Example usage of the requirements reader library

import { readRequirements, readRequirementsFromMultipleFiles, MultiFileProcessor } from '../lib/requirements-reader';

async function exampleUsage() {
  console.log('=== Requirements Reader Examples ===\n');

  // Example 1: Read requirements from a single file
  console.log('1. Reading requirements from a single file:');
  try {
    const requirements = await readRequirements('./specs/1-phase-5-implementation/spec.md');
    console.log(`   Found ${requirements.phaseContext.requirementsCount} requirements in phase ${requirements.phaseContext.phaseId}`);
    console.log(`   Validation errors: ${requirements.validationResults.filter(v => !v.isValid).length}`);

    // Display first few requirements
    requirements.requirements.slice(0, 2).forEach(req => {
      console.log(`   - ${req.id}: ${req.description.substring(0, 50)}...`);
    });
  } catch (error) {
    console.error('   Error reading single file:', error);
  }

  console.log('');

  // Example 2: Read requirements from multiple files
  console.log('2. Reading requirements from multiple files:');
  try {
    const filePaths = [
      './specs/1-phase-5-implementation/spec.md',
      './specs/1-phase-4-implementation/spec.md'  // Use an existing spec file if available
    ];

    // Filter to only include files that exist
    const existingFiles = filePaths.filter(file => {
      try {
        require('fs').accessSync(file);
        return true;
      } catch (e) {
        console.log(`   Skipping non-existent file: ${file}`);
        return false;
      }
    });

    if (existingFiles.length > 0) {
      const allRequirements = await readRequirementsFromMultipleFiles(existingFiles);
      console.log(`   Processed ${allRequirements.length} files`);

      allRequirements.forEach(result => {
        console.log(`   - ${result.phaseContext.phaseId}: ${result.requirements.length} requirements`);
      });
    }
  } catch (error) {
    console.error('   Error reading multiple files:', error);
  }

  console.log('');

  // Example 3: Using MultiFileProcessor for advanced functionality
  console.log('3. Using MultiFileProcessor:');
  try {
    const processor = new MultiFileProcessor();

    // Process a single file to demonstrate
    const result = await processor.processFile('./specs/1-phase-5-implementation/spec.md');
    console.log(`   Processed ${result.phaseContext.phaseId} with ${result.requirements.length} requirements`);

    // Show validation summary
    const invalidResults = result.validationResults.filter(v => !v.isValid);
    console.log(`   Validation issues: ${invalidResults.length}`);

    if (invalidResults.length > 0) {
      console.log('   Validation errors:');
      invalidResults.forEach(vr => {
        console.log(`     - ${vr.errors.join(', ')}`);
      });
    }
  } catch (error) {
    console.error('   Error using MultiFileProcessor:', error);
  }

  console.log('\n=== Examples Complete ===');
}

// Run the example
exampleUsage().catch(console.error);