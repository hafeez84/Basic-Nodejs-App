var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
require('dotenv').config()
var db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds125263.mlab.com:25263/nodejs-db`

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

var Msg = mongoose.model('Msg',{
    name: String,
    msg: String
})

app.get('/msgs', (req, res) =>{
    Msg.find({}, (err, msgs) =>{
        res.send(msgs)
    })
})

app.post('/msgs', (req, res) =>{
    var msg = new Msg(req.body)
    msg.save((err) =>{
        if (err)
            res.status(500).send('Error')

        res.status(200).send('OK')
        io.emit('msg', req.body)    
    })
})

// io.on('connection', (socket) => {
//     console.log("connext")
// })

mongoose.connect(db,{ useNewUrlParser: true }, (err) => {
    if (err)
        console.log(err)
})

var server = http.listen(8000, () =>{
    console.log("Server is running ", server.address().port)
})