var AppProcess = (function(){


var serverProcess;

        
    function _init(SDP_function, myConnId){

        serverProcess = SDP_function,
        mtConnectionId = myConnId
    }



    var iceConfiguration = {
        iceServers:[
            {
                urls:"stun:stun.l.google.com:19302"
            },

            {
                urls:"stun:stun1.l.google.com:19302"
            },
        ]
    }




    const setConnection = (connId) =>{


        var connection = new RTCPeerConnection(iceConfiguration);
       
        connection.onnegotiationneeded = async function(event){
            await setOffer(connId)
        }

        connection.onicecandidate =  function(event){
            if(event.candidate){
                serverProcess(JSON.stringify({icecandidate:event.candidate}),connId)
            }



        }




    }


return{
    setNewConnection: async function(connId){
        await setConnection(connId)
    },

    init: async function(SDP_function, myConnId){
        await _init(SDP_function, myConnId)
    }
    
    
}

})()


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
    var SDP_function = function(data, to_connId){
        socket.emit("SDPProcess",{
            message:data,
            to_connId:to_connId
        })
    }

    
    socket.on("connect",()=>{

        if(socket.connected){

            AppProcess.init(SDP_function, socket.id);

            if(userId !="" && meetingId !=""){
                socket.emit("userconnect",{
                    displayName: userId,
                    meetingId: meetingId

                })
            }
        }


    })


    socket.on("inform_others_about_me",(data)=>{
        addUser(data.other_user_Id, data.conn_id)
        AppProcess.setNewConnection(data.conn_id)
    })



    const addUser = (others, conn) =>{
        
        var newDivId = $("#otherTemplate").clone()

        newDivId = newDivId.attr("id",conn).addClass("other")
        newDivId.find("h2").text(others)
        newDivId.find("video").attr("id","v_"+conn)
        newDivId.find("audio").attr("id","a_"+conn)
        newDivId.show()

        $("#divUsers").append(newDivId)



    }








   }


    return {
        _init:function(uid, mid){
            init(uid, mid)
        }


    }

})()