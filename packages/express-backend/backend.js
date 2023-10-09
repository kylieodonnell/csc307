import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const findUsersByNameAndJob = (name, job) => 
    users['users_list'].filter((user) => user.name === name && user.job === job);

const findUserByJob = (job) =>
   users['users_list'].filter((user) => user.job === job);

const findUserByName = (name) =>
   users['users_list'].filter((user) => user.name === name);

app.get('/users', (req, res) => {
    const { name, job } = req.query;
    if (name && job) {
        const results = findUsersByNameAndJob(name, job);
        if (results.length === 0) {
            return res.status(404).send('no users found w/ the name and job');
        }
        return res.send(results);
    } else if (name) {
        const results = findUserByName(name);
        if (results.length === 0) {
            return res.status(404).send('no users found w/ name.');
        }
        return res.send(results);
    } else if (job) {
        const results = findUserByJob(job);
        if (results.length === 0) {
            return res.status(404).send('no users found w/ job.');
        }
        return res.send(results);
    } else {
        return res.send(users);
    }
});

function idGenerator() {
    return Math.random().toString(36).substr(2, 9);
}

  
const addUser = (user) => {
   user.id = idGenerator();
   users['users_list'].push(user);
   return user;
}

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   const newUser = addUser(userToAdd)
   res.status(201).send(newUser); // returning the right code 201 & updated object
});

const deleteUser = (userId) => {
   const index = users['users_list'].findIndex((user) => user.id === userId);
   if (index > -1) {
     users['users_list'].splice(index, 1);
   }
};

app.delete('/users/:id', (req, res) => {
   const id = req.params['id'];
   const user = findUserById(id);
   if (user === undefined) {
       res.send('Resource not found.');
   } else {
      deleteUser(id);
      res.status(204).send();
   }
});
