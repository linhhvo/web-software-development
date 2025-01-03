<script>
  import { PUBLIC_API_URL } from "$env/static/public";

  let {data} = $props();
  let todo = $state({});

  const getTodo = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/todos/${data.todo}`);
    todo = await response.json();
  };

  $effect(() => {
    getTodo();
  });
</script>

{#if Object.keys(todo).length === 0}
    <p>No such todo</p>
{:else }
    <p>{todo.name}</p>
{/if}