const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0, 
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;
  
  const respositoryIndex = repositories.findIndex(repository => repository.id ==id);

  if(respositoryIndex <0){
    return response.status(400).send();
  }

  const likes = repositories[respositoryIndex].likes;
  
  const repository = {id, title, url, techs, likes};

  repositories[respositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const respositoryIndex = repositories.findIndex(repository => repository.id ==id);

  if(respositoryIndex <0){
    return response.status(400).send();
  }
  
  repositories.splice(respositoryIndex, 1);

  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repository = repositories.find(respository => respository.id == id);

  if(!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);

});

module.exports = app;
