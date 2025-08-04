<script>
    import {page} from '$app/state'
    import {useAnswerState} from "$lib/states/answerState.svelte.js";

    let courseId = page.params.id
    let questionId = page.params.qid

    let answerState = useAnswerState()

    const addAnswer = async (e) => {
        const answer = Object.fromEntries(new FormData(e.target))
        await answerState.add(courseId, questionId, answer)
        e.target.reset()
        e.preventDefault()
    }
</script>

<div>
    <h2 class="h2 text-xl text-success-500 font-semibold mb-5">Add answer</h2>
    <form class="space-y-4 flex flex-col " onsubmit={addAnswer}>
        <label class="label" for="text">
            <span class="label-text mb-3">Answer Content</span>
            <textarea
                    class="input border focus:border-success-700 placeholder:italic placeholder:text-sm placeholder:text-gray-500"
                    id="text"
                    name="text"
                    placeholder="Enter the content of the answer"></textarea>
        </label>
        <button class="btn preset-filled-tertiary-500" type="submit">Add Answer</button>
    </form>
</div>