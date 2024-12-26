<script>
    import {getJoke} from "$lib/apis/joke-api.js";

    let joke = $state({})

    const loadJoke = async () => {
        joke = getJoke()
    }
</script>

<button onclick={loadJoke}>Load joke</button>

{#await joke}
    <p>Loading a joke...</p>
{:then joke}
    <p>{joke.setup}</p>
    <p>{joke.punchline}</p>
{/await}