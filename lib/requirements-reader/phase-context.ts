// lib/requirements-reader/phase-context.ts
// Phase context management functionality

import { PhaseContext, PhaseRequirement } from './types';

/**
 * Manages phase context information
 */
export class PhaseContextManager {
  private contexts: Map<string, PhaseContext> = new Map();

  /**
   * Adds or updates a phase context
   * @param context - The phase context to add or update
   */
  addContext(context: PhaseContext): void {
    this.contexts.set(context.phaseId, context);
  }

  /**
   * Gets a phase context by phase ID
   * @param phaseId - The ID of the phase to retrieve
   * @returns The phase context or undefined if not found
   */
  getContext(phaseId: string): PhaseContext | undefined {
    return this.contexts.get(phaseId);
  }

  /**
   * Removes a phase context
   * @param phaseId - The ID of the phase to remove
   * @returns True if the context was removed, false if it didn't exist
   */
  removeContext(phaseId: string): boolean {
    return this.contexts.delete(phaseId);
  }

  /**
   * Gets all phase contexts
   * @returns Array of all phase contexts
   */
  getAllContexts(): PhaseContext[] {
    return Array.from(this.contexts.values());
  }

  /**
   * Updates the requirements count for a phase
   * @param phaseId - The ID of the phase to update
   * @param count - The new requirements count
   */
  updateRequirementsCount(phaseId: string, count: number): void {
    const context = this.getContext(phaseId);
    if (context) {
      context.requirementsCount = count;
      this.addContext(context); // Update the stored context
    }
  }

  /**
   * Checks if a phase context exists
   * @param phaseId - The ID of the phase to check
   * @returns True if the phase context exists, false otherwise
   */
  hasContext(phaseId: string): boolean {
    return this.contexts.has(phaseId);
  }

  /**
   * Clears all phase contexts
   */
  clear(): void {
    this.contexts.clear();
  }

  /**
   * Gets the count of all managed contexts
   * @returns Number of phase contexts being managed
   */
  size(): number {
    return this.contexts.size;
  }
}

/**
 * Creates a new phase context
 * @param phaseId - The ID of the phase
 * @param sourceFile - The source file for the phase
 * @param requirements - Optional array of requirements to determine count
 * @returns A new PhaseContext object
 */
export function createPhaseContext(phaseId: string, sourceFile: string, requirements?: PhaseRequirement[]): PhaseContext {
  return {
    phaseId,
    sourceFile,
    createdAt: new Date(),
    requirementsCount: requirements ? requirements.length : 0
  };
}

/**
 * Updates an existing phase context with new information
 * @param existingContext - The existing phase context to update
 * @param updates - The updates to apply to the context
 * @returns Updated PhaseContext object
 */
export function updatePhaseContext(existingContext: PhaseContext, updates: Partial<PhaseContext>): PhaseContext {
  return {
    ...existingContext,
    ...updates,
    createdAt: updates.createdAt || existingContext.createdAt
  };
}