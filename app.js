import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
const url = "https://zenquotes.io/api/random";
const app = express()
const port = 3002

app.use(cors())

app.get('/', async (req, res) => {
  res.send('HELLO GUYS! :)');
})

app.get('/qod', async (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  const response = await fetch(url);
  var data = await response.json();
  res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})