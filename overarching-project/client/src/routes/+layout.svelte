<script>
    import {useUserState} from "$lib/states/userState.svelte.js";
    import "../app.css";

    let {children, data} = $props();

    const userState = useUserState()
    if (data.user) {
        userState.user = data.user
    }

    $effect(() => {
        document.body.classList.add("e2e-ready")
    })
</script>


<header class="h-16 flex text-primary-500 justify-center text-xl bg-surface-700 mb-6">
    <nav class="flex items-center justify-between max-w-96">
        <ul class="flex justity-center space-x-6">
            <li><a class="font-bold hover:underline" href="/">Home</a></li>
            <li><a class="font-bold hover:underline" href="/courses">Courses</a></li>
        </ul>
        <ul class="flex absolute right-6 text-sm space-x-3 ">
            {#if data.user?.email}
                <p>Email: {data.user?.email}</p>
            {:else}
                <li><a class="hover:underline" href="/auth/login">Login</a></li>
                <li><a class="hover:underline" href="/auth/register">Register</a></li>
            {/if}
        </ul>
    </nav>
</header>


<main class="container mx-auto w-full max-w-md">

    {@render children()}
</main>