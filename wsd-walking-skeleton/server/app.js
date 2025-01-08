import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from 'scrypt';
// import * as itemRepository from "./data-repo/itemRepository.js"
// import {addCount, getCount} from "./data-repo/feedbackRepository.js";
// import {supabase} from "./supabaseClient.js";
// import * as bookController from "./books-exercises/bookController.js";
// import * as ratingController from "./books-exercises/ratingController.js";


const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

/** authentication and authorization example **/
app.post("/api/auth/register", async (c) => {
  const data = await c.req.json();
  try {
    const result = await sql`INSERT INTO users (email, password_hash)
                             VALUES (${data.email.trim().toLowerCase()},
                                     ${hash(data.password.trim())}) RETURNING *`;
    return c.json({"message": `Confirmation email sent to address ${data.email.trim().toLowerCase()}.`});
  }
  catch (error) {
    return c.json({"message": `Confirmation email sent to address ${data.email.trim().toLowerCase()}.`});
  }
});

app.post("/api/auth/login", async (c) => {
  const data = await c.req.json();
  const result = await sql`SELECT *
                           FROM users
                           WHERE email = ${data.email.trim().toLowerCase()}`;

  if (result.length === 0) {
    c.status(401);
    return c.json({
      "message": "Invalid email or password!"
    });
  }

  const user = result[0];
  const passwordValid = verify(data.password.trim(), user.password_hash);
  if (passwordValid) {
    return c.json({
      "message": `Logged in as user with id ${user.id}`
    });
  }
  else {
    c.status(401);
    return c.json({
      "message": "Invalid email or password!"
    });
  }
});


/** feedback deno kv exercise **/

// app.get('/feedbacks/:value', async (c) => {
//     const count = await getCount(c.req.param('value'))
//     return c.json({count: count})
// })
//
// app.post('/feedbacks/:value', async (c) => {
//     const count = await addCount(c.req.param('value'))
//     return c.json({count: count})
// })

/** Deno KV example **/

// app.get("/item", async (c) => {
//     return c.json({ item: await itemRepository.getItem() });
// });
//
// app.post("/item", async (c) => {
//     const data = await c.req.json();
//     await itemRepository.setItem(data.item);
//     return c.json({ item: await itemRepository.getItem() });
// });

/** validator example **/
// const emailValidator = z.object({
//     email: z.string().email(),
//     name: z.string().length(5, {message: "string length must be 5"}),
//     date: z.coerce.date()
// });
//
// app.post("/emails", zValidator("json", emailValidator), (c) => {
//     const data = c.req.valid("json");
//     return c.json(data);
// });


/** Todos exercise **/

// app.get("/todos", async (c) => {
//   const todos = await todosRepo.getTodos();
//   return c.json(todos);
// });
//
// app.post("/todos", zValidator("json", validators.createTodoValidator), async (c) => {
//   const todo = c.req.valid('json');
//   const newTodo = await todosRepo.createTodo(todo);
//   return c.json(newTodo);
// });
//
// app.get("/todos/:id", async (c) => {
//   const todoId = c.req.param('id');
//   const todo = await todosRepo.getOneTodo(todoId);
//   return c.json(todo);
// });
//
// app.delete("/todos/:id", async (c) => {
//   const todoId = c.req.param('id');
//   const deletedTodo = await todosRepo.deleteTodo(todoId);
//   return c.json(deletedTodo);
// });

// app.put('/todos/:id', zValidator('json', validators.updateTodoValidator), async (c) => {
//   const id = c.req.param('id');
//   const newTodo = c.req.valid('json');
//   const updatedTodo = await todosRepo.updateTodo(id, newTodo);
//   return c.json(updatedTodo);
// });

// app.put('/todos/:id', async (c) => {
//   const id = c.req.param('id');
//   const updatedTodo = await todosRepo.updateTodo(id);
//   return c.json(updatedTodo);
// });

/** Pokemon cards exercise **/

// let cards = [];
//
// app.get("/cards", (c) => c.json({ cards }));
//
// app.post("/cards", async (c) =>  {
//     const body = await c.req.json();
//     cards.push(body);
//     return c.json({ cards });
// });
//
// app.delete("/cards/:id", (c) => {
//     const cardId = c.req.param('id')
//     cards = cards.filter((card) => card.id !== cardId);
//     return c.json({ cards });
// });


/** Error example **/

// app.get("/:id", async (c) => {
//     const id = c.req.param("id");
//     if (id === "1") {
//         await new Promise((res) => setTimeout(res, 60 * 1000));
//     } else if (id === "2") {
//         throw new Error("Oops, something failed on the server.");
//     }
//
//     return c.json({ message: `Hello ${id}` });
// });


/** books exercise **/

// app.get('/books', bookController.getBooks);
// app.post('/books', ...bookController.createBook);
// app.get('/books/:bookId', bookController.getBook);
// app.put('/books/:bookId', ...bookController.updateBook);
// app.delete('/books/:bookId', bookController.deleteBook);
//
// app.get('/books/:bookId/ratings', ratingController.getRatings);
// app.get('/books/:bookId/ratings/:ratingId', ratingController.getOneRating);
// app.post('/books/:bookId/ratings', ...ratingController.addRating);
// app.put('/books/:bookId/ratings/:ratingId', ...ratingController.updateRating);
// app.delete('/books/:bookId/ratings/:ratingId', ratingController.deleteRating);


export default app;


