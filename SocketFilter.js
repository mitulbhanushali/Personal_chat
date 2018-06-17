function getSocketId(userid,clients){

  var found = false;
  for(var i = 0; i < clients.length; i++) {
      if (clients[i].user_id == userid) {
          return clients[i].sock_id;
      }
  }
 return null;
}

function displaySockInfo(clients){
  console.log("starting logs");

  for(var i = 0; i < clients.length; i++) {
    console.log(clients[i].sock_id+"  "+clients[i].user_id);
  }

}

function removeSocket(sockid,clients){
  for(var i = 0; i < clients.length; i++) {
      if (clients[i].sock_id == sockid) {
        clients.splice(i,1);
      }
  }
  return clients;
}


module.exports.getSocketId=getSocketId;
module.exports.displaySockInfo=displaySockInfo;
module.exports.removeSocket=removeSocket;
