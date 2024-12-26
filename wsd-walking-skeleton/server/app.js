import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());


/** Todos exercise **/

let todos = [{
    id: 1,
    name: "Eat cookies",
    done: false,
}];

app.get("/todos", async (c) => {
    return c.json(todos);
});

app.post("/todos", async (c) => {
    const todo = await c.req.json();
    todo.id = todos.length + 1;
    todos.push(todo);
    return c.json(todo);
});

app.delete("/todos/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const deletedTodo = todos.find((todo) => todo.id === id);
    todos = todos.filter((todo) => todo.id !== id);
    return c.json(deletedTodo);
});

app.post('/todos/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const updatedTodo = todos.find((todo) => todo.id === id)
    updatedTodo.done = !updatedTodo.done
    return c.json(updatedTodo)
})

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

// app.get('/books', (c) => c.json ({purpose: "get books"}))
//
// app.post('/books', (c) => c.json({purpose: "add books"}))
//
// app.get('/books/:bookId', (c) => c.json({purpose: `get book with id ${c.req.param('bookId')}`}))
//
// app.delete('/books/:bookId', (c) => c.json({purpose: `delete book with id ${c.req.param('bookId')}`}))
//
// app.get('/books/:bookId/comments', (c) => c.json ({purpose: `get comments for book with id ${c.req.param('bookId')}`}))
//
// app.post('/books/:bookId/comments', (c) => c.json ({purpose: `add comment for book with id ${c.req.param('bookId')}`}))
//
// app.delete('/books/:bookId/comments/:commentId', (c) => c.json (
//     {purpose: `delete comment with id ${c.req.param('commentId')} from book with id ${c.req.param('bookId')}`}))



export default app;


