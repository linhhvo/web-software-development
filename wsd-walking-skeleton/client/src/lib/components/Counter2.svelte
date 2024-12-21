<script>
    import { useCountState } from "$lib/states/countState.svelte.js";
    const counter = useCountState();
</script>

<p>Count multiplied by two is {counter.count * 2}</p>
