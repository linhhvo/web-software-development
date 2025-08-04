import * as answerApi from '$lib/apis/answers-api.js';

let answerState = $state([])

export const useAnswerState = () => {
    return {
        get answers() {
            return answerState;
        },
        getAnswers: async (courseId, questionId) => {
            answerState = await answerApi.getAnswers(courseId, questionId);
        },
        add: async (courseId, questionId, answer) => {
            await answerApi.addAnswer(courseId, questionId, answer);
            answerState = await answerApi.getAnswers(courseId, questionId);
        },
        upvote: async (courseId, questionId, answerId) => {
            await answerApi.upvoteAnswer(courseId, questionId, answerId);
            answerState = await answerApi.getAnswers(courseId, questionId);
        }
    }
}