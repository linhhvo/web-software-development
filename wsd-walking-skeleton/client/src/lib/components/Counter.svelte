<script>
    import { useCountState } from "$lib/states/countState.svelte.js";
    const countState = useCountState();
</script>

<p>Count is {countState.count}</p>
<button onclick={() => countState.increment()}>Increment</button>