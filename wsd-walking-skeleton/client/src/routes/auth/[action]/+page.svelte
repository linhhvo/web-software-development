<script>
  let {data, form} = $props();
</script>

<h2 class="text-xl pb-4">
  {data.action === "login" ? "Login" : "Register"} form
</h2>

{#if form?.message}
  <p class="text-xl">{form.message}</p>
{/if}

{#if data.registered}
  <p class="text-xl">You have successfully registered. Please login to continue.</p>
{/if}

<form class="space-y-4" method="POST" action="?/{data.action}">
  <label class="label" for="email">
    <span class="label-text">Email</span>
    <input
       class="input"
       id="email"
       name="email"
       type="email"
       placeholder="Email"
    />
  </label>
  <label class="label" for="password">
    <span class="label-text">Password</span>
    <input class="input" id="password" name="password" type="password"/>
  </label>
  <button class="w-full btn preset-filled-primary-500" type="submit">
    {data.action === "login" ? "Login" : "Register"}
  </button>
</form>


<!--<script>-->
<!--  let {form} = $props();-->
<!--</script>-->

<!--{#if form?.appendedName}-->
<!--  <p class="text-xl">{form.appendedName}</p>-->
<!--{/if}-->

<!--<form class="space-y-4" method="POST" action="?/append">-->
<!--  <label class="label" for="name">-->
<!--    <span class="label-text">Name</span>-->
<!--    <input class="input" id="name" name="name" type="text" placeholder="Name"/>-->
<!--  </label>-->
<!--  <button class="w-full btn preset-filled-primary-500" type="submit">-->
<!--    Append-->
<!--  </button>-->
<!--</form>-->
