const pool = require("../db");
const compatibility = {};

compatibility.create = async (req, res) => {
  try {
    const { candidate1_id, candidate2_id, compatibility } = req.body;

    const newCompatibility = await pool.query(
      "INSERT INTO compatibility (candidate1_id, candidate2_id, compatibility) VALUES ($1, $2, $3) RETURNING *",
      [candidate1_id, candidate2_id, compatibility]
    );

    res.json(newCompatibility.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

compatibility.getAll = async (req, res) => {
  try {
    const allCompatibility = await pool.query("SELECT * FROM compatibility");
    res.json(allCompatibility.rows);
  } catch (error) {
    console.error(error.message);
  }
};

compatibility.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const compatibility = await pool.query(
      "SELECT * FROM compatibility WHERE compatibility_id = $1",
      [id]
    );
    res.json(compatibility.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

compatibility.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { candidate1_id, candidate2_id, compatibility } = req.body;

    const updateCandidate = await pool.query(
      "UPDATE compatibility SET candidate1_id = $1, candidate2_id = $2, compatibility = $3 WHERE compatibility_id = $4",
      [candidate1_id, candidate2_id, compatibility, id]
    );
    res.json("compatibility was updated!");
  } catch (error) {
    console.error(error.message);
  }
};

compatibility.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCandidate = await pool.query(
      "DELETE FROM compatibility WHERE compatibility_id = $1",
      [id]
    );
    res.json("compatibility info was deleted!");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = compatibility;