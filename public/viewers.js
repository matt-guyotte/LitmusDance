var currentViewerText = document.getElementById('viewer-text');

async function checkViewers(){
    //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('/checkviewers');
    var urlData = await urlCall.json();
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 1000, 'Timeout Done');
    });
    
    Promise.all([urlData, timeOutPromise])
    .then(function(values) {
      console.log(values[0].viewers);
      currentViewerText.innerHTML = values[0].viewers;
      //Repeat
      checkViewers();
    });
    }
    checkViewers();