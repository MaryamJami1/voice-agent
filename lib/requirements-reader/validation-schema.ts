// lib/requirements-reader/validation-schema.ts
// Validation schema for requirements format

import { PhaseRequirement } from './types';

/**
 * Validates a single requirement against the expected format
 * @param requirement - The requirement to validate
 * @returns Validation result with errors and warnings
 */
export function validateRequirement(requirement: PhaseRequirement) {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate ID format (should be like FR-XXX or SC-XXX)
  if (!requirement.id || typeof requirement.id !== 'string') {
    errors.push(`Requirement ID is missing or not a string: ${requirement.id}`);
  } else if (!/^(FR|SC)-\d+$/.test(requirement.id)) {
    warnings.push(`Requirement ID "${requirement.id}" doesn't follow standard format (e.g., FR-001, SC-001)`);
  }

  // Validate description
  if (!requirement.description || typeof requirement.description !== 'string' || requirement.description.trim() === '') {
    errors.push(`Requirement "${requirement.id}" has no description or description is empty`);
  }

  // Validate priority
  if (!requirement.priority || typeof requirement.priority !== 'string') {
    errors.push(`Requirement "${requirement.id}" has no priority or priority is not a string`);
  } else if (!['P1', 'P2', 'P3', 'P4', 'P5'].includes(requirement.priority)) {
    warnings.push(`Requirement "${requirement.id}" has non-standard priority: ${requirement.priority}`);
  }

  // Validate status
  if (!requirement.status || typeof requirement.status !== 'string') {
    errors.push(`Requirement "${requirement.id}" has no status or status is not a string`);
  }

  // Validate phase
  if (!requirement.phase || typeof requirement.phase !== 'string') {
    errors.push(`Requirement "${requirement.id}" has no phase or phase is not a string`);
  }

  // Validate sourceFile
  if (!requirement.sourceFile || typeof requirement.sourceFile !== 'string') {
    errors.push(`Requirement "${requirement.id}" has no sourceFile or sourceFile is not a string`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates an array of requirements
 * @param requirements - Array of requirements to validate
 * @returns Array of validation results for each requirement
 */
export function validateRequirements(requirements: PhaseRequirement[]) {
  return requirements.map(req => validateRequirement(req));
}

/**
 * Validates the overall structure of requirements data
 * @param requirements - Array of requirements to validate
 * @param phaseContext - Phase context to validate
 * @returns Overall validation result
 */
export function validateRequirementsStructure(requirements: PhaseRequirement[], phaseContext?: any) {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate phase context if provided
  if (phaseContext) {
    if (!phaseContext.phaseId) {
      errors.push('Phase context is missing phaseId');
    }
    if (!phaseContext.sourceFile) {
      errors.push('Phase context is missing sourceFile');
    }
    if (!phaseContext.requirementsCount && phaseContext.requirementsCount !== 0) {
      errors.push('Phase context is missing requirementsCount');
    }
  }

  // Validate requirements array
  if (!Array.isArray(requirements)) {
    errors.push('Requirements must be an array');
  } else {
    // Check for duplicate IDs
    const ids = requirements.map(req => req.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      errors.push(`Duplicate requirement IDs found: ${duplicates.join(', ')}`);
    }

    // Validate each requirement
    for (const req of requirements) {
      const result = validateRequirement(req);
      errors.push(...result.errors);
      warnings.push(...result.warnings);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Defines the expected schema for requirements in phase.md files
 */
export const REQUIREMENTS_SCHEMA = {
  requirement: {
    id: { type: 'string', required: true, pattern: '^(FR|SC)-\\d+$' },
    description: { type: 'string', required: true, minLength: 1 },
    priority: { type: 'string', required: true, enum: ['P1', 'P2', 'P3', 'P4', 'P5'] },
    status: { type: 'string', required: true },
    phase: { type: 'string', required: true },
    sourceFile: { type: 'string', required: true }
  },
  phaseContext: {
    phaseId: { type: 'string', required: true },
    sourceFile: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    requirementsCount: { type: 'number', required: true }
  }
};