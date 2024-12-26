<script>
    import { getData } from "$lib/apis/errors-api.js";

    let response = $state({});
    let loading = $state(false);

    const fetchData = async (id) => {
        loading = true;
        response = await getData(id);
        loading = false;
    };
</script>

{#if loading}
    <p>Loading...</p>
{/if}

<button onclick={() => fetchData(1)}>GET /1</button>
<button onclick={() => fetchData(2)}>GET /2</button>
<button onclick={() => fetchData(3)}>GET /3</button>

<p>{JSON.stringify(response)}</p>

{#if response.error}
    <p>Oh noes! Error: {response.error}</p>
{:else}
    <p>{response?.data?.message}</p>
{/if}