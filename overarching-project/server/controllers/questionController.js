import { zValidator } from "zValidator";
import * as questionRepo from '../repositories/questionRepository.js';
import { questionValidator } from "../validators.js";


export const getQuestions = async (c) => {
  const courseId = c.req.param('id');
  const questions = await questionRepo.getAll(courseId);
  return c.json(questions);
};

export const addQuestion = [zValidator('json', questionValidator),
  async (c) => {
    const courseId = c.req.param('id');
    const questionData = await c.req.valid('json');
    const newQuestion = await questionRepo.add(courseId, questionData);
    return c.json(newQuestion);
  }
];

export const upvoteQuestion = async (c) => {
  const courseId = c.req.param('id');
  const questionId = c.req.param('qId');
  const updatedQuestion = await questionRepo.upvote(courseId, questionId);
  return c.json(updatedQuestion);
};

export const deleteQuestion = async (c) => {
  const courseId = c.req.param('id');
  const questionId = c.req.param('qId');
  const deletedQuestion = await questionRepo.remove(courseId, questionId);
  return c.json(deletedQuestion);
};