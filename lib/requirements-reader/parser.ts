// lib/requirements-reader/parser.ts
// Markdown parsing logic for requirements extraction

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { PhaseRequirement } from './types';
import { ParseError } from './errors';
import * as path from 'path';

/**
 * Parses requirements from markdown content
 * @param content - Markdown content to parse
 * @param sourceFile - Source file path for reference
 * @returns Array of extracted requirements
 */
export async function parseRequirementsFromMarkdown(content: string, sourceFile: string): Promise<PhaseRequirement[]> {
  try {
    // Extract requirements using regex patterns
    const requirements: PhaseRequirement[] = [];

    // Pattern to match requirements like "- **FR-XXX**: [Requirement text]"
    const requirementPattern = /-\s*\*\*([A-Z]+-\d+)\*\*:\s*(.*?)(?=\n-\s*\*\*|$)/gm;
    let match;

    while ((match = requirementPattern.exec(content)) !== null) {
      const id = match[1].trim(); // e.g., "FR-001"
      const description = match[2].trim();

      // Determine priority based on requirement ID pattern
      let priority = 'P3'; // Default priority
      if (id.includes('P1') || id.includes('PRIORITY1')) {
        priority = 'P1';
      } else if (id.includes('P2') || id.includes('PRIORITY2')) {
        priority = 'P2';
      }

      // Determine type (Functional Requirement vs Success Criteria) to set status
      let status = 'draft';
      if (id.startsWith('FR-')) {
        status = 'functional';
      } else if (id.startsWith('SC-')) {
        status = 'success-criteria';
      }

      requirements.push({
        id,
        description,
        priority,
        status,
        phase: path.basename(sourceFile, '.md'), // Use phase ID from filename
        sourceFile
      });
    }

    return requirements;
  } catch (error: any) {
    throw new ParseError(`Failed to parse requirements from markdown: ${error.message}`);
  }
}

/**
 * Extracts phase ID from markdown content
 * @param content - Markdown content to analyze
 * @param sourceFile - Source file path
 * @returns Phase ID extracted from the content
 */
export function extractPhaseId(content: string, sourceFile: string): string {
  // Try to extract phase ID from the first heading
  const headingMatch = content.match(/^#.*?(Phase\s*\d+|\d+\s*[-_]\s*[a-zA-Z]+)/i);
  if (headingMatch) {
    return headingMatch[1].replace(/\s+/g, '-').toLowerCase();
  }

  // Fallback to extracting from filename
  return path.basename(sourceFile, '.md');
}

/**
 * Validates the markdown structure for requirements
 * @param content - Markdown content to validate
 * @returns True if the structure appears valid for requirements, false otherwise
 */
export function validateMarkdownStructure(content: string): boolean {
  // Check if content has the expected structure with Requirements section
  const hasRequirementsSection = /##\s*Requirements/i.test(content);
  const hasFunctionalRequirements = /###\s*Functional\s*Requirements/i.test(content);
  const hasRequirementsPattern = /-\s*\*\*[A-Z]+-\d+\*\*:\s*/.test(content);

  return hasRequirementsSection || hasFunctionalRequirements || hasRequirementsPattern;
}