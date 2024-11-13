const express = require('express')
const app = express()
const port = 3000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})