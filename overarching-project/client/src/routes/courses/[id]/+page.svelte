<script>
  import Questions from "$lib/components/Questions.svelte";
  import { useCourseState } from "$lib/states/courseState.svelte.js";
  import { useQuestionState } from "$lib/states/questionState.svelte.js";

  let courseState = useCourseState();
  let questionState = useQuestionState();

  let {data} = $props();
  let courseId = data.id;
  let currentCourse = $state({});

  const getCurrentCourse = async () => {
    currentCourse = await courseState.getOneCourse(courseId);
  };

  $effect(() => {
    console.log(courseId);
    getCurrentCourse();
    questionState.getAll(courseId);
  });

</script>

{#if Object.keys(currentCourse).length === 0}
  <h1>No course found</h1>
{:else}
  <h1>{currentCourse.name}</h1>
  <Questions/>
{/if}