import * as z from 'zod';

export const NewBetSchema = z.object({});

// Infer TypeScript type from schema
export type CreateFormInputs = z.infer<typeof NewBetSchema>;
