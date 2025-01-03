import { z } from 'zod';

export const bookValidator = z.object({
  title: z.string().min(1),
  year : z.coerce.number().min(-500).max(2050)
});

export const ratingValidator = z.object({
  rating  : z.coerce.number().min(1).max(5),
  feedback: z.string()
});


export const createTodoValidator = z.object({
  name: z.string().min(3).max(30),
  done: z.coerce.boolean().default(false)
});

export const updateTodoValidator = createTodoValidator.extend({
  done: z.coerce.boolean()
});


// const todoValidator = z.object({
//     name: z.string().min(1).max(200),
//     done: z.coerce.boolean().default(false)
// }); // implement
//
// const retainRelevant = (obj) => {
//     const result = todoValidator.safeParse(obj)
//     if (!result.success) {
//         throw new Error()
//     }
//
//     return result.data
// };
