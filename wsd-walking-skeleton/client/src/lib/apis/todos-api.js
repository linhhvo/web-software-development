import { PUBLIC_API_URL } from "$env/static/public";

const createTodo = async (name, done) => {
    const data = { name, done };

    const response = await fetch(`${PUBLIC_API_URL}/todos`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });

    return await response.json();
};

const readTodos = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/todos`);
    return await response.json();
};

const deleteTodo = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/todos/${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

const changeDone = async (id) => {
    const res = await fetch(`${PUBLIC_API_URL}/todos/${id}`, {
        method: "POST"
    })
    return await res.json()
}
export { createTodo, deleteTodo, readTodos, changeDone };