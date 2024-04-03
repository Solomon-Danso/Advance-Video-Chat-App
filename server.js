const express = require('express');
const path = require('path');

var app = express();

var server = app.listen(3000,()=>{
    console.log('listening on', 3000)
});


const io = require('socket.io')(server,{
    allowEIO3 : true
});

app.use(express.static(path.join(__dirname, "")))

//The frontend will triger the connection event and the backend will connect to the connection event 

io.on("connection",(socket)=>{

console.log("Socket Id is "+socket.id)

})


