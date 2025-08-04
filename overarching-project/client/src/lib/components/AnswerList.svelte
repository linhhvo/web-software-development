<script>
    import {useAnswerState} from "$lib/states/answerState.svelte.js"
    import AnswerItem from "./AnswerItem.svelte"

    let answerState = useAnswerState()
</script>

<h2 class="h2 text-xl text-success-500 font-semibold mt-8">Answer list</h2>
<div>
    <ul class="list-inside list-disc text-base mt-4 marker:text-secondary-500 space-y-3">
        {#each answerState.answers as answer}
            <li class="decoration-secondary-500">
                <AnswerItem {answer}/>
            </li>
        {/each}
    </ul>
</div>