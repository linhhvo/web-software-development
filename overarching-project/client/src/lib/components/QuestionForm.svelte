<script>
    import {page} from '$app/state';
    import {useQuestionState} from "$lib/states/questionState.svelte.js";

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
    <h2 class="h2 text-xl text-success-500 font-semibold mb-5">Add question</h2>
    <form class="space-y-4 flex flex-col " onsubmit={addQuestion}>
        <label for="title" class="label">
            <span class="label-text mb-3">Title</span>
            <input class="input border focus:border-success-700 placeholder:italic placeholder:text-sm placeholder:text-gray-500"
                   type="text"
                   name="title" id="title"
                   placeholder="Enter a question title"/>
        </label>
        <label class="label" for="text">
            <span class="label-text mb-3">Question Content</span>
            <textarea
                    class="input border focus:border-success-700 placeholder:italic placeholder:text-sm placeholder:text-gray-500"
                    id="text"
                    name="text"
                    placeholder="Enter the content of the question"></textarea>
        </label>
        <button class="btn preset-filled-tertiary-500" type="submit">Add Question</button>
    </form>
</div>