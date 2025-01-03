<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";

  let todoState = useTodoState();

  let {todo, removeTodo} = $props();
</script>


<div class="flex items-center space-x-4 border-[2px] p-4 mt-4 card">
    <button class="text-xl" onclick={async () => await todoState.changeDone(todo.id)}>{todo.done ? "✅" : "❌"}</button>
    <span class="grow">{todo.name}</span>
    <!--    <input class="appearance-none checked:bg-blue-500"-->
    <!--           type="checkbox"-->
    <!--           onchange={async () => await todoState.changeDone(todo.id)}-->
    <!--           id={todo.id}-->
    <!--    />-->
    <!--    <button class="text-2xl" onclick={async () => await todoState.remove(todo.id)}>🗑</button>-->
    <button class="text-2xl" onclick={removeTodo}>🗑</button>
</div>