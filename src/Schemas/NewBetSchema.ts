import * as z from 'zod';

const GuessSchema = z.object({
  guess: z.number().min(1, 'Guess must be greater than 0'),
  points: z.number().min(0, 'Points cannot be negative'),
});

export const NewBetSchema = z.object({
  Name: z.string().min(3, 'Name must be at least 3 characters'),
  Description: z.string().min(10, 'Description must be at least 10 characters'),
  Participants: z.array(z.string()).min(1, 'At least one participant is required'),
  Conditions: z.array(GuessSchema).optional(),
  EndsIn: z
    .date()
    .nullable()
    .refine((date) => !date || date > new Date(), {
      message: 'Date must be in the future',
    }),
  AddTocalendar: z.boolean(),
  Files: z.array(z.instanceof(File)).optional(),
  Supervisor: z.array(z.string()).optional(),
});

// Infer TypeScript type from schema
export type CreateFormInputs = z.infer<typeof NewBetSchema>;
