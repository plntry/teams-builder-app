const pool = require("../db");
const candidate = {};

candidate.create = async (req, res) => {
  try {
    const { fullname, age, specialization_id } = req.body;

    const newCandidate = await pool.query(
      "INSERT INTO candidate (fullname, age, specialization_id) VALUES ($1, $2, $3) RETURNING *",
      [fullname, age, specialization_id]
    );

    res.json(newCandidate.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

candidate.getAll = async (req, res) => {
  try {
    const allCandidates = await pool.query("SELECT * FROM candidate");
    res.json(allCandidates.rows);
  } catch (error) {
    console.log(error.message);
  }
};

candidate.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await pool.query(
      "SELECT * FROM candidate WHERE candidate_id = $1",
      [id]
    );
    res.json(candidate.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

candidate.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, age, specialization_id } = req.body;

    const updateCandidate = await pool.query(
      "UPDATE candidate SET fullname = $1, age = $2, specialization_id = $3 WHERE candidate_id = $4",
      [fullname, age, specialization_id, id]
    );
    res.json("candidate info was updated!");
  } catch (error) {
    console.log(error.message);
  }
};

candidate.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCandidate = await pool.query(
      "DELETE FROM candidate WHERE candidate_id = $1",
      [id]
    );
    res.json("candidate info was deleted!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = candidate;