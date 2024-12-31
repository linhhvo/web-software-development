import postgres from 'postgres';

const sql = postgres();


export const getAll = async () => {
  return await sql`SELECT *
                   FROM courses;`;
};

export const getOne = async (courseId) => {
  const course = await sql`SELECT *
                           FROM courses
                           WHERE id = ${courseId};`;
  return course[0];
};

export const add = async (newCourse) => {
  const addedCourse = await sql`INSERT INTO courses (name)
                                VALUES (${newCourse.name}) RETURNING *;`;
  return addedCourse[0];
};

export const remove = async (courseId) => {
  const removedCourse = await sql`DELETE
                                  FROM courses
                                  WHERE id = ${courseId} RETURNING *;`;
  return removedCourse[0];
};