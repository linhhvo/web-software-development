<script>
    import {useQuestionState} from "$lib/states/questionState.svelte.js";
    import QuestionItem from "./QuestionItem.svelte";

    let questionState = useQuestionState();

</script>

<h2 class="h2 text-xl text-success-500 font-semibold mt-8">Questions list</h2>
<ul class="list-inside list-disc text-base mt-4 marker:text-secondary-500 space-y-3">
    {#each questionState.questions as question}
        <li>
            <QuestionItem {question}/>
        </li>
    {/each}
</ul>