CREATE DATABASE IF NOT EXISTS teams-forming;

CREATE TABLE specialization(
  specialization_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE candidate(
  candidate_id SERIAL PRIMARY KEY,
  fullname VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  specialization_id INTEGER REFERENCES specialization(specialization_id)
);

CREATE TABLE compatibility(
  compatibility_id SERIAL PRIMARY KEY,
  candidate1_id INT,
    candidate2_id INT,
  FOREIGN KEY (candidate1_id) REFERENCES candidate(candidate_id),
  FOREIGN KEY (candidate2_id) REFERENCES candidate(candidate_id),
  compatibility FLOAT NOT NULL
);