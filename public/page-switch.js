var videoPage = document.getElementById("video-page");

var userInput1_1 = document.getElementById('user-input-page1-1');
var userInput1_2 = document.getElementById("user-input-page1-2");
var userInput1_3 = document.getElementById("user-input-page1-3");
var userInput2 = document.getElementById("user-input-page2"); 
var userInput3 = document.getElementById("user-input-page3");   
var userInput4 = document.getElementById("user-input-page4"); 
var userInput5 = document.getElementById("user-input-page5");

var thankYou = document.getElementById('thank-you-page');

var creditsPage = document.getElementById('credits-page');

//Page Switcher//

var nextButton1_1 = document.getElementById('next-button1-1');
nextButton1_1.addEventListener('click', () => { clickNextFunction(1.2) })

var nextButton1_2 = document.getElementById('next-button1-2');
nextButton1_2.addEventListener('click', () => { clickNextFunction(1.3) })

var nextButton2 = document.getElementById('next-button2');
nextButton2.addEventListener('click', () => { clickNextFunction(2) })

var nextButton3 = document.getElementById('next-button3');
nextButton3.addEventListener('click', () => { clickNextFunction(3) })

var nextButton4 = document.getElementById('next-button4');
nextButton4.addEventListener('click', () => { clickNextFunction(4) })

var nextButton5 = document.getElementById('next-button5');
nextButton5.addEventListener('click', () => { clickNextFunction(4.5) })

var nextButton7 = document.getElementById('next-button7');
nextButton7.addEventListener('click', () => { clickNextFunction(7) })


//Function

async function getCurrent() {
    var pageFetch = await fetch('/checkpage');
    var pageFetchRes = await pageFetch.json();
    console.log(pageFetchRes)
    return pageFetchRes;
}

function clickNextFunction(button) {
    if(button == 0) {
        var stylesheet = document.styleSheets[0];
        for(var i = 0; i < stylesheet.cssRules.length; i++) {
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "none") {
                stylesheet.cssRules[i].style.display = "block"
                videoPage.style.display = "block";
                userInput1_1.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                userInput5.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "none";
            }
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "block") {
                stylesheet.cssRules[i].style.display = "block";
                videoPage.style.display = "block";
                userInput1_1.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                userInput5.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "none";
            }
        }
    }
    if(button === 1.1) {
        var stylesheet = document.styleSheets[0];
        for(var i = 0; i < stylesheet.cssRules.length; i++) {
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "block") {
                stylesheet.cssRules[i].style.display = "none"
                videoPage.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                userInput5.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "none";
                userInput1_1.style.display = "block";
                countdown(46, 1.1);
            }
        }
    }
    if(button === 1.2) {
        console.log("button 1.2")
        userInput1_1.style.display = "none";
        userInput1_2.style.display = "block";
        var text1_1Container = document.getElementById("first-text1-1")
        var text1_1 = text1_1Container.value;
        if(text1_1 == null || text1_1 == undefined || text1_1 == "") {
            text1_1 = "no answer given."
        }
            if (text1_1.indexOf(' ') !== -1) { 
                var newMessage1 = text1_1.split(" ").join("_");
                console.log(newMessage1);
                fetch("/kqn8hw4frft9sg2g/?input=1&message=" + newMessage1);               
                fetch("/zykhetk344e42uds/?input=1&message=" + newMessage1);
            }
            if (text1_1.indexOf(' ') === -1) { 
                fetch("/kqn8hw4frft9sg2g/?input=1&message=" + text1_1);
                fetch("/zykhetk344e42uds/?input=1&message=" + text1_1);
            }
        countdown(31, 1.2);
    }
    if(button === 1.3) {
        userInput1_2.style.display = "none";
        userInput1_3.style.display = "block";
        var text1_2Container = document.getElementById("first-text1-2");
        var text1_2 = text1_2Container.value;
        if(text1_2 == null || text1_2 == undefined || text1_2 == "") {
            text1_2 = "no answer given."
        }
            if (text1_2.indexOf(' ') !== -1) { 
                var newMessage2 = text1_2.split(" ").join("_");
                fetch("/kqn8hw4frft9sg2g/?input=2&message=" + newMessage2);
                fetch("/zykhetk344e42uds/?input=2&message=" + newMessage2);
            }
            if (text1_2.indexOf(' ') === -1) { 
                fetch("/kqn8hw4frft9sg2g/?input=2&message=" + text1_2);
                fetch("/zykhetk344e42uds/?input=2&message=" + text1_2);
            }
        countdown(31, 1.3);
    }
    if(button === 2) {
        userInput1_3.style.display = "none";
        userInput2.style.display = "block";
        var text1_3Container = document.getElementById("first-text1-3");
        var text1_3 = text1_3Container.value;
        if(text1_3 == null || text1_3 == undefined || text1_3 == "") {
            text1_3 = "no answer given."
        }
            if (text1_3.indexOf(' ') !== -1) { 
                var newMessage3 = text1_3.split(" ").join("_");
                fetch("/kqn8hw4frft9sg2g/?input=3&message=" + newMessage3);
                fetch("/zykhetk344e42uds/?input=3&message=" + newMessage3);
            }
            if (text1_3.indexOf(' ') === -1) { 
                fetch("/kqn8hw4frft9sg2g/?input=3&message=" + text1_3);
                fetch("/zykhetk344e42uds/?input=3&message=" + text1_3);
            }
        countdown(31, 2);
    }
    if(button === 3) {
        async function getCurrent() {
            var pageFetch = await fetch('/checkpage');
            var pageFetchRes = await pageFetch.json();
            return pageFetchRes;
        }
        console.log("button 3")
        console.log("3 pressed")       
        var firstColor = document.getElementById('first-color')
        console.log(firstColor.value);
        async function callCurrent () {
            var getCurrentFunction = await getCurrent();
            console.log(getCurrentFunction);
            console.log(getCurrentFunction.number);
            if(getCurrentFunction.number == 1) {
                console.log("get current called");
                var colorCodeSplit = await firstColor.value.split("#");
                var colorCode = await colorCodeSplit[1]
                console.log(colorCode);
                await fetch("/zykhetk344e42uds/?input=4&message=" + colorCode);
            }
            if(getCurrentFunction.number == 2) {
                console.log("get current2 called")
                var colorCodeSplit2 = await firstColor.value.split("#");
                var colorCode2 = await colorCodeSplit2[1]
                console.log(colorCode2);
                fetch("/zykhetk344e42uds/?input=8&message=" + colorCode2);
            }
        }
        callCurrent();
        //function hexToRgbA(hex){
        //    var c;
        //    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        //        c= hex.substring(1).split('');
        //        if(c.length== 3){
        //            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        //        }
        //        c= '0x'+c.join('');
        //        alert('rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)');
        //    }
        //}
        //hexToRgbA(firstColor.value)
        userInput2.style.display = "none";
        userInput3.style.display = "block";
        countdown(31, 3);
        lightPopulate(1);
    }
    if(button === 4) {
        userInput3.style.display = "none";
        userInput4.style.display = "block";
        countdown(31, 4);
        lightPopulate(2);
    }
    if(button === 4.5) {
        userInput4.style.display = "none";
        thankYou.style.display = "block";

    }
    if(button === 5) {
        console.log("5 pressed")
        for(var i = 0; i < stylesheet.cssRules.length; i++) {
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "block") {
                stylesheet.cssRules[i].style.display = "block";
                videoPage.style.display = "block";
                userInput1_1.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                userInput5.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "none";
            }
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "none") {
                stylesheet.cssRules[i].style.display = "block"
                videoPage.style.display = "block";
                userInput1_1.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                userInput5.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "none";
            }
        }
    }
    if(button === 6) {
        var stylesheet = document.styleSheets[0];
        for(var i = 0; i < stylesheet.cssRules.length; i++) {
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "block") {
                stylesheet.cssRules[i].style.display = "none";
                videoPage.style.display = "none";
                userInput1_1.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "none";
                userInput5.style.display = "block";
                countdown(31, 5);
            }
        }
    }
    if(button === 7) {
        userInput5.style.display = "none";
        userInput2.style.display = "block";
        var text2Container = document.getElementById("first-text2")
        var text2 = text2Container.value;
        if(text2 == null || text2 == undefined || text2 == "") {
            text2 = "no answer given."
        }
        if (text2.indexOf(' ') !== -1) { 
            var newMessage2_ = text2.split(" ").join("_");
            fetch("/kqn8hw4frft9sg2g/?input=4&message=" + newMessage2_);
            fetch("/zykhetk344e42uds/?input=7&message=" + newMessage2_);
        }
        if (text2.indexOf(' ') === -1) { 
            fetch("/kqn8hw4frft9sg2g/?input=4&message=" + text2);
            fetch("/zykhetk344e42uds/?input=7&message=" + text2);
        }
        countdown(31, 2);
    }
    if(button === 8) {
        var stylesheet = document.styleSheets[0];
        for(var i = 0; i < stylesheet.cssRules.length; i++) {
            if(stylesheet.cssRules[i].selectorText == "#video-page" &&
            stylesheet.cssRules[i].style.display == "block") {
                stylesheet.cssRules[i].style.display = "none"
                videoPage.style.display = "none";
                userInput1_1.style.display = "none";
                userInput1_2.style.display = "none";
                userInput1_3.style.display = "none";
                userInput2.style.display = "none";
                userInput3.style.display = "none";
                userInput4.style.display = "none";
                userInput5.style.display = "none";
                thankYou.style.display = "none";
                creditsPage.style.display = "block";
            }
        }
    }
}

function timerOut(number) {
    if(number === 1.2) {
        console.log("button 1.2")
        userInput1_1.style.display = "none";
        userInput1_2.style.display = "block";
        var text1_1Container = document.getElementById("first-text1-1")
        var text1_1 = text1_1Container.value;
        var text1_1 = text1_1Container.value;
        if(text1_1 == null || text1_1 == undefined || text1_1 == "") {
            text1_1 = "no answer given."
        }
            if (text1_1.indexOf(' ') !== -1) { 
                var newMessage1 = text1_1.split(" ").join("_");
                console.log(newMessage1);
                fetch("/kqn8hw4frft9sg2g/?input=1&message=" + newMessage1);               
                fetch("/zykhetk344e42uds/?input=1&message=" + newMessage1);
            }
            if (text1_1.indexOf(' ') === -1) { 
                fetch("/kqn8hw4frft9sg2g/?input=1&message=" + text1_1);
                fetch("/zykhetk344e42uds/?input=1&message=" + text1_1);
            }
        countdown(31, 1.2);
    }
    if(number === 1.3) {
        userInput1_2.style.display = "none";
        userInput1_3.style.display = "block";
        var text1_2Container = document.getElementById("first-text1-2")
        var text1_2 = text1_2Container.value;
        if(text1_2 == null || text1_2 == undefined || text1_2 == "") {
            text1_2 = "no answer given."
        }
            if (text1_2.indexOf(' ') !== -1) { 
                var newMessage2 = text1_2.split(" ").join("_");
                fetch("/kqn8hw4frft9sg2g/?input=2&message=" + newMessage2);
                fetch("/zykhetk344e42uds/?input=2&message=" + newMessage2);
            }
            if (text1_2.indexOf(' ') === -1) { 
                fetch("/kqn8hw4frft9sg2g/?input=2&message=" + text1_2);
                fetch("/zykhetk344e42uds/?input=2&message=" + text1_2);
            }
        countdown(31, 1.3);
    }
    if(number === 2) {
        userInput1_3.style.display = "none";
        userInput2.style.display = "block";
        var text1_3Container = document.getElementById("first-text1-3");
        var text1_3 = text1_3Container.value;
        if(text1_3 == null || text1_3 == undefined || text1_3 == "") {
            text1_3 = "no answer given."
        }
            if (text1_3.indexOf(' ') !== -1) { 
                var newMessage3 = text1_3.split(" ").join("_");
                fetch("/kqn8hw4frft9sg2g/?input=3&message=" + newMessage3);
                fetch("/zykhetk344e42uds/?input=3&message=" + newMessage3);
            }
            if (text1_3.indexOf(' ') === -1) { 
                fetch("/kqn8hw4frft9sg2g/?input=3&message=" + text1_3);
                fetch("/zykhetk344e42uds/?input=3&message=" + text1_3);
            }
        countdown(31, 2);
    }
    if(number === 3) {
        async function getCurrent() {
            var pageFetch = await fetch('/checkpage');
            var pageFetchRes = await pageFetch.json();
            return pageFetchRes;
        }
        console.log("button 3")
        console.log("3 pressed")       
        var firstColor = document.getElementById('first-color')
        console.log(firstColor.value);
        async function callCurrent () {
            var getCurrentFunction = await getCurrent();
            console.log(getCurrentFunction);
            console.log(getCurrentFunction.number);
            if(getCurrentFunction.number == 1) {
                console.log("get current called");
                var colorCodeSplit = await firstColor.value.split("#");
                var colorCode = await colorCodeSplit[1]
                console.log(colorCode);
                await fetch("/zykhetk344e42uds/?input=4&message=" + colorCode);
            }
            if(getCurrentFunction.number == 2) {
                console.log("get current2 called")
                var colorCodeSplit2 = await firstColor.value.split("#");
                var colorCode2 = await colorCodeSplit2[1]
                console.log(colorCode2);
                fetch("/zykhetk344e42uds/?input=8&message=" + colorCode2);
            }
        }
        callCurrent();
        userInput2.style.display = "none";
        userInput3.style.display = "block";
        countdown(31, 3);
        lightPopulate(1);
    }
    if(number === 4) {
        userInput3.style.display = "none";
        userInput4.style.display = "block";
        countdown(31, 4);
        lightPopulate(2);
    }
    if(number === 5) {
        userInput4.style.display = "none";
        thankYou.style.display = "block";
    }
    if(number === 6) {
        userInput5.style.display = "none";
        userInput2.style.display = "block";
        var text2Container = document.getElementById("first-text2")
        var text2 = text2Container.value;
        if(text2 == null || text2 == undefined || text2 == "") {
            text2 = "no answer given."
        }
        if (text2.indexOf(' ') !== -1) { 
            var newMessage2_ = text2.split(" ").join("_");
            fetch("/kqn8hw4frft9sg2g/?input=4&message=" + newMessage2_);
            fetch("/zykhetk344e42uds/?input=7&message=" + newMessage2_);
        }
        if (text2.indexOf(' ') === -1) { 
            fetch("/kqn8hw4frft9sg2g/?input=4&message=" + text2);
            fetch("/zykhetk344e42uds/?input=7&message=" + text2);
        }
        countdown(31, 2);
    }
}