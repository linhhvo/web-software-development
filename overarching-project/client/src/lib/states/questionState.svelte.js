import * as questionApi from "../apis/questions-api.js";

let questionState = $state([]);

// if (browser) {
//   questionState = await questionApi.getQuestions();
//
// }


const useQuestionState = (initialQuestions) => {
  return {
    get questions () {
      questionState = initialQuestions;
      return questionState;
    },
    add   : async (courseId, question) => {
      await questionApi.addQuestion(courseId, question);
      questionState = await questionApi.getQuestions();
    },
    delete: async (courseId, questionId) => {
      await questionApi.deleteQuestion(courseId, questionId);
      questionState = await questionApi.getQuestions();
    },
    upvote: async (courseId, questionId) => {
      await questionApi.upvoteQuestion(courseId, questionId);
      questionState = await questionApi.getQuestions();
    }
  };
};

export { useQuestionState };