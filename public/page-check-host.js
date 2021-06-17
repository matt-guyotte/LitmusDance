var currentPosText = document.getElementById('current-pos-text');

async function pageFetch(){
    //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('/checkpage');
    var urlData = await urlCall.json();
    console.log(urlData)
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 1000, 'Timeout Done');
    });
    
    Promise.all([urlData, timeOutPromise])
    .then(function(values) {
      //console.log(values);
      var currentNumber = values[0].number;
      console.log(currentNumber);
      if(currentNumber == 0) {
        currentPosText.innerHTML = "Video Stream"
      }
      if(currentNumber ==  1) {
          currentPosText.innerHTML = 'First Set of Prompts'
      }
      if(currentNumber == 2) {
        currentPosText.innerHTML = 'Second Set of Prompts'
    }
    if(currentNumber == 3) {
        currentPosText.innerHTML = 'Credits'
    }
    if(currentNumber == 4) {
      currentPosText.innerHTML = "User Guided Out. Remember to Clear, Hold, and Return to Video!"
    }
    if(currentNumber == 6) {
      currentPosText.innerHTML = "User Kicked Out. Remember to Clear, Hold, and Return to Video!"
    }
      //Repeat
      pageFetch();
    });
}
pageFetch();