<script>
  import { PUBLIC_API_URL } from "$env/static/public";

  let {data} = $props();
  let book = $state({});

  const getBook = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/books/${data.book}`);
    book = await response.json();
  };

  $effect(() => {
    getBook();
  });
</script>

{#if Object.keys(book).length === 0}
    <p>No book found</p>
{:else }
    <p>Book title: {book.title}</p>
{/if}