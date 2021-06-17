var ticketButton = document.getElementById('ticket-button');

ticketButton.addEventListener('click', () => {
    window.open("https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=VJOPC2BN2IE45NO7GN&redirect_uri=http://localhost:50000/eventbritetickets/");
})

async function callme() {
    //This promise will resolve when the network call succeeds
    //Feel free to make a REST fetch using promises and assign it to networkPromise
    var urlCall = await fetch('http://litmusdance.com/checkticket');
    var urlData = await urlCall.json();
    
    
    //This promise will resolve when 2 seconds have passed
    var timeOutPromise = new Promise(function(resolve, reject) {
      // 2 Second delay
      setTimeout(resolve, 2000, 'Timeout Done');
    });
}