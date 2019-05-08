const express = require('express')
// express = lightweight
// routers -> organizing our endpoints
// middleware -> allows us expand and customize

const server = express()
const port = 9090

// creating endpoints

// listening
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})