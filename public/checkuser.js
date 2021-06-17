var currentEmailText = document.getElementById('current-user-email');

async function checkUserEmail(){
    //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('/checkuser');
    var urlData = await urlCall.json();
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 2000, 'Timeout Done');
    });
    
    Promise.all([urlData, timeOutPromise])
    .then(function(values) {
      console.log(values[0].email);
      currentEmailText.innerHTML = values[0].email;
      //Repeat
      checkUserEmail();
    });
    }
    checkUserEmail();