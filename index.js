const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit:50000 }));

const config = {
  connectionString:
    "postgres://testing_database_vh02_user:8VlFnQqxZLbyde2vVc8mAYFQCyMh8CXy@dpg-csq8d8bqf0us73ed63f0-a.singapore-postgres.render.com/testing_database_vh02?ssl=true"
};

const { Client } = require('pg');
const { constants } = require("buffer");
const client = new Client(config);
client.connect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {

  var data = {
    username: "bryan",
    age: 18,
    gender: "Male",
    isHandsome: true,
  }
  
  return res.json(data);
})

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  
  client.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password])
  .then((result) => {
    if (result.rows.length > 0)
    {
      return res.status(200).send("Welcome, " + result.rows[0].username);
    }
    else
    {
      return res.status(200).send("Wrong username/password");
    }
    
  });
})

app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  
  client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, password])
  .then((result) => {
    // result.rows[0].
    return res.status(200).send("Success");
  });

  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})