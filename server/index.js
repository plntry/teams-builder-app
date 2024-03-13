const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

// create a new candidate ??

app.post("/candidates", async (req, res) => {
  try {
    const { fullname, age, specialization_id } = req.body;
    console.log(req.body);

    const newCandidate = await pool.query(
      "INSERT INTO candidate (fullname, age, specialization_id) VALUES ($1, $2, $3) RETURNING *",
      [fullname, age, specialization_id]
    );

    res.json(newCandidate.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all candidates ??
app.get("/candidates", async (req, res) => {
  try {
    const allCandidates = await pool.query("SELECT * FROM candidate");
    res.json(allCandidates.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get a candidate
app.get("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'candidate id');

    const candidate = await pool.query(
      "SELECT * FROM candidate WHERE candidate_id = $1",
      [id]
    );
    res.json(candidate.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// update a candidate
app.put("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, age, specialization_id } = req.body;
    console.log(res.params);

    const updateCandidate = await pool.query(
      "UPDATE candidates SET fullname = $1, age = $2, specialization_id = $3 WHERE candidate_id = $4",
      [fullname, age, specialization_id, id]
    );
    res.json("candidate info was updated!");
  } catch (error) {
    console.log(error.message);
  }
});

// delete a candidate
app.delete("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCandidate = await pool.query(
      "DELETE FROM candidates WHERE candidate_id = $1",
      [id]
    );
    res.json("candidate info was deleted!");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
