import postgres from "postgres";

const sql = postgres();


const getAll = async (bookId) => {
  return await sql`SELECT *
                   FROM book_ratings
                   WHERE book_id = ${bookId}`;
};

const getOne = async (bookId, ratingId) => {
  const rating = await sql`SELECT *
                           FROM book_ratings
                           WHERE book_id = ${bookId}
                             AND id = ${ratingId}`;
  return rating[0];
};

const add = async (bookId, rating) => {
  const newRating = await sql`INSERT INTO book_ratings (book_id, rating, feedback)
                              VALUES (${bookId}, ${rating.rating}, ${rating.feedback}) RETURNING *`;
  return newRating[0];
};

const update = async (bookId, ratingId, newRating) => {
  const updatedRating = await sql`UPDATE book_ratings
                                  SET rating=${newRating.rating},
                                      feedback=${newRating.feedback}
                                  WHERE book_id = ${bookId}
                                    AND id = ${ratingId} RETURNING *`;
  return updatedRating[0];
};

const remove = async (bookId, ratingId) => {
  const removedRating = await sql`DELETE
                                  FROM book_ratings
                                  WHERE book_id = ${bookId}
                                    AND id = ${ratingId} RETURNING *`;
  return removedRating[0];
};

export { getAll, getOne, add, update, remove };
