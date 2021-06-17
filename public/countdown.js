var counter1_1 = document.getElementById("countdown-timer1-1");
var counter1_2 = document.getElementById("countdown-timer1-2");
var counter1_3 = document.getElementById("countdown-timer1-3");
var counter2 = document.getElementById("countdown-timer2");
var counter3 = document.getElementById("countdown-timer3");
var counter4 = document.getElementById("countdown-timer4");
var counter5 = document.getElementById("countdown-timer5");

var userInput1 = document.getElementById("user-input-page1");
var userInput2 = document.getElementById("user-input-page2"); 
var userInput3 = document.getElementById("user-input-page3");   
var userInput4 = document.getElementById("user-input-page4"); 
var userInput5 = document.getElementById("user-input-page5"); 

function countdown(seconds, timer) {
    if (timer === 1.1) {
        var interval = setInterval(() => {  
            seconds--;
            counter1_1.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(1.2);
                clearInterval(interval);
            }
            if(userInput1_1.style.display === "none") {
                clearInterval(interval);
            }
         }, 1000)
    }
    if (timer === 1.2) {
        var interval = setInterval(() => {  
            seconds--;
            counter1_2.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(1.3);
                clearInterval(interval);
            }
            if(userInput1_2.style.display === "none") {
                clearInterval(interval);
            }
         }, 1000)
    }
    if (timer === 1.3) {
        var interval = setInterval(() => {  
            seconds--;
            counter1_3.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(2);
                clearInterval(interval);
            }
            if(userInput1_3.style.display === "none") {
                clearInterval(interval);
            }
         }, 1000)
    }
    if (timer === 2) {
        var interval2 = setInterval(() => {  
            seconds--;
            counter2.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(3);
                clearInterval(interval2);
            }
            if(userInput2.style.display === "none") {
                clearInterval(interval2);
            }
         }, 1000)
    }
    if (timer === 3) {
        var interval3 = setInterval(() => {  
            seconds--;
            counter3.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(4);
                clearInterval(interval3);
            }
            if(userInput3.style.display === "none") {
                clearInterval(interval3);
            }
         }, 1000)
    }
    if (timer === 4) {
        var interval4 = setInterval(() => {  
            seconds--;
            counter4.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(5);
                clearInterval(interval4);
            }
            if(userInput4.style.display === "none") {
                clearInterval(interval4);
            }
         }, 1000)
    }
    if (timer === 5) {
        var interval5 = setInterval(() => {  
            seconds--;
            counter5.innerHTML = String(seconds);    
            if(seconds === 0) {
                console.log("timer finished")
                timerOut(6);
                clearInterval(interval5);
            }
            if(userInput5.style.display === "none") {
                clearInterval(interval5);
            }
         }, 1000)
    }        
}