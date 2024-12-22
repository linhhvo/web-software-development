<script>
    import QuestionItem from "./QuestionItem.svelte";
    import {useQuestionState} from "../states/questionState.svelte.js";

    let questionState = useQuestionState()

</script>

<h1>Questions list</h1>
<ul>
    {#each questionState.questions as question}
        <li>
            <QuestionItem {question}/>
        </li>
    {/each}
</ul>
