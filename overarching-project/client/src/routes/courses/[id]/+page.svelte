<script>
    import Questions from "$lib/components/Questions.svelte";
    import {useCourseState} from "$lib/states/courseState.svelte.js";
    import {useQuestionState} from "$lib/states/questionState.svelte.js";

    let courseState = useCourseState();
    let questionState = useQuestionState();

    let {data} = $props();
    let courseId = data.id;
    let currentCourse = $state({});

    const getCurrentCourse = async () => {
        currentCourse = await courseState.getOneCourse(courseId);
    };

    $effect(() => {
        getCurrentCourse();
        questionState.getAll(courseId);
    });

</script>

<svelte:head><title>{currentCourse.name}</title></svelte:head>

{#if Object.keys(currentCourse).length === 0}
    <h2 class="h2 text-2xl font-semibold flex justify-center">No course found</h2>
{:else}
    <h2 class="h2 text-2xl font-semibold mb-10 flex ">{currentCourse.name}</h2>
    <Questions/>
{/if}