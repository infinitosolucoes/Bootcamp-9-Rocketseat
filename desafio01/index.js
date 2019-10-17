const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

//Post (Create)
server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { tittle } = req.body;
  const tasks = [];

  const project = {
    id: id,
    tittle: tittle,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.listen(3000);
