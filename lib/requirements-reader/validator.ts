// lib/requirements-reader/validator.ts
// Format validation logic for requirements

import { PhaseRequirement, RequirementValidationResult, PhaseRequirements } from './types'
import { ValidationError, RequirementsReaderError } from './errors'
import {
  validateRequirements,
  validateRequirementsStructure,
  REQUIREMENTS_SCHEMA,
} from './validation-schema'

/**
 * Validates the format of requirements
 * @param requirements - Array of requirements to validate
 * @returns Promise with validation results for each requirement
 */
export async function validateRequirementsFormat(
  requirements: PhaseRequirement[]
): Promise<RequirementValidationResult[]> {
  try {
    // Validate each requirement individually
    const validationResults = validateRequirements(requirements)

    return validationResults
  } catch (error: any) {
    throw new ValidationError(`Error validating requirements format: ${error.message}`)
  }
}

/**
 * Validates the overall structure of requirements data
 * @param phaseRequirements - Phase requirements to validate
 * @returns Promise with overall validation result
 */
export async function validatePhaseRequirementsStructure(
  phaseRequirements: PhaseRequirements
): Promise<RequirementValidationResult> {
  try {
    const result = validateRequirementsStructure(
      phaseRequirements.requirements,
      phaseRequirements.phaseContext
    )

    return {
      isValid: result.isValid,
      errors: result.errors,
      warnings: result.warnings,
    }
  } catch (error: any) {
    throw new ValidationError(`Error validating phase requirements structure: ${error.message}`)
  }
}

/**
 * Performs comprehensive validation on requirements
 * @param requirements - Array of requirements to validate
 * @param phaseRequirements - Optional phase requirements to validate structure
 * @returns Promise with comprehensive validation results
 */
export async function comprehensiveValidate(
  requirements: PhaseRequirement[],
  phaseRequirements?: PhaseRequirements
): Promise<RequirementValidationResult[]> {
  try {
    // Validate individual requirements
    const individualResults = await validateRequirementsFormat(requirements)

    // If phase requirements are provided, validate the structure as well
    if (phaseRequirements) {
      const structureResult = await validatePhaseRequirementsStructure(phaseRequirements)

      // Combine results
      return [...individualResults, structureResult]
    }

    return individualResults
  } catch (error: any) {
    throw new ValidationError(`Error in comprehensive validation: ${error.message}`)
  }
}

/**
 * Validates requirements against the expected schema
 * @param data - Data to validate against the schema
 * @returns Validation result
 */
export function validateAgainstSchema(data: any): RequirementValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // This is a simplified schema validation
  // In a real implementation, you might use a library like Joi or Zod
  if (!data || typeof data !== 'object') {
    errors.push('Data must be an object')
    return {
      isValid: false,
      errors,
      warnings,
    }
  }

  // Validate requirements array
  if (!Array.isArray(data.requirements)) {
    errors.push('Requirements must be an array')
  } else {
    for (let i = 0; i < data.requirements.length; i++) {
      const req = data.requirements[i]
      if (!req || typeof req !== 'object') {
        errors.push(`Requirement at index ${i} must be an object`)
        continue
      }

      // Validate required fields
      if (!req.id) errors.push(`Requirement at index ${i} is missing id`)
      if (!req.description) errors.push(`Requirement at index ${i} is missing description`)
      if (!req.priority) errors.push(`Requirement at index ${i} is missing priority`)
      if (!req.status) errors.push(`Requirement at index ${i} is missing status`)
      if (!req.phase) errors.push(`Requirement at index ${i} is missing phase`)
      if (!req.sourceFile) errors.push(`Requirement at index ${i} is missing sourceFile`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}
