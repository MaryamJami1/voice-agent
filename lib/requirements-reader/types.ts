// lib/requirements-reader/types.ts
// Base types for requirements reading functionality

export interface PhaseRequirement {
  id: string;
  description: string;
  priority: string;
  status: string;
  phase: string;
  sourceFile: string;
}

export interface PhaseContext {
  phaseId: string;
  sourceFile: string;
  createdAt: Date;
  requirementsCount: number;
}

export interface RequirementValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FileReadingResult {
  success: boolean;
  content?: string;
  error?: string;
  phaseContext?: PhaseContext;
  requirements?: PhaseRequirement[];
  validationResults?: RequirementValidationResult[];
}

export interface PhaseRequirements {
  phaseContext: PhaseContext;
  requirements: PhaseRequirement[];
  validationResults: RequirementValidationResult[];
}

/**
 * The structured return format for requirements following the specification
 * This matches the output format defined in the data model
 */
export interface StructuredRequirementsOutput {
  phaseContext: PhaseContext;
  requirements: PhaseRequirement[];
  validationResults: RequirementValidationResult[];
}

/**
 * Represents requirements from multiple phases
 */
export interface MultiPhaseRequirements {
  phaseContexts: PhaseContext[];
  allRequirements: PhaseRequirement[];
  validationSummary: {
    total: number;
    valid: number;
    errors: string[];
  };
}