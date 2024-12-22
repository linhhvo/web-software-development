<script>
    import {useQuestionState} from "../states/questionState.svelte.js";
    let questionState = useQuestionState()

    let {question} = $props()
</script>

<label for={question.id}>{question.title} - Upvotes: {question.votes}</label>

<button onclick={() => questionState.delete(question.id)}>Delete</button>
<button onclick={() => questionState.upvote(question.id)}>Upvote</button>