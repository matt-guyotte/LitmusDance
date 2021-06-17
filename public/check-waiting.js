var waitingRoom = document.getElementById('in-waiting-room');

async function checkWaitingRoom() {
  //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('/checkwaiting');
    var urlData = await urlCall.json();
    console.log(urlData)
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 2000, 'Timeout Done');
    });
    
    Promise.all([urlData, timeOutPromise])
    .then(async function(values) {
      //console.log(values);
      var waiting = values[0].waiting;
      if (waiting == false) {
        waitingRoom.innerHTML = "No"
      }
      if (waiting == true) {
        var urlCall2 = await fetch('/checkwaitinguser');
        var urlData2 = await urlCall2.json();
        console.log(urlData2);
        waitingRoom.innerHTML = urlData2.email;
      }
      //Repeat
      checkWaitingRoom();
    });
}
checkWaitingRoom();