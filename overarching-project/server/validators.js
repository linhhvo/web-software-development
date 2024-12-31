import { z } from 'zod';

export const courseValidator = z.object({
  name: z.string().min(3)
});

export const questionValidator = z.object({
  title: z.string().min(3),
  text : z.string().min(3)
});
