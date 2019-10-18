const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let count = 0;
//middleware para verificar se o id existe
function checkProjectId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);
  if (!project) {
    return res.status(400).json({ error: "ID não econtrado" });
  }
  return next();
}
//middleware para contar a quantidade de requisições realizadas
server.use((req, res, next) => {
  count++;
  console.log(`Quantidade de requisições realizadas:${count}`);
  return next();
});

//Post (Create)
server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const tasks = [];

  //Post (Create New Tasks)

  server.post("/projects/:id/tasks", checkProjectId, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
  });

  const project = {
    id: id,
    tittle: title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

//Listar todas as tarefas
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Listar por tarefa

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  return res.json(project);
});

//Put (Edit)
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//Delete (delete)
server.delete("/projects/:id", checkProjectId, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);
  return res.send(dsadas);
});

server.listen(3000);
