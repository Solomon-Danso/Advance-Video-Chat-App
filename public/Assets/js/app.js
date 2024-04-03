var MyApp = (function(){


   function init(uid, mid){
    alert("UserId: " + uid+" MeetingId: " + mid);
   }


    return {
        _init:function(uid, mid){
            init(uid, mid)
        }


    }

})()