import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";


const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());


let questions = []

app.get("/courses", (c) => {
    return c.json({courses: [ {id: 1, name: "Web Software Development" }, {id: 2, name: "Device-Agnostic Design" } ] })
});

app.get('/courses/:id', (c) => {
    const courseId = c.req.param('id')
    return c.json({course: {id: Number(courseId), name: "Course Name" } })
})

app.post('/courses', async (c) => {
    const data = await c.req.json()
    const courseName = data.name
    return c.json({course: {id: 3, name: courseName} })
})

app.get('/courses/:id/questions', (c) => {
    return c.json(questions)
})

app.post('/courses/:id/questions', async (c) => {
    const data = await c.req.json()
    data.id = questions.length + 1
    data.upvotes = 0
    questions.push(data)
    return c.json(data)
})

app.post('/courses/:id/questions/:qId/upvote', (c) => {
    const questionId = Number(c.req.param('qId'))
    const targetQuestion = questions.find((q) => q.id === questionId)
    targetQuestion.upvotes++
    return c.json(targetQuestion)
})

app.delete('/courses/:id/questions/:qId', (c) => {
    const questionId = Number(c.req.param('qId'))
    const targetQuestion = questions.find((q) => q.id === questionId)
    questions = questions.filter((q) => q.id !== (questionId))
    return c.json(targetQuestion)
})

export default app;