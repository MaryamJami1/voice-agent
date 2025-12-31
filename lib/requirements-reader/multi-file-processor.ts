// lib/requirements-reader/multi-file-processor.ts
// Multiple file processing functionality

import { readRequirements } from './index'
import { PhaseRequirements, PhaseRequirement } from './types'
import { PhaseContextManager } from './phase-context'
import { RequirementsReaderError } from './errors'

/**
 * Processes multiple phase.md files and manages their contexts
 */
export class MultiFileProcessor {
  private contextManager: PhaseContextManager

  constructor() {
    this.contextManager = new PhaseContextManager()
  }

  /**
   * Processes a single phase.md file
   * @param filePath - Path to the phase.md file to process
   * @returns Promise with PhaseRequirements object
   */
  async processFile(filePath: string): Promise<PhaseRequirements> {
    try {
      // Read requirements from the file
      const phaseRequirements = await readRequirements(filePath)

      // Add the context to the manager
      this.contextManager.addContext(phaseRequirements.phaseContext)

      return phaseRequirements
    } catch (error) {
      throw new RequirementsReaderError(
        `Error processing file ${filePath}: ${error}`,
        'MULTI_FILE_PROCESS_ERROR'
      )
    }
  }

  /**
   * Processes multiple phase.md files
   * @param filePaths - Array of paths to phase.md files to process
   * @returns Promise with array of PhaseRequirements objects
   */
  async processMultipleFiles(filePaths: string[]): Promise<PhaseRequirements[]> {
    const results: PhaseRequirements[] = []

    // Process each file sequentially to maintain order and handle errors properly
    for (const filePath of filePaths) {
      try {
        const result = await this.processFile(filePath)
        results.push(result)
      } catch (error) {
        // Log the error but continue processing other files
        console.error(`Error processing file ${filePath}:`, error)
        // We could also collect errors and return them separately if needed
      }
    }

    return results
  }

  /**
   * Gets all processed phase contexts
   * @returns Array of all phase contexts that have been processed
   */
  getAllPhaseContexts(): import('./types').PhaseContext[] {
    return this.contextManager.getAllContexts()
  }

  /**
   * Gets requirements for a specific phase
   * @param phaseId - ID of the phase to get requirements for
   * @returns Array of requirements for the specified phase, or empty array if not found
   */
  getRequirementsForPhase(phaseId: string): PhaseRequirement[] {
    const context = this.contextManager.getContext(phaseId)
    if (!context) {
      return []
    }

    // In a real implementation, we would need to store the requirements by phase
    // For now, this would require a more complex storage mechanism
    // This is a simplified version that just returns an empty array
    return []
  }

  /**
   * Gets all requirements across all processed phases
   * @returns Array of all requirements from all processed phases
   */
  getAllRequirements(): PhaseRequirement[] {
    // In a real implementation, we would need to store all requirements
    // For now, this returns an empty array since we don't have a storage mechanism
    return []
  }

  /**
   * Resets the processor, clearing all stored contexts
   */
  reset(): void {
    this.contextManager.clear()
  }

  /**
   * Gets the phase context manager instance
   * @returns The PhaseContextManager instance
   */
  getContextManager(): PhaseContextManager {
    return this.contextManager
  }
}

/**
 * Convenience function to process multiple files without creating a class instance
 * @param filePaths - Array of paths to phase.md files to process
 * @returns Promise with array of PhaseRequirements objects
 */
export async function processMultiplePhaseFiles(filePaths: string[]): Promise<PhaseRequirements[]> {
  const processor = new MultiFileProcessor()
  return await processor.processMultipleFiles(filePaths)
}

/**
 * Combines requirements from multiple phases into a single structure
 * @param phaseRequirementsArray - Array of PhaseRequirements objects to combine
 * @returns Combined requirements with phase identification maintained
 */
export function combinePhaseRequirements(phaseRequirementsArray: PhaseRequirements[]): {
  allRequirements: PhaseRequirement[]
  phaseContexts: import('./types').PhaseContext[]
  validationSummary: { total: number; valid: number; errors: string[] }
} {
  const allRequirements: PhaseRequirement[] = []
  const phaseContexts: import('./types').PhaseContext[] = []
  const allErrors: string[] = []

  let validCount = 0

  for (const phaseReq of phaseRequirementsArray) {
    // Add requirements with phase identification
    const requirementsWithPhase = phaseReq.requirements.map((req) => ({
      ...req,
      phase: phaseReq.phaseContext.phaseId, // Ensure phase is set correctly
    }))

    allRequirements.push(...requirementsWithPhase)
    phaseContexts.push(phaseReq.phaseContext)

    // Count valid requirements and collect errors
    for (const validation of phaseReq.validationResults) {
      if (validation.isValid) {
        validCount++
      } else {
        allErrors.push(...validation.errors)
      }
    }
  }

  return {
    allRequirements,
    phaseContexts,
    validationSummary: {
      total: phaseRequirementsArray.length,
      valid: validCount,
      errors: allErrors,
    },
  }
}
