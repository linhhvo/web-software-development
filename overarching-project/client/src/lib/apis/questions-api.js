import {PUBLIC_API_URL} from '$env/static/public';

const getQuestions = async (courseId) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`);
    return await res.json();
};

const getOneQuestion = async (courseId, questionId) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}`);
    return await res.json();
}

const addQuestion = async (courseId, question) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(question)
    });

    return await res.json();
};

const deleteQuestion = async (courseId, questionId) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}`, {
        method: "DELETE"
    });

    return await res.json();
};

const upvoteQuestion = async (courseId, questionId) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}/upvote`, {
        method: "POST"
    });

    return await res.json();
};

export {getQuestions, getOneQuestion, addQuestion, deleteQuestion, upvoteQuestion};