var userInput1_1 = document.getElementById("user-input-page1-1");
var userInput1_2 = document.getElementById("user-input-page1-2");
var userInput1_3 = document.getElementById("user-input-page1-3");
var userInput2 = document.getElementById("user-input-page2"); 
var userInput3 = document.getElementById("user-input-page3");   
var userInput4 = document.getElementById("user-input-page4"); 
var userInput5 = document.getElementById("user-input-page5"); 

var thankYou = document.getElementById('thank-you-page');

var creditsPage = document.getElementById('credits-page');


async function callme(){
//This promise will resolve when the network call succeeds
//Feel free to make a REST fetch using promises and assign it to networkPromise
var urlCall = await fetch('/checkpage');
var urlData = await urlCall.json();


//This promise will resolve when 2 seconds have passed
var timeOutPromise = new Promise(function(resolve, reject) {
  // 2 Second delay
  setTimeout(resolve, 2000, 'Timeout Done');
});

Promise.all([urlData, timeOutPromise])
.then(function(values) {
  //console.log(values);
  var currentNumber = values[0].number;
  console.log(currentNumber)
  if(currentNumber == 0) {
    clickNextFunction(0);
  }
  if(currentNumber == 1 ) {
    clickNextFunction(1.1);
  }
  if(currentNumber == 2) {
    clickNextFunction(6)
  }
  if(currentNumber == 3) {
    clickNextFunction(8);
  }
  if(currentNumber == 4) {
    window.location.replace("/thankyou");
  }
  if(currentNumber == 6) {
    window.location.replace("/termsbroken");
  }
  //Repeat
  callme();
});
}
callme();