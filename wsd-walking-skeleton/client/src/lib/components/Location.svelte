<script>
    import { useLocationState } from "$lib/states/locationState.svelte.js";

    const locationState = useLocationState();
</script>

<p>At ({locationState.location.x}, {locationState.location.y})</p>
