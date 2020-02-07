const express = require('express')
const path = require('path')

const server = express()
const port = process.env.PORT || '8000'

server.use(express.static(path.join(__dirname, '/public')))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.route('/').get((_req, res) => {
 
    // res.render('pages/login')
    /* Routes */
    res.sendFile(path.join(__dirname)+'/views/pages/home.html');
  });  

  server.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
  })
  