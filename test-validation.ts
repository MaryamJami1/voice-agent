// test-validation.ts
// Quick validation test for the requirements reader implementation

import { readRequirements, readRequirementsFromMultipleFiles, MultiFileProcessor } from './lib/requirements-reader';

async function validateImplementation() {
  console.log('Validating Requirements Reader Implementation...\n');

  // Test 1: Check if basic functionality works
  console.log('1. Testing basic functionality...');
  try {
    // Try to read the spec file for Phase 5 as a test
    const result = await readRequirements('./specs/1-phase-5-implementation/spec.md');
    console.log(`   ✓ Successfully read requirements: ${result.requirements.length} found`);
    console.log(`   ✓ Phase: ${result.phaseContext.phaseId}`);
    console.log(`   ✓ Validation results: ${result.validationResults.length}`);
  } catch (error) {
    console.log(`   ✗ Error in basic functionality: ${error}`);
  }

  console.log('');

  // Test 2: Check multiple file functionality
  console.log('2. Testing multiple file functionality...');
  try {
    const results = await readRequirementsFromMultipleFiles([
      './specs/1-phase-5-implementation/spec.md'
    ]);
    console.log(`   ✓ Successfully processed ${results.length} files`);
    results.forEach((result, index) => {
      console.log(`   ✓ File ${index + 1}: ${result.requirements.length} requirements`);
    });
  } catch (error) {
    console.log(`   ✗ Error in multiple file functionality: ${error}`);
  }

  console.log('');

  // Test 3: Check MultiFileProcessor
  console.log('3. Testing MultiFileProcessor...');
  try {
    const processor = new MultiFileProcessor();
    const result = await processor.processFile('./specs/1-phase-5-implementation/spec.md');
    console.log(`   ✓ MultiFileProcessor processed file: ${result.requirements.length} requirements`);
  } catch (error) {
    console.log(`   ✗ Error in MultiFileProcessor: ${error}`);
  }

  console.log('\nValidation complete!');
}

// Run the validation
validateImplementation().catch(console.error);