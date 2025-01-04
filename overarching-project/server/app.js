import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as courseController from './controllers/courseController.js';
import * as questionController from './controllers/questionController.js';


const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

// Retrieve all courses
app.get("/api/courses", courseController.getAllCourses);
// Retrieve one course based on course ID
app.get('/api/courses/:id', courseController.getOneCourse);
// Add a course
app.post('/api/courses', ...courseController.addCourse);
// Delete a course based on course ID
app.delete('/api/courses/:id', courseController.deleteCourse);

// Retrieve all questions for a course
app.get('/api/courses/:id/questions', questionController.getQuestions);
// Add a question to a course
app.post('/api/courses/:id/questions', ...questionController.addQuestion);
// Upvote a question in a course
app.post('/api/courses/:id/questions/:qId/upvote', questionController.upvoteQuestion);
// Delete a question in a course
app.delete('/api/courses/:id/questions/:qId', questionController.deleteQuestion);

export default app;