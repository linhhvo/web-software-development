<script>
    import { useLocationState } from "$lib/states/locationState.svelte.js";

    const locationState = useLocationState();
</script>

<table>
    <tbody>
    <tr>
        <td></td>
        <td>
            <button onclick={() => locationState.up()}>Up</button>
        </td>
        <td></td>
    </tr>
    <tr>
        <td>
            <button onclick={() => locationState.left()}>Left</button>
        </td>
        <td>
            <button onclick={() => locationState.down()}>Down</button>
        </td>
        <td>
            <button onclick={() => locationState.right()}>Right</button>
        </td>
    </tr>
    </tbody>
</table>
