const express = require('express')
// express = lightweight
// routers -> organizing our endpoints
// middleware -> allows us expand and customize

const db = require('./data/db')

const server = express()
const { hubs } = db
const port = 9090

// middleware of parsing JSON
server.use(express.json())

// creating endpoints
// I want to make something available in case anyone needs
server.get('/', (req, res) => {
  // specify data type
  // set a status cod
  // send a response
  res.send('<h2>Hello World</h2>')
})

// request handler for /now that sends
server.get('/now', (req, res) => {
  let date = new Date().toString()
  res.send(date)
})

// Read
server.get('/hubs', (req, res) => {
  hubs.find()
  .then(allHubs => {
    res.json(allHubs)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.get(`/hubs/:id`, (req, res) => {
  const { id } = req.params
  hubs.findById(id)
  .then(foundHub => {
    if(foundHub) {
      res.json(foundHub)
    } else {
      res.status(404).json({ err: `incorrect id`})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Create - add a new hub to the list
server.post('/hubs', (req, res) => {
  console.log(req.body)
  const newHub = req.body
  hubs.add(newHub)
  .then(addedHub => {
    res.status(201).json(addedHub)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Destroy - remove a hub
server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params
  console.log(`delete request: `, id)
  hubs.remove(id)
  .then(removedHub => {
    if(removedHub){
      res.json(removedHub)
    } else {
      res.status(404).json({err: `incorrect id`})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// Update - alter a hub
server.put('/hubs/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  hubs.update(id, changes)
  .then(updatedHub => {
    if(updateHub) {
      res.json(updatedHub)
    } else {
      res.status(404).json({err: `incorrect id`})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

// listening
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})