<script>
    import {useQuestionState} from "$lib/states/questionState.svelte.js";
    import {useAnswerState} from "$lib/states/answerState.svelte.js";
    import Answers from "$lib/components/Answers.svelte";

    const questionState = useQuestionState()
    const answerState = useAnswerState()

    let {data} = $props()
    let courseId = data.id
    let questionId = data.qid
    let currentQuestion = $state({})

    const getCurrentQuestion = async () => {
        currentQuestion = await questionState.getOne(courseId, questionId)
    }

    $effect(() => {
        getCurrentQuestion()
        answerState.getAnswers(courseId, questionId)
    })
</script>

<svelte:head><title>{currentQuestion.title}</title></svelte:head>

{#if Object.keys(currentQuestion).length === 0}
    <h2 class="h2 text-2xl font-semibold flex justify-center">No question found</h2>
{:else}
    <div class="mb-7 space-y-1">
        <h2 class="h2 text-2xl font-semibold flex ">{currentQuestion.title}</h2>
        <p>{currentQuestion.text}</p>
    </div>
    <Answers/>
{/if}