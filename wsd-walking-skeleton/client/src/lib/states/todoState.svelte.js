import { browser } from "$app/environment";
import * as todoApi from "$lib/apis/todos-api.js";

let todoState = $state([]);

if (browser) {
    todoState = await todoApi.readTodos();
}

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        add: async (todo) => {
            const newTodo = await todoApi.createTodo(todo.name, todo.done);
            todoState.push(newTodo);
            console.log(todoState)
        },
        changeDone: async (id) => {
            const updatedTodo = await todoApi.changeDone(id)
            updatedTodo.done = !updatedTodo.done
            console.log(todoState)
        },
        remove: async (id) => {
            const removedTodo = await todoApi.deleteTodo(id);
            todoState = todoState.filter((todo) => todo.id !== removedTodo.id);
        },
    };
};

export { useTodoState };