import {browser} from "$app/environment"

const QUESTIONS_KEY = 'questions'
let initialQuestions = []

if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
    initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY))
    console.log(initialQuestions)
}

let questionState = $state(initialQuestions)

const saveQuestions = () => {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState))
}


const useQuestionState = () => {
  return {
      get questions() {
          return questionState
      },
      add: (question) => {
          questionState.push(question)
          saveQuestions()
      },
      delete: (questionId) => {
          questionState = questionState.filter((q) => q.id !== questionId)
          saveQuestions()
      },
      upvote: (questionId) => {
          const question = questionState.find((q) => q.id === questionId)
          question.votes++
          saveQuestions()
      }
  }
}

export { useQuestionState }