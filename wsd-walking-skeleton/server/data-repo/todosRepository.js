import postgres from "postgres"

const sql = postgres()

const getTodos = async () => {
    return await sql`SELECT * FROM todos`
}

const createTodo = async (todo) => {
    const result = await sql
        `INSERT INTO todos (name, done)
        VALUES (${todo.name}, ${todo.done})
        RETURNING *`
    return result[0]
}

const getOneTodo = async (id) => {
    const result = await sql`SELECT * FROM todos WHERE id=${id}`
    return result[0]
}

const updateTodo = async (id, todo) => {
    const result = await sql
        `UPDATE todos
        SET name = ${todo.name}, done = ${todo.done}
        WHERE id = ${id}
        RETURNING *`
    return result[0]
}

const deleteTodo = async (id) => {
    const result = await sql
        `DELETE FROM todos
        WHERE id = ${id}
        RETURNING *`
    return result[0]
}

export {getTodos, createTodo, getOneTodo, updateTodo, deleteTodo}