<script>
  import { useQuestionState } from "$lib/states/questionState.svelte.js";
  import QuestionItem from "./QuestionItem.svelte";

  let questionState = useQuestionState();

</script>

<h2>Questions list</h2>
<ul>
  {#each questionState.questions as question}
    <li>
      <QuestionItem {question}/>
    </li>
  {/each}
</ul>
