const express = require("express"); //import express

const server = express(); // Always start use this const

server.use(express.json());
//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name":"Diego","email":"diego@rocketseat.com.br"}

const users = ["Diego", "Caraol", "João"];
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method};URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User not found on request body" });
  }
  return next();
}
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User doesn't exists" });
  }
  req.user = user;

  return next();
}

server.get("/users", (req, res) => {
  return res.json(users); //Show users
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body; //Dados do usuario

  users.push(name);

  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  //use function ()=>{} show information in browser
  //const nome = req.query.nome;
  //const {id} = req.params;
  //const { index } = req.params; //Index é utilizado para retornar a posição que o usario ocupa na const users
  return res.json(req.user);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  //Criando alteração de usuario
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
