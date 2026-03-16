'use server';
/**
 * @fileOverview A Genkit flow for analyzing a codebase and generating a SYSTEM_ARCHITECTURE.md document.
 *
 * - generateSystemArchitectureDocument - A function that handles the codebase analysis and document generation.
 * - CodebaseInput - The input type for the generateSystemArchitectureDocument function.
 * - SystemArchitectureDocumentOutput - The return type for the generateSystemArchitectureDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CodebaseInputSchema = z.array(
  z.object({
    filePath: z.string().describe('The relative path to the file.'),
    content: z.string().describe('The content of the file.'),
  })
);
export type CodebaseInput = z.infer<typeof CodebaseInputSchema>;

// Intermediate schema for the AI's structured analysis output
const AnalysisResultSchema = z.object({
  executiveIntent: z
    .string()
    .describe('A 2-sentence summary of the product\'s primary value proposition.'),
  modularBlueprint: z
    .array(
      z.object({
        moduleName: z.string().describe('The name of the core module.'),
        contractualResponsibilities: z
          .string()
          .describe('A description of the module\'s contractual responsibilities.'),
      })
    )
    .describe('A list of core modules and their "Contractual Responsibilities."'),
  reasoningTrace: z
    .string()
    .describe(
      'An explanation of one complex logic flow (e.g., how an Exception travels through the middleware).'
    ),
  antiSlopAudit: z
    .array(z.string())
    .describe(
      'Identify three areas where the code could be more modular or automated, acting as "Risk Mitigation" tasks.'
    ),
});
type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

const SystemArchitectureDocumentOutputSchema = z.string().describe('The generated SYSTEM_ARCHITECTURE.md document content.');
export type SystemArchitectureDocumentOutput = z.infer<typeof SystemArchitectureDocumentOutputSchema>;

export async function generateSystemArchitectureDocument(
  input: CodebaseInput
): Promise<SystemArchitectureDocumentOutput> {
  return generateSystemArchitectureDocumentFlow(input);
}

const analyzeCodebasePrompt = ai.definePrompt({
  name: 'analyzeCodebasePrompt',
  input: { schema: CodebaseInputSchema },
  output: { schema: AnalysisResultSchema },
  prompt: `As "The Codebase Anthropologist", your mission is to perform a deep-tissue analysis of the provided software project to uncover its "Semantic Intent." You will not simply summarize code; you will explain the architectural philosophy, state management, and modular boundaries that a standard LLM summary would miss.

Core Principles (Anti-AI-Slop Manifesto):
- Zero Redundancy: Never say "This function is used to..." or "This class defines..." Assume the reader can read the provided code.
- Semantic Focus: Explain why a specific design pattern was chosen (e.g., "Uses a Registry pattern to decouple Agent tools from the Logic Loop").
- High-Density Information: Prioritize "Systems Thinking." Map out how data flows across module boundaries.
- Verifiable Tasks: If the code has technical debt or broken modularity, call it out as a "Risk Mitigation" task.

Analysis Framework:
Process the provided codebase in three internal reasoning steps:
Step 1: Structural Inference. Identify the "Entry Point" and the "Core Engine." How do these components talk to each other?
Step 2: Logic Decomposition. Break down high-level objectives into the "Jobs-to-be-Done" by the code.
Step 3: Documentation Synthesis. Generate a structured analysis conforming to the specified JSON output schema.

Based on the codebase files provided below, generate a comprehensive analysis in JSON format, directly matching the 'AnalysisResultSchema' described to you.

Codebase Files:
{{#each this}}
--- File: {{{filePath}}} ---
\`\`\`
{{{content}}}
\`\`\`
{{/each}}
`,
});

const generateSystemArchitectureDocumentFlow = ai.defineFlow(
  {
    name: 'generateSystemArchitectureDocumentFlow',
    inputSchema: CodebaseInputSchema,
    outputSchema: SystemArchitectureDocumentOutputSchema,
  },
  async (codebaseFiles) => {
    const { output } = await analyzeCodebasePrompt(codebaseFiles);

    if (!output) {
      throw new Error('Failed to get analysis output from prompt.');
    }

    const analysisResult: AnalysisResult = output;

    // Format the JSON analysis into a Markdown document
    const markdownOutput = `# SYSTEM_ARCHITECTURE.md

## Executive Intent
${analysisResult.executiveIntent}

## The Modular Blueprint
${analysisResult.modularBlueprint
  .map(
    (module) =>
      `### ${module.moduleName}
- Contractual Responsibilities: ${module.contractualResponsibilities}`
  )
  .join('\n\n')}

## The Reasoning Trace
${analysisResult.reasoningTrace}

## Anti-Slop Audit
${analysisResult.antiSlopAudit.map((item) => `- ${item}`).join('\n')}
`;

    return markdownOutput;
  }
);
