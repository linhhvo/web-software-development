import postgres from 'postgres';

const sql = postgres();

export const getAll = async (courseId) => {
    return await sql`SELECT *
                     FROM questions
                     WHERE course_id = ${courseId};`;
};

export const getOne = async (courseId, questionId) => {
    return await sql`SELECT *
                     FROM questions
                     where course_id = ${courseId}
                       and id = ${questionId};`
}
export const add = async (courseId, question) => {
    const addedQuestion = await sql`INSERT INTO questions (course_id, title, text)
                                    VALUES (${courseId}, ${question.title}, ${question.text}) RETURNING *;`;
    return addedQuestion[0];
};

export const upvote = async (courseId, questionId) => {
    const updatedQuestion = await sql`UPDATE questions
                                      SET upvotes=upvotes + 1
                                      WHERE course_id = ${courseId}
                                        AND id = ${questionId} RETURNING *;`;
    return updatedQuestion[0];
};

export const remove = async (courseId, questionId) => {
    const removedQuestion = await sql`DELETE
                                      FROM questions
                                      WHERE course_id = ${courseId}
                                        AND id = ${questionId} RETURNING *;`;
    return removedQuestion[0];
};