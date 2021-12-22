import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import redis from 'redis'
const url = "https://zenquotes.io/api/random";
const app = express()
// const port = process.env.PORT
const port = 3002
const timeInSeconds = 86400
const redisKey = 'quotes'
const apiNameSpace = 'zenquotes.io'

app.use(cors())

const client = redis.createClient();
client.on("error", (err) => {
  console.log(err);
});
client.connect();

app.get('/', async (req, res) => {
  res.send('HELLO GUYS! :)');
})

app.get('/qod', async (req, res) => {
  const response = await fetch(url);
  let data = await response.json();
  var isReqLimit = (data.map(item => (item.a))[0] === apiNameSpace) ? true : false
  if (response.status == 200 && !isReqLimit) {
    handleRedis(data)
    res.json(data);
  } else {
    let cachedData = await client.get(redisKey)
    cachedData = JSON.parse(cachedData)
    const dataLength = cachedData.length
    let random = getRandomInt(dataLength)
    let arrayData = []
    arrayData.push(cachedData[random])
    res.json(arrayData);
  }
})

app.listen(port, () => {
  console.log(`app listening at http://host:${port}`)
})

async function handleRedis(data) {
  if (await client.get(redisKey) == null) {
    client.set(redisKey, JSON.stringify(data));
  } else {
    let newData = data.map(item => (item))[0]
    let cacheData = await client.get(redisKey)
    cacheData = JSON.parse(cacheData)
    cacheData.push(newData)
    client.set(redisKey, JSON.stringify(cacheData));
    client.expire(redisKey, timeInSeconds)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}