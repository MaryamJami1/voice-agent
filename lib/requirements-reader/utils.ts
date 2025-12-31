// lib/requirements-reader/utils.ts
// File system utilities for requirements reading functionality

import { promises as fs } from 'fs'
import * as path from 'path'

/**
 * Reads a file and returns its content
 * @param filePath - Path to the file to read
 * @returns Promise with file content or error
 */
export async function readFileContent(
  filePath: string
): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    // Check if file exists
    await fs.access(filePath)

    // Read the file content
    const content = await fs.readFile(filePath, 'utf-8')

    return {
      success: true,
      content,
    }
  } catch (error: any) {
    return {
      success: false,
      error: `Error reading file ${filePath}: ${error.message}`,
    }
  }
}

/**
 * Checks if a file exists
 * @param filePath - Path to the file to check
 * @returns Promise that resolves to true if file exists, false otherwise
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Gets the phase ID from a file path
 * @param filePath - Path to the phase file
 * @returns Extracted phase ID (e.g., "phase1" from "phase1.md")
 */
export function getPhaseIdFromPath(filePath: string): string {
  const fileName = path.basename(filePath)
  const phaseId = fileName.replace(/\.[^/.]+$/, '') // Remove extension
  return phaseId
}

/**
 * Validates if a file is a markdown file
 * @param filePath - Path to the file to validate
 * @returns True if the file has a .md extension, false otherwise
 */
export function isMarkdownFile(filePath: string): boolean {
  return path.extname(filePath).toLowerCase() === '.md'
}

/**
 * Normalizes file path for consistent handling
 * @param filePath - Path to normalize
 * @returns Normalized file path
 */
export function normalizePath(filePath: string): string {
  return path.resolve(filePath)
}
