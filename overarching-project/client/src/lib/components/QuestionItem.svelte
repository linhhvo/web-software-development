<script>
  import { page } from "$app/state";
  import { useQuestionState } from "$lib/states/questionState.svelte.js";

  let courseId = page.params.id;
  let questionState = useQuestionState();

  let {question} = $props();
</script>

<label for={question.id}>{question.title} - Upvotes: {question.upvotes}</label>

<div class="space-x-2 ml-5">
  <button class="px-2 btn btn-sm preset-filled-error-500 text-sm space"
          onclick={async () => await questionState.delete(courseId, question.id)}>Delete
  </button>
  <button class="px-2 btn btn-sm preset-filled-warning-500 text-sm" onclick={async () => await
questionState.upvote(courseId, question.id)}>Upvote
  </button>
</div>
