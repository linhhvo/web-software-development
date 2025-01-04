<script>
  import { page } from '$app/state';
  import { useQuestionState } from "$lib/states/questionState.svelte.js";

  let courseId = page.params.id;
  let questionState = useQuestionState();

  const addQuestion = async (e) => {
    const question = Object.fromEntries(new FormData(e.target));
    await questionState.add(courseId, question);
    e.target.reset();
    e.preventDefault();
  };
</script>

<h2>Add question</h2>
<form onsubmit={addQuestion}>
  <div>
    <label for="title">Title</label>
    <input type="text" name="title" id="title" placeholder="Enter a question title"/>
  </div>
  <div>
    <label for="text">Question Content</label>
    <textarea id="text" name="text" placeholder="Enter the content of the question"></textarea>
  </div>
  <input type="submit" value="Add Question">

</form>