CREATE TABLE notes
(
    id      SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    text    TEXT    NOT NULL
);