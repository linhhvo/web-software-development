<script>
  import { page } from "$app/state";
  import { useQuestionState } from "$lib/states/questionState.svelte.js";

  let courseId = page.params.id;
  let questionState = useQuestionState();

  let {question} = $props();
</script>

<label for={question.id}>{question.title} - Upvotes: {question.upvotes}</label>

<button onclick={async () => await questionState.delete(courseId, question.id)}>Delete</button>
<button onclick={async () => await questionState.upvote(courseId, question.id)}>Upvote</button>