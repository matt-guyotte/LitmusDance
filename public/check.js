// Eventbrite login check //

var formEl = document.forms.eventbriteLogin;
var formData = new FormData(formEl);
var email = formData.get('email');

var form = document.getElementById("eventbriteLogin")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const { email, password} = this.elements;
  // or
  // const { name, description, task } = event.target.elements;
  console.log(email.value, password.value);
  var emailSave = email.value;
  var passwordSave = password.value;
})  

function EBAPICall () {
    var url = ''
    fetch('http://localhost:8000/eventbriteAuth')
    .then(res => res.text())
    .then(res => url = res)
    .then(window.open(url))
}