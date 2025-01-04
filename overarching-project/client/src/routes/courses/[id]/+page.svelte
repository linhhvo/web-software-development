<script>
  import Questions from "$lib/components/Questions.svelte";
  // import { useQuestionState } from "$lib/states/questionState.svelte.js";

  let {data} = $props();
  let courseId = data.id;

  $effect(() => {
    console.log(courseId);
  });

</script>


<Questions/>