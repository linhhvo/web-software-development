import {browser} from "$app/environment"
import * as questionApi from "../apis/questions-api.js"

let questionState = $state([])



if (browser) {
    questionState = await questionApi.getQuestions()
}


const useQuestionState = () => {
  return {
      get questions() {
          return questionState
      },
      add: async (question) => {
          await questionApi.addQuestion(question)
          questionState = await questionApi.getQuestions()
      },
      delete: async (questionId) => {
          await questionApi.deleteQuestion(questionId)
          questionState = await questionApi.getQuestions()
      },
      upvote: async (questionId) => {
          await questionApi.upvoteQuestion(questionId)
          questionState = await questionApi.getQuestions()
      }
  }
}

export { useQuestionState }