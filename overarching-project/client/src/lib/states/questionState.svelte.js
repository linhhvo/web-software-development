import * as questionApi from "$lib/apis/questions-api.js";

let questionState = $state([]);

const useQuestionState = () => {
  return {
    get questions () {
      return questionState;
    },
    add   : async (courseId, question) => {
      await questionApi.addQuestion(courseId, question);
      questionState = await questionApi.getQuestions(courseId);
    },
    delete: async (courseId, questionId) => {
      await questionApi.deleteQuestion(courseId, questionId);
      questionState = await questionApi.getQuestions(courseId);
    },
    upvote: async (courseId, questionId) => {
      await questionApi.upvoteQuestion(courseId, questionId);
      questionState = await questionApi.getQuestions(courseId);
    },
    getAll: async (courseId) => {
      questionState = await questionApi.getQuestions(courseId);
    }
  };
};

export { useQuestionState };