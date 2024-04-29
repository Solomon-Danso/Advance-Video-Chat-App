var MyApp = (function(){

    var socket = null;
    var userId = "";
    var meetingId = "";
    var profilePic = "https://glydetek.com/"

   function init(uid, mid){
    userId = uid;
    meetingId = mid;

    event_process_for_signaling_server();

   }

 
   function event_process_for_signaling_server(){
/*
Explanation:
From the frontend I am calling the socket from the cloud <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>

now from the cdn link, i am triggering the connection event [socket = io.connect();]

the event will be sleeping on the url link [localhost:3000]

[
     socket.on("connect",()=>{
        alert("Socket connected to client side");
    })
]
Now if the socket is able to receive the connect event then it will alert()



*/



    socket = io.connect();
    
    socket.on("connect",()=>{

        if(socket.connected){
            if(userId !="" && meetingId !=""){
                socket.emit("userconnect",{
                    displayName: userId,
                    meetingId: meetingId

                })
            }
        }


    })

   }


    return {
        _init:function(uid, mid){
            init(uid, mid)
        }


    }

})()