<script>
    import {page} from "$app/state"
    import {useAnswerState} from "$lib/states/answerState.svelte.js"
    import {useUserState} from "$lib/states/userState.svelte.js";

    let courseId = page.params.id
    let questionId = page.params.qid
    let answerState = useAnswerState()
    const userState = useUserState();

    let {answer} = $props()
</script>

<p class="inline mr-2">{answer.text} -
    Upvotes: {answer.upvotes}</p>
{#if userState.user.email}
    <button
            class="px-2 btn btn-sm preset-filled-warning-500 text-sm"
            onclick={async () => await answerState.upvote(courseId, questionId, answer.id)}>
        Upvote
    </button>
{/if}