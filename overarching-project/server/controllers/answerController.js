import * as answerRepo from "../repositories/answerRepository.js";
import * as userController from "../controllers/userController.js";
import {zValidator} from 'zValidator'
import {answerValidator} from "../validators.js";

export const getAnswers = async (c) => {
    const questionId = c.req.param('qId')
    const answers = await answerRepo.getAll(questionId)
    return c.json(answers)
}

export const addAnswer = [zValidator('json', answerValidator),
    async (c) => {
        const questionId = c.req.param('qId')
        const answerData = await c.req.valid('json')
        const userId = await userController.getUserId(c)
        console.log(c.user.email)
        if (userId.length === 0) {
            c.status(401)
            return c.json({"message": "Unauthorized."})
        } else {
            const newAnswer = await answerRepo.add(questionId, answerData, userId[0].id)
            return c.json(newAnswer)
        }
    }]

export const upvoteAnswer = async (c) => {
    const questionId = c.req.param('qId')
    const answerId = c.req.param('aId')
    const updatedAnswer = await answerRepo.upvote(questionId, answerId)
    return c.json(updatedAnswer)
}