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

<div>
  <h2 class="h2 text-2xl font-semibold">Add question</h2>
  <form class="space-y-4 flex flex-col " onsubmit={addQuestion}>
    <label for="title" class="label">
      <span class="label-text">Title</span>
      <input class="input placeholder:italic" type="text" name="title" id="title" placeholder="Enter a question title"/>
    </label>
    <label class="label" for="text">
      <span class="label-text">Question Content</span>
      <textarea class="input placeholder:italic" id="text" name="text"
                placeholder="Enter the content of the question"></textarea>
    </label>
    <button class="btn preset-filled-tertiary-500 text-lg" type="submit">Add Question</button>
  </form>
</div>