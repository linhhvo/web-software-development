<script>
  import {useUserState} from "$lib/states/userState.svelte.js";
  import "../app.css";

  let {children, data} = $props();

    const userState = useUserState()
    if (data.user) {
        userState.user = data.user
    }
</script>


<header class="h-16 flex justify-center text-xl bg-surface-700 mb-6">
    <nav class="content-center ml-6 max-w-96">
        <ul class="flex space-x-6">
            <li><a class="anchor font-bold hover:underline" href="/">Home</a></li>
            <li><a class="anchor font-bold hover:underline" href="/courses">Courses</a></li>
        </ul>
    </nav>
</header>


<main class="container mx-auto w-full max-w-md">
    {#if data.user?.email}
        <p>Email: {data.user?.email}</p>
    {/if}

    {@render children()}
</main>