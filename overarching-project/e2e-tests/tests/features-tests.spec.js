import {expect, test} from "@playwright/test";

test.use({storageState: "./state.json"})

test("welcome message appears", async ({page}) => {
    await page.goto("/")
    await expect(page.getByText("Welcome!")).toBeVisible()
})

const randomCourseName = `test-course ${Math.floor(Math.random() * 90000)}`
let courseId = 1

test("add a course", async ({page}) => {
    await page.goto("/courses")
    await page.locator(".e2e-ready").waitFor()
    await page.locator("input[type=text]").fill(randomCourseName)
    await page.getByRole("button", {name: "Add Course"}).click()
    const newCourse = await page.getByRole("listitem").filter({hasText: randomCourseName})
    courseId = await newCourse.getAttribute("id")
    await expect(newCourse).toBeVisible()
})

test("click on a course to open the list of questions for that course", async ({page}) => {
    await page.goto("/courses")
    await page.getByRole("link", {name: randomCourseName}).click()
    await expect(page.getByText(randomCourseName)).toBeVisible()
})

const randomQuestionName = `test-question ${Math.floor(Math.random() * 90000)}`
let questionId = 1

test("add a question", async ({page}) => {
    await page.goto("/courses/" + courseId)
    await page.locator(".e2e-ready").waitFor()
    await page.locator("input[name=title]").fill(randomQuestionName)
    await page.locator("textarea[name=text]").fill("question content")
    await page.getByRole("button", {name: "Add Question"}).click()
    const newQuestion = await page.getByText(randomQuestionName + " ")
    questionId = await newQuestion.getAttribute("id")
    await expect(newQuestion).toBeVisible()
})

test("upvote a question", async ({page}) => {
    await page.goto("/courses/" + courseId)
    await page.locator(`button[id="${questionId}"]`, {hasText: "Upvote"}).click()
    await expect(page.getByText(randomQuestionName + " ")).toContainText("Upvotes: 1")
})

test("delete a question", async ({page}) => {
    await page.goto("/courses/" + courseId)
    await page.locator(`button[id="${questionId}"]`, {hasText: "Delete"}).click()
    await expect(page.getByText(randomQuestionName + " ")).not.toBeVisible()
})

const randomAnswer = `answer ${Math.floor(10000 + Math.random() * 90000)}`

test("add an answer", async ({page}) => {
    // add a new question to the first course
    await page.goto("/courses/" + courseId)
    await page.locator(".e2e-ready").waitFor()
    await page.locator("input[name=title]").fill(randomQuestionName)
    await page.locator("textarea[name=text]").fill("question content")
    await page.getByRole("button", {name: "Add Question"}).click()
    questionId = await page.getByText(randomQuestionName + " ").getAttribute("id")

    // go to the newly added question's page
    await page.goto("/courses/" + courseId + "/questions/" + questionId)
    await page.locator(".e2e-ready").waitFor()

    // add an answer to the question
    await page.getByTestId("answer-content").fill(randomAnswer)
    await page.getByRole("button", {name: "Add Answer"}).click()
    await expect(page.getByText(randomAnswer)).toBeVisible()
});

test("upvote an answer", async ({page}) => {
    await page.goto("/courses/" + courseId + "/questions/" + questionId)
    await page.locator(".e2e-ready").waitFor()
    await page.getByRole("button", {name: "Upvote"}).click()
    await expect(page.getByText(randomAnswer + " ")).toContainText("Upvotes: 1")
})