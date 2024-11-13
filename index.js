const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit:50000 }));

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
  
  var data = {
    username: username,
    password: password,
  }
  
  return res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})