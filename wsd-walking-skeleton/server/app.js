import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres"
import {load} from "dotenv"

// import * as todosRepo from "./data-repo/todosRepository.js"
// import {createTodoValidator, updateTodoValidator} from "./validators.js";
// import * as bookRepo from "./data-repo/bookRepository.js";
// import * as itemRepository from "./data-repo/itemRepository.js"
// import {addCount, getCount} from "./data-repo/feedbackRepository.js";
// import {supabase} from "./supabaseClient.js";


const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

/** postgresql deployment **/

const env = await load()

const BANNED_WORDS = [
    "delete", "update", "insert", "drop", "alter", "create",
    "truncate", "replace", "merge", "grant", "revoke",
    "transaction", "commit", "rollback", "savepoint", "lock",
    "execute", "call", "do", "set", "comment"
];

const query = async (query) => {
    // check that the query does not do data manipulation
    for (const word of BANNED_WORDS) {
        if (query.toLowerCase().includes(word)) {
            throw new Error(`You cannot ${word} data`);
        }
    }


    const sql = postgres(env.DATABASE_URL);
    return await sql.unsafe(query);
};

app.get("/*", (c) => {
    return c.html(`
    <html>
      <head>
        <title>Hello, world!</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <p>To use this, make a POST with a JSON document in the request body. The query property of the JSON document will be used to query a database.</p>
        <p>There are no tables though, so you can only do simple queries like "SELECT 1 + 1".</p>
      </body>
    </html>
    `);
});

app.post("/*", async (c) => {
    const body = await c.req.json();
    const result = await query(body.query);
    return c.json({result: result});
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
//     const todos = await todosRepo.getTodos()
//     return c.json(todos);
// });
//
// app.post("/todos", zValidator("json", createTodoValidator), async (c) => {
//     const todo = c.req.valid('json')
//     const newTodo = await todosRepo.createTodo(todo)
//     return c.json(newTodo);
// });
//
// app.get("/todos/:id", async (c) => {
//     const todoId = c.req.param('id')
//     const todo = await todosRepo.getOneTodo(todoId)
//     return c.json(todo)
// })
//
// app.delete("/todos/:id", async (c) => {
//     const todoId = c.req.param('id')
//     const deletedTodo = await todosRepo.deleteTodo(todoId)
//     return c.json(deletedTodo)
// });
//
// app.put('/todos/:id', zValidator('json', updateTodoValidator), async (c) => {
//     const id = c.req.param('id')
//     const newTodo = c.req.valid('json')
//     const updatedTodo = await todosRepo.updateTodo(id, newTodo)
//     return c.json(updatedTodo)
// })

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

// app.get('/books', async (c) => {
//     const books = await bookRepo.readAll()
//     return c.json(books)
// })
//
// app.post('/books', async (c) => {
//     const book = await c.req.json()
//     const newBook = await bookRepo.create(book)
//     return c.json(newBook)
// })
//
// app.get('/books/:bookId', async (c) => {
//     const book = await bookRepo.readOne(c.req.param('bookId'))
//     return c.json(book)
// })
//
// app.put('/books/:bookId', async (c) => {
//     const newBook = await c.req.json()
//     const updatedBook = await bookRepo.update(c.req.param('bookId'), newBook)
//     return c.json(updatedBook)
// })
//
// app.delete('/books/:bookId', async (c) => {
//     const deletedBook = await bookRepo.remove(c.req.param('bookId'))
//     return c.json(deletedBook)
// })

// app.get('/books/:bookId/comments', (c) => c.json ({purpose: `get comments for book with id ${c.req.param('bookId')}`}))
//
// app.post('/books/:bookId/comments', (c) => c.json ({purpose: `add comment for book with id ${c.req.param('bookId')}`}))
//
// app.delete('/books/:bookId/comments/:commentId', (c) => c.json (
//     {purpose: `delete comment with id ${c.req.param('commentId')} from book with id ${c.req.param('bookId')}`}))



export default app;


