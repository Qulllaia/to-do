CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE toDo(
    id SERIAL PRIMARY KEY,
    text VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);