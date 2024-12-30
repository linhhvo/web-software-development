import {z} from 'zod'

const createTodoValidator = z.object({
    name: z.string().min(3).max(30),
    done: z.coerce.boolean().default(false)
});

const updateTodoValidator = createTodoValidator.extend({
    done: z.coerce.boolean()
})
export {createTodoValidator, updateTodoValidator}


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
