// Host Buttons //
var hostButton0 = document.getElementById('host_button_0');
hostButton0.addEventListener('click', () => { clickHostFunction(0) })

var hostButton1 = document.getElementById('host_button_1');
hostButton1.addEventListener('click', () => { clickHostFunction(1) })

var hostButton2 = document.getElementById('host_button_2');
hostButton2.addEventListener('click', () => { clickHostFunction(2) })

var hostButton3 = document.getElementById('host_button_3');
hostButton3.addEventListener('click', () => { clickHostFunction(3) })

var hostButtonClear = document.getElementById('host_button_clear');
hostButtonClear.addEventListener('click', () => { clickHostFunction('clear') })


var kickOut = document.getElementById("kick-out");
kickOut.addEventListener('click', () => { clickHostFunction("kick") });

var guideUserOut = document.getElementById("guide-user-out");
guideUserOut.addEventListener('click', () => { clickHostFunction("guide") })

function clickHostFunction(number) {
    if(number === 0) {
        fetch('/6st8v32qwsmm85sc/0');
    }
    if(number === 1) {
        fetch('/6st8v32qwsmm85sc/1');
    }
    if(number === 2) {
        fetch('/6st8v32qwsmm85sc/2');
    }
    if(number === 3) {
        fetch('/6st8v32qwsmm85sc/3');
    }
    if(number === "clear") {
        fetch('/8mgttkxbw987j5wc');
    }
    if(number === "start") {
        fetch('/zeba5ue82qpsecpn/?input=1')
    }
    if(number === "hold") {
        fetch('/zeba5ue82qpsecpn/?input=0')
    }
    if(number == "guide") {
        fetch('/6st8v32qwsmm85sc/4');
    }
    if(number === "kick") {
        fetch('/6st8v32qwsmm85sc/6');
    }
}