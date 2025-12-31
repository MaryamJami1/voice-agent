// lib/requirements-reader/reader.ts
// File reading functionality for requirements

import { readFileContent, getPhaseIdFromPath } from './utils';
import { parseRequirementsFromMarkdown, extractPhaseId } from './parser';
import { PhaseContext, FileReadingResult, PhaseRequirements } from './types';
import { FileNotFoundError, FileReadError } from './errors';

/**
 * Reads and processes a single phase.md file
 * @param filePath - Path to the phase.md file to read
 * @returns Promise with FileReadingResult containing requirements and context
 */
export async function readPhaseRequirements(filePath: string): Promise<FileReadingResult> {
  try {
    // First, read the file content
    const readResult = await readFileContent(filePath);

    if (!readResult.success) {
      return {
        success: false,
        error: readResult.error
      };
    }

    const content = readResult.content!;

    // Check for empty file
    if (!content || content.trim() === '') {
      return {
        success: false,
        error: `File is empty: ${filePath}`
      };
    }

    // Create phase context
    const phaseId = getPhaseIdFromPath(filePath);
    const phaseContext: PhaseContext = {
      phaseId,
      sourceFile: filePath,
      createdAt: new Date(),
      requirementsCount: 0
    };

    // Parse requirements from the content
    const requirements = await parseRequirementsFromMarkdown(content, filePath);

    // Update phase context with requirements count
    phaseContext.requirementsCount = requirements.length;

    return {
      success: true,
      content,
      phaseContext,
      requirements
    };
  } catch (error: any) {
    // Handle specific error types
    if (error.code === 'ENOENT') {
      return {
        success: false,
        error: `File not found: ${filePath}`
      };
    } else if (error.code === 'EACCES') {
      return {
        success: false,
        error: `Permission denied reading file: ${filePath}`
      };
    } else if (error.code === 'EISDIR') {
      return {
        success: false,
        error: `Path is a directory, not a file: ${filePath}`
      };
    }

    return {
      success: false,
      error: `Error reading phase requirements from ${filePath}: ${error.message}`
    };
  }
}

/**
 * Reads and processes multiple phase.md files
 * @param filePaths - Array of paths to phase.md files to read
 * @returns Promise with array of FileReadingResult for each file
 */
export async function readMultiplePhaseRequirements(filePaths: string[]): Promise<FileReadingResult[]> {
  const results: FileReadingResult[] = [];

  for (const filePath of filePaths) {
    const result = await readPhaseRequirements(filePath);
    results.push(result);
  }

  return results;
}

/**
 * Creates a PhaseRequirements object from file reading results
 * @param fileResult - The FileReadingResult to convert
 * @returns PhaseRequirements object with validation results
 */
export function createPhaseRequirements(fileResult: FileReadingResult): PhaseRequirements | null {
  if (!fileResult.success || !fileResult.phaseContext || !fileResult.requirements) {
    return null;
  }

  // For now, return with empty validation results
  // Validation will be handled in the validator module
  return {
    phaseContext: fileResult.phaseContext,
    requirements: fileResult.requirements,
    validationResults: []
  };
}