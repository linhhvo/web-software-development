import postgres from 'postgres';


const sql = postgres();

export const getAll = async (questionId) => {
    return await sql`SELECT id, question_id, text, upvotes
                     from question_answers
                     where question_id = ${questionId};`
}

export const add = async (questionId, answerData, userId) => {
    const addedAnswer = await sql`INSERT INTO question_answers (question_id, user_id, text)
                                  VALUES (${questionId}, ${userId}, ${answerData.text}) RETURNING *;`
    return addedAnswer[0];
}

export const upvote = async (questionId, answerId) => {
    const updatedAnswer = await sql`UPDATE question_answers
                                    SET upvotes=upvotes + 1
                                    WHERE question_id = ${questionId}
                                      AND id = ${answerId} RETURNING *;`
    return updatedAnswer[0];
}