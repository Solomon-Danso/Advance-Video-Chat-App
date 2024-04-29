const express = require('express');
const path = require('path');

var app = express();

var server = app.listen(3000, () => {
    console.log('listening on', 3000);
});

const io = require('socket.io')(server, {
    allowEIO3: true
});

app.use(express.static(path.join(__dirname, "")));

// Serve action.html when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'action.html'));
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
    socket.on("userconnect", (data) => {
        console.log("UserId: " + data.displayName + " MeetingId: " + data.meetingId);
    });
    console.log("Socket Id is " + socket.id);
});
