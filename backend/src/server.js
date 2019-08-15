const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


const connectedUsers = {}


io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id
})

mongoose.connect('mongodb+srv://tindev:tindev@chamacarreto-kdy6h.mongodb.net/tindev?retryWrites=true&w=majority', { useNewUrlParser: true })

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})
app.use(cors())
app.use(bodyParser.json())
app.use(routes)

server.listen(process.env.PORT || 3333, () => {
    console.log('tindev backend is running')
})