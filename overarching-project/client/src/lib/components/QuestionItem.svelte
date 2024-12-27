<script>
    import {useQuestionState} from "../states/questionState.svelte.js";
    let questionState = useQuestionState()

    let {question} = $props()
</script>

<label for={question.id}>{question.title} - Upvotes: {question.upvotes}</label>

<button onclick={async () => await questionState.delete(question.id)}>Delete</button>
<button onclick={async () => await questionState.upvote(question.id)}>Upvote</button>