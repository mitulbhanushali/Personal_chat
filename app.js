var app=require('express')();
var server=require('http').createServer(app);
var Socketio=require('socket.io').listen(server);
var clients=[];
var SocketFilter=require("./SocketFilter");


server.listen(9800,()=>{
  console.log("server is running on 9800")  ;
});

app.get("/:username",(req,res)=>{


res.sendFile("index.html",{root:__dirname});

});
Socketio.on("connection",(socket)=>{
  var UserAdded=false;

socket.on("addUser",(data)=>{
  if(!UserAdded){
   
      UserAdded=true;

      clients.push({"sock_id":socket.id,"user_id":data.username});
 
  }

});

socket.on("sendMessage",(data)=>{

console.log(data.user_id);
var sockid=SocketFilter.getSocketId(data.user_id,clients);
console.log(sockid);
if(sockid){
  Socketio.sockets.connected[sockid].emit("new msg",data.msg);
  socket.emit("send status","message send Successfully");
}else{
  socket.emit("send status","Problem while sending message");
}


});

socket.on('disconnect',()=>{
 
clients=SocketFilter.removeSocket(socket.id,clients);
console.log(clients);
});


});
