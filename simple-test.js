// simple-test.js
// Simple test to validate the requirements reader functionality

const { readRequirements } = require('./dist/lib/requirements-reader')

async function simpleTest() {
  console.log('Testing requirements reader functionality...')

  try {
    // Try to read the spec file for Phase 5
    const result = await readRequirements('./specs/1-phase-5-implementation/spec.md')
    console.log('✓ Successfully read requirements')
    console.log(`✓ Found ${result.requirements.length} requirements`)
    console.log(`✓ Phase: ${result.phaseContext.phaseId}`)
  } catch (error) {
    console.log('✗ Error:', error.message)
  }
}

simpleTest().catch(console.error)
