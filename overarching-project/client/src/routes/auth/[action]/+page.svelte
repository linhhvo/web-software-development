<script>
    let {data, form} = $props();
</script>

<svelte:head><title>{data.action}</title></svelte:head>

<h2 class="h2 text-xl pb-4 font-semibold">
    {data.action === "login" ? "Login" : "Register"} form
</h2>

{#if form?.message}
    <p class="text-xl">{form.message}</p>
{/if}

<form class="space-y-4" method="POST" action="?/{data.action}">
    <label class="label" for="email">
        <span class="label-text mb-3">Email</span>
        <input
                class="input border"
                id="email"
                name="email"
                type="email"
        />
    </label>
    <label class="label" for="password">
        <span class="label-text mb-3">Password</span>
        <input class="input border" id="password" name="password" type="password"/>
    </label>
    <button class="w-full btn preset-filled-tertiary-500" type="submit">
        {data.action === "login" ? "Login" : "Register"}
    </button>
</form>