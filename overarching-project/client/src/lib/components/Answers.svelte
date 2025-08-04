<script>
    import AnswerForm from "./AnswerForm.svelte";
    import AnswerList from "./AnswerList.svelte";
    import {useUserState} from "$lib/states/userState.svelte.js";

    const userState = useUserState();
</script>

{#if userState.user.email}
    <AnswerForm/>
{/if}
<AnswerList/>