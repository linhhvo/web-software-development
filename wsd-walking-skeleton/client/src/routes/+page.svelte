<!--<script>-->
<!--  import Todos from "$lib/components/Todos.svelte";-->
<!--</script>-->

<!--<Todos/>-->

<script>
    import {useUserState} from "$lib/states/userState.svelte.js";
    // let data = $props();

    const userState = useUserState();
</script>

<!-- Show the cookie from the response -->
<!--{#if data.user}-->
<!--    <p>Cookie value: {data.user}</p>-->
<!--{/if}-->
<!--{#if Object.keys(userState.user).length > 0}-->
<!--    <p>Cookie value: {userState.user}</p>-->
<!--{/if}-->

<form class="space-y-4" method="POST" action="?/auth">
    <label class="label" for="username">
        <span class="label-text">Username</span>
        <input
                class="input"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
        />
    </label>
    <button class="w-full btn preset-filled-primary-500" type="submit">
        Submit
    </button>
</form>