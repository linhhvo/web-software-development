<script>
    import {useUserState} from "$lib/states/userState.svelte.js";
    import "../app.css";

    let {children, data} = $props();

    const userState = useUserState();
    if (data.user) {
        userState.user = data.user;
    }
</script>

{#if data.user?.id}
    <p>Hello {data.user?.id}!</p>
    <p>Your roles are: {data.user?.roles.join(", ")}</p>
{/if}

{#if data.user?.roles?.includes("ADMIN")}
    <p><a href="/admin">Admin panel</a></p>
{/if}

<main class="container mx-auto max-w-lg">
    {@render children()}
</main>