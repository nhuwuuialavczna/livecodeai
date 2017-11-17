function openStream(){
  const config = {audio : false, video: true};
  return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag,stram){
  const video = document.getElementById(idVideoTag);
  video.srcObject = stram;
  video.play();
}

// openStream().then(stream=>playStream('localStream',stream));
const peer = new Peer({key: 'peerjs',host:'livecodeai.azurewebsites.net',secure:true,port:443});
peer.on('open',id=>$("#yourid").append(id));

$("#btnCall").on('click',function(){
  const id = $("#remoteID").val();
  openStream().then(stream=>{
    playStream('localStream',stream);
    const call = peer.call(id,stream);
    call.on('stream',remoteStream=>playStream('remoteStream',remoteStream));
  });
});

peer.on('call', call => {
  openStream()
  .then(stream=>{
    call.answer(stream);
    playStream('localStream',stream);
    call.on('stream',remoteStream=>playStream('remoteStream',remoteStream));
  });
});
