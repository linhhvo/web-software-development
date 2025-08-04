import {PUBLIC_API_URL} from '$env/static/public';

export const getAnswers = async (courseId, questionId) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}/answers`);
    return await res.json();
};

export const addAnswer = async (courseId, questionId, answer) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}/answers`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(answer),
        credentials: "include",
    });
    return await res.json();
}

export const upvoteAnswer = async (courseId, questionId, answerId) => {
    const res = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}/answers/${answerId}/upvote`, {
        method: "POST",
        credentials: "include",
    });
    return await res.json();
}