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

var userConnection = [];



io.on("connection", (socket) => {
    socket.on("userconnect", (data) => {
        //console.log("UserId: " + data.displayName + " MeetingId: " + data.meetingId);

        var otherUsers = userConnection.filter((p)=>p.meetingId==data.meetingId)
        /*
        Filter out the last meetingId added 
        which happens to be the my meetingId.
        */
        
       
        userConnection.push({
            connectionId: socket.id,
            userId: data.displayName,
            meetingId: data.meetingId

        })
/*
Explanation:
Every user connected will be added in the userConnection array. 
The userConnection will be a global array, any userId in the meeting will be added to this array

Now from the  userConnection array, i will remove my meetingId from this array to get other users 
*/
otherUsers.forEach((v)=>{
    socket.to(v.connectionId).emit("inform_others_about_me",{
        other_user_Id: data.displayName,
        conn_id: socket.id,

    })
})
//Sending my name and socket id to all other users 



    });

   
});
