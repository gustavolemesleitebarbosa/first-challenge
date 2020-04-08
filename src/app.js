const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//List
app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

//Create
app.post("/repositories", (request, response) => {
  const{title, url, techs } = request.body
  const repository ={ id : uuid(),
                      title,  
                      url,
                      techs,
                      likes: 0,
                      }
  repositories.push(repository)
  return response.json(repository)

});

//Update
app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const {title, url, techs} = request.body
    
    const repositoryIndex = repositories.findIndex( repository => repository.id === id)
    
    if(repositoryIndex< 0){
      return response.status(400).json({ error:"repository not found" })
    }
    const repository = { ...repositories[repositoryIndex], id, title, url, techs}
    repositories[repositoryIndex] = repository
    
    return response.json(repository)
});

//Delete
app.delete("/repositories/:id", (req, res) => {
     const {id} = req.params
     const repositoryIndex = repositories.findIndex(repository=> repository.id ===id)
     
     if (repositoryIndex < 0){
        return res.status(400).json({error: "repository not found" })
      }

      repositories.splice(repositoryIndex , 1)
      return res.status(204).send()
    
    });


//Increment Likes
app.post("/repositories/:id/like", (request, response) => {
   const { id } = request.params
   const repositoryIndex =repositories.findIndex(repository =>repository.id === id ) 

   if(repositoryIndex < 0){
    return response.status(400).json({error : "repository not found"})
    }
     
    repository= {...repositories[repositoryIndex], "likes":repositories[repositoryIndex].likes+1}
    repositories[repositoryIndex] = repository
    return response.json(repository)
});

module.exports = app;
