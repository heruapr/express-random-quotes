import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
const url = "https://zenquotes.io/api/random";
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT
const apiNameSpace = 'zenquotes.io'

app.use(cors())

app.get('/', async (req, res) => {
  res.send('HELLO GUYS! :)');
})

app.get('/qod', async (req, res) => {
  const response = await fetch(url);
  let data = await response.json();
  var isReqLimit = (data.map(item => (item.a))[0] === apiNameSpace) ? true : false
  if (response.status == 200 && !isReqLimit) {
    res.json(data);
  } else {
    res.json(JSON.parse('[{"q": "tunggu bentar ya :) coba klik lagi setelah beberapa detik, development nya masih serba gratisan jadi masih sangat terbatas T_T", "a": "apr"}]'))
  }
})

app.listen(port, () => {
  console.log(`app listening at http://host:${port}`)
})
