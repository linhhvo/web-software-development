CREATE TABLE question_answers
(
    id          SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions (id) ON DELETE CASCADE,
    user_id     INTEGER REFERENCES users (id) ON DELETE CASCADE,
    upvotes     INTEGER NOT NULL DEFAULT 0,
    text        TEXT    NOT NULL
);