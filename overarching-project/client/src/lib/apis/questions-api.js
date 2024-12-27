import {PUBLIC_API_URL} from '$env/static/public'

const getQuestions = async () => {
    const res = await fetch(`${PUBLIC_API_URL}/courses/1/questions`)
    return await res.json()
}

const addQuestion = async (question) => {
    const res = await fetch(`${PUBLIC_API_URL}/courses/1/questions`, {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(question)
    })

    return await  res.json()
}

const deleteQuestion = async (questionId) => {
    const res = await fetch (`${PUBLIC_API_URL}/courses/1/questions/${questionId}`, {
        method: "DELETE"
    })

    return await res.json()
}

const upvoteQuestion = async (questionId) => {
    const res = await fetch(`${PUBLIC_API_URL}/courses/1/questions/${questionId}/upvote`, {
        method: "POST"
    })

    return await res.json()
}

export { getQuestions, addQuestion, deleteQuestion, upvoteQuestion }