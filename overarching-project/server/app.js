import {Hono} from "@hono/hono";
import {cors} from "@hono/hono/cors";
import {logger} from "@hono/hono/logger";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import {getCookie} from "jsr:@hono/hono@4.6.5/cookie";
import * as courseController from './controllers/courseController.js';
import * as questionController from './controllers/questionController.js';
import * as userController from './controllers/userController.js';
import * as answerController from "./controllers/answerController.js";

const app = new Hono();

const CLIENT_URL = Deno.env.get("CLIENT_URL");
app.use(
    "/*",
    cors({
        origin: `${CLIENT_URL}`,
        credentials: true,
    }),
);

app.use("/*", logger());

const JWT_SECRET = "wsd-project-secret"
const COOKIE_KEY = "token"

const userMiddleware = async (c, next) => {
    const token = getCookie(c, COOKIE_KEY);
    const {payload} = jwt.decode(token, JWT_SECRET);
    c.user = payload;
    await next();
};

app.use("/api/courses/:id/questions/:qId/answers/*", jwt.jwt({
    cookie: COOKIE_KEY,
    secret: JWT_SECRET
}));
app.use("/api/courses/:id/questions/:qId/answers/*", userMiddleware);

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
// Retrieve one question based on question ID for a course
app.get('/api/courses/:id/questions/:qId', questionController.getOneQuestion);
// Add a question to a course
app.post('/api/courses/:id/questions', ...questionController.addQuestion);
// Upvote a question in a course
app.post('/api/courses/:id/questions/:qId/upvote', questionController.upvoteQuestion);
// Delete a question in a course
app.delete('/api/courses/:id/questions/:qId', questionController.deleteQuestion);

// Retrieve all answers for a question
app.get('/api/courses/:id/questions/:qId/answers', answerController.getAnswers)
// Add a new answer to a question
app.post('/api/courses/:id/questions/:qId/answers', ...answerController.addAnswer)
// Upvote an answer of a question
app.post('api/courses/:id/questions/:qId/answers/:aId/upvote', answerController.upvoteAnswer)

// Register users
app.post("/api/auth/register", userController.registerUser);
// User login
app.post("/api/auth/login", userController.verifyUser)

export default app;