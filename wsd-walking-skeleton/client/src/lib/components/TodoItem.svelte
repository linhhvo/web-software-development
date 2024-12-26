<script>
    import { useTodoState } from "$lib/states/todoState.svelte.js";
    let todoState = useTodoState();

    let { todo } = $props();
</script>

<input
        type="checkbox"
        onchange={async () => await todoState.changeDone(todo.id)}
        id={todo.id}
/>
<label for={todo.id}>
    {todo.name} {todo.id} ({todo.done ? "done" : "not done"})
</label>
<button onclick={async () => await todoState.remove(todo.id)}>Remove</button>