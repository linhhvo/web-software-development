import { zValidator } from "zValidator";
import * as courseRepo from '../repositories/courseRepository.js';
import { courseValidator } from "../validators.js";

export const getAllCourses = async (c) => {
  const courses = await courseRepo.getAll();
  return c.json(courses);
};

export const getOneCourse = async (c) => {
  const courseId = c.req.param('id');
  const courseResult = await courseRepo.getOne(courseId);
  return c.json(courseResult);

};

export const addCourse = [zValidator('json', courseValidator),
  async (c) => {
    const courseData = await c.req.valid('json');
    const newCourse = await courseRepo.add(courseData);
    return c.json(newCourse);
  }
];

export const deleteCourse = async (c) => {
  const courseId = c.req.param('id');
  const deletedCourse = await courseRepo.remove(courseId);
  return c.json(deletedCourse);
};