'use server';

import { generateSystemArchitectureDocument, CodebaseInput } from '@/ai/flows/generate-system-architecture-document';

export async function analyzeCodebase(input: CodebaseInput) {
  try {
    const markdown = await generateSystemArchitectureDocument(input);
    return { success: true, markdown };
  } catch (error) {
    console.error('Analysis failed:', error);
    return { success: false, error: 'Failed to analyze codebase. Please ensure the input format is correct.' };
  }
}
