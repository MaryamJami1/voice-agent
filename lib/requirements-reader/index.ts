// lib/requirements-reader/index.ts
// Main requirements reading functionality

import { readPhaseRequirements, readMultiplePhaseRequirements, createPhaseRequirements } from './reader';
import { comprehensiveValidate } from './validator';
import { PhaseRequirements, FileReadingResult, RequirementValidationResult } from './types';
import { RequirementsReaderError } from './errors';

/**
 * Main function to read requirements from a phase.md file
 * @param filePath - Path to the phase.md file to read
 * @returns Promise with PhaseRequirements object
 * @throws RequirementsReaderError if there's an error reading or processing the file
 */
export async function readRequirements(filePath: string): Promise<PhaseRequirements> {
  try {
    // Read the phase requirements
    const fileResult: FileReadingResult = await readPhaseRequirements(filePath);

    if (!fileResult.success) {
      throw new RequirementsReaderError(
        `Failed to read requirements from ${filePath}: ${fileResult.error}`,
        'FILE_READ_ERROR'
      );
    }

    // Create the PhaseRequirements object
    const phaseRequirements = createPhaseRequirements(fileResult);

    if (!phaseRequirements) {
      throw new RequirementsReaderError(
        `Failed to create PhaseRequirements object from file result`,
        'PROCESSING_ERROR'
      );
    }

    // Validate the requirements format
    const validationResults = await comprehensiveValidate(
      phaseRequirements.requirements,
      phaseRequirements
    );

    // Update the validation results in the phase requirements
    phaseRequirements.validationResults = validationResults;

    return phaseRequirements;
  } catch (error) {
    if (error instanceof RequirementsReaderError) {
      throw error;
    }

    throw new RequirementsReaderError(
      `Unexpected error reading requirements from ${filePath}: ${error}`,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Reads requirements from multiple phase.md files
 * @param filePaths - Array of paths to phase.md files to read
 * @returns Promise with array of PhaseRequirements objects
 * @throws RequirementsReaderError if there's an error reading or processing any file
 */
export async function readRequirementsFromMultipleFiles(filePaths: string[]): Promise<PhaseRequirements[]> {
  try {
    // Read multiple phase requirements
    const fileResults = await readMultiplePhaseRequirements(filePaths);

    const phaseRequirementsArray: PhaseRequirements[] = [];

    for (const fileResult of fileResults) {
      if (fileResult.success) {
        const phaseRequirements = createPhaseRequirements(fileResult);
        if (phaseRequirements) {
          // Validate the requirements format
          const validationResults = await comprehensiveValidate(
            phaseRequirements.requirements,
            phaseRequirements
          );

          // Update the validation results in the phase requirements
          phaseRequirements.validationResults = validationResults;

          phaseRequirementsArray.push(phaseRequirements);
        }
      }
    }

    return phaseRequirementsArray;
  } catch (error) {
    throw new RequirementsReaderError(
      `Error reading requirements from multiple files: ${error}`,
      'MULTIPLE_FILE_READ_ERROR'
    );
  }
}

// Export types for convenience
export * from './types';
export * from './errors';
export * from './validator';
export * from './phase-context';
export * from './multi-file-processor';