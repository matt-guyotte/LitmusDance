async function callme(){
    //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('/checkshow');
    var urlData = await urlCall.json();
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 1000, 'Timeout Done');
    });
    
    Promise.all([urlData, timeOutPromise])
    .then(function(values) {
      //console.log(values);
      var currentNumber = values[0].number;
      if(currentNumber == 1) {
        window.location.replace('https://litmusdance.com/cynz7zz2r6gapuwj')
      }
      //Repeat
      callme();
    });
    }
    callme();