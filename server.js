var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
require('dotenv').config()
console.log(process.env.DB_USER)
var str = "mongodb://<dbuser>:<dbpassword>@ds125263.mlab.com:25263/nodejs-db"
// var mongoose = require('mongoose')


app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

var msgs = [
    {name: "hafeez", msg: "hi"},
    {name: "shafiq", msg: "hello"}
]
app.get('/msgs', (req, res) =>{
    res.send(msgs)
})

app.post('/msgs', (req, res) =>{
    msgs.push(req.body)
    res.status(200).send('OK')
    io.emit('msg', req.body)
})

// io.on('connection', (socket) => {
//     console.log("connext")
// })

var server = http.listen(8000, () =>{
    console.log("Server is running ", server.address().port)
})