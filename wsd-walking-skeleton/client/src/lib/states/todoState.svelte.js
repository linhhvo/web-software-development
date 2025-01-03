import { browser } from "$app/environment";
import * as todoApi from "$lib/apis/todos-api.js";

let todoState = $state([]);

if (browser) {
  todoState = await todoApi.readTodos();
}

const useTodoState = () => {
  return {
    get todos () {
      return todoState;
    },
    add       : async (todo) => {
      const newTodo = await todoApi.createTodo(todo.name, todo.done);
      todoState = await todoApi.readTodos();
    },
    changeDone: async (id) => {
      const updatedTodo = await todoApi.changeDone(id);
      todoState = await todoApi.readTodos();
    },
    remove    : async (id) => {
      const removedTodo = await todoApi.deleteTodo(id);
      todoState = await todoApi.readTodos();
    }
  };
};

export { useTodoState };