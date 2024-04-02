const helper = require("./helpers");
const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// specializations routes
app.post("/specializations", helper.specialization.create);
app.get("/specializations", helper.specialization.getAll);
app.get("/specializations/:id", helper.specialization.getById);
app.put("/specializations/:id", helper.specialization.update);
app.delete("/specializations/:id", helper.specialization.delete);

// candidates routes
app.post("/candidates", helper.candidate.create);
app.get("/candidates", helper.candidate.getAll);
app.get("/candidates/:id", helper.candidate.getById);
app.put("/candidates/:id", helper.candidate.update);
app.delete("/candidates/:id", helper.candidate.delete);

// compatibilities routes
app.post("/compatibilities", helper.compatibility.create);
app.get("/compatibilities", helper.compatibility.getAll);
app.get("/compatibilities/:id", helper.compatibility.getById);
app.put("/compatibilities/:id", helper.compatibility.update);
app.delete("/compatibilities/:id", helper.compatibility.delete);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
