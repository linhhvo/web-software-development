import { z } from 'zod';

const bookValidator = z.object({
  title: z.string().min(1),
  year : z.coerce.number().min(-500).max(2050)
});

const ratingValidator = z.object({
  rating  : z.coerce.number().min(1).max(5),
  feedback: z.string()
});

export { bookValidator, ratingValidator };

// const createTodoValidator = z.object({
//     name: z.string().min(3).max(30),
//     done: z.coerce.boolean().default(false)
// });
//
// const updateTodoValidator = createTodoValidator.extend({
//     done: z.coerce.boolean()
// })
// export {createTodoValidator, updateTodoValidator}


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
