<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  import { getContext } from "svelte";
  import TodoItem from "./TodoItem.svelte";

  const toast = getContext("toast");

  let todoState = useTodoState();

  const remove = (todo) => {
    if (Math.random() < 0.9) {
      toast.create({
        title      : "Error",
        description: "Failed to remove todo",
        type       : "error"
      });
      return;
    }

    todoState.todos = todoState.todos.filter((t) => t !== todo);
  };

</script>

<ul>
    {#each todoState.todos as todo (todo)}
        <li>
            <TodoItem {todo} removeTodo={() => remove(todo)}/>
        </li>
    {/each}
</ul>