// Host Scan // 

// Declarations //
var textPrompt1 = document.getElementById("text-prompt-host-1");
var textPrompt2 = document.getElementById("text-prompt-host-2");
var textPrompt3 = document.getElementById("text-prompt-host-3");

var light1 = document.getElementById("picked-color-1");
var light2 = document.getElementById("color-start-1");
var light3 = document.getElementById("color-end-1");

var textPrompt4 = document.getElementById("text-prompt-host-4");

var light4 = document.getElementById("picked-color-2");
var light5 = document.getElementById("color-start-2");
var light6 = document.getElementById("color-end-2");

// Server Call //
async function callme(){
    //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('/hostcheck');
    var urlData = await urlCall.json();
    console.log("callme called");
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 1000, 'Timeout Done');
    });
    
    Promise.all([urlData, timeOutPromise])
    .then(function(values) {
      console.log(values[0]);
      for(var i = 0; i < values[0].length; i++) {
          if(values[0][i].prompt === 1) {
              if(values[0][i].message !== "none") {
                textPrompt1.innerHTML = values[0][i].message;
              }
              if(values[0][i].message == "none") {
                textPrompt1.innerHTML = "";
              }
          }
          if(values[0][i].prompt === 2) {
            if(values[0][i].message !== "none") {
              textPrompt2.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              textPrompt2.innerHTML = "";
            }
        }
        if(values[0][i].prompt === 3) {
            if(values[0][i].message !== "none") {
              textPrompt3.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              textPrompt3.innerHTML = "";
            }
        }
        if(values[0][i].prompt === 4) {
            if(values[0][i].message !== "none") {
                var colorNumber = values[0][i].message;
                var hash = "#"
                var colorCode = hash.concat(colorNumber);
                console.log(colorCode);
              light1.style.backgroundColor = colorCode;
            }
            if(values[0][i].message == "none") {
            light1.style.backgroundColor = 'black';
          }
        }
        if(values[0][i].prompt === 5) {
            if(values[0][i].message !== "none") {
              light2.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              light2.innerHTML = "";
            }
        }
        if(values[0][i].prompt === 6) {
            if(values[0][i].message !== "none") {
                light3.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              light3.innerHTML = "";
          }
        }
        if(values[0][i].prompt === 7) {
            if(values[0][i].message !== "none") {
              textPrompt4.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              textPrompt4.innerHTML = "";
            }
        }
        if(values[0][i].prompt === 8) {
            if(values[0][i].message !== "none") {
                var colorNumber4 = values[0][i].message;
                var hash4 = "#"
                var colorCode4 = hash4.concat(colorNumber4);
                console.log(colorCode4);
              light4.style.backgroundColor = colorCode4;
            }
            if(values[0][i].message == "none") {
            light4.style.backgroundColor = "black";
          }
        }
        if(values[0][i].prompt === 9) {
            if(values[0][i].message !== "none") {
              light5.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              light5.innerHTML = "";
            }
        }
        if(values[0][i].prompt === 10) {
            if(values[0][i].message !== "none") {
              light6.innerHTML = values[0][i].message;
            }
            if(values[0][i].message == "none") {
              light6.innerHTML = "";
            }
        }
      }
      //console.log(currentNumber)
      //Repeat
      callme();
    });
    }
    callme();
