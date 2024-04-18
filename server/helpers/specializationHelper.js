const pool = require("../db");
const specialization = {};

specialization.create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);

    const newCandidate = await pool.query(
      "INSERT INTO specialization (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.json(newCandidate.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

specialization.getAll = async (req, res) => {
  try {
    const allSpecializations = await pool.query("SELECT * FROM specialization");
    res.json(allSpecializations.rows);
  } catch (error) {
    console.log(error.message);
  }
};

specialization.getById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'specialization id');

    const specialization = await pool.query(
      "SELECT * FROM specialization WHERE specialization_id = $1",
      [id]
    );
    res.json(specialization.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

specialization.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(res.params);

    const updateCandidate = await pool.query(
      "UPDATE specialization SET name = $1 WHERE specialization_id = $2",
      [name, id]
    );
    res.json("specialization info was updated!");
  } catch (error) {
    console.log(error.message);
  }
};

specialization.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCandidate = await pool.query(
      "DELETE FROM specialization WHERE specialization_id = $1",
      [id]
    );
    res.json("specialization was deleted!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = specialization;