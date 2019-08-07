const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://tindev:tindev@chamacarreto-kdy6h.mongodb.net/tindev?retryWrites=true&w=majority', { useNewUrlParser: true })

server.use(cors())
server.use(bodyParser.json())
server.use(routes)

server.listen(process.env.PORT || 3333, () => {
    console.log('tindev backend is running')
})