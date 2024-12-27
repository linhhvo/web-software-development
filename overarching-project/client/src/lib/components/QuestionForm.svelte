<script>
    import {useQuestionState} from "../states/questionState.svelte.js";
    let questionState = useQuestionState()

    const addQuestion = async (e) => {
        const question = Object.fromEntries(new FormData(e.target))
        // question.id = crypto.randomUUID()
        // question.votes = 0
        await questionState.add(question)
        e.target.reset()
        e.preventDefault()
    }
</script>

<h1>Add question</h1>
<form onsubmit={addQuestion}>
    <div>
        <label for="title">Title</label>
        <br>
        <input type="text" name="title" id="title" placeholder="Enter a question title"/>
    </div>
    <br>
    <div>
        <label for="text">Question Content</label>
        <br>
        <textarea id="text" name="text" placeholder="Enter the content of the question"></textarea>
    </div>
    <br>
    <input type="submit" value="Add Question">

</form>