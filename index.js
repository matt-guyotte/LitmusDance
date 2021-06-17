var express = require ('express'); 
var app = express(); 

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', async (socket) => {
  console.log('a user connected');
  var address = socket.handshake.address;
  console.log('user address is: ' + address);
  await Addresses.findOne({address: address}, async (err, data) => {
    address;
    if (err) console.log(err);
    if(data == null) {
      var newAddress = await new Addresses({address: address});
      await newAddress.save((err, data) => {
        if (err) console.log (err);
        console.log(data);
      })
      await Viewers.findOne({number: 1}, async (err, data) => {
        if (err) return console.log(err);
        console.log("viewer find called")
        var newViewerCount = data.viewers + 1; 
        console.log('this is the newViewerCount: ' + newViewerCount)
        await Viewers.updateOne({number: 1}, {$set: {viewers: newViewerCount}}, (err2, data2) => {
          console.log("viewer update called")
          if(err2) console.log(err2);
          console.log("this is the data after update: ");
          console.log(data2);
        })
      })
    }
    if(data !== null) {
      console.log("ip address already found")
    }
  })
  socket.on('disconnect', async () => {
    console.log("user disconnected");
    var address = socket.handshake.address;
    console.log("this is the address at disconnect: " + address);
    await Addresses.findOne({address: address}, async (err, data) => {
      if (err) console.log(err);
      if(data !== null) {
        console.log("ip address found in disconnect")
        await Addresses.deleteOne({address: address}, (err, data) => {
          if (err) console.log(err);
          console.log(data);
        })
        await Viewers.findOne({number: 1}, async (err, data) => {
          if(err) return console.log(err);
          if(data.viewers == 0) {
            console.log("viewers already 0");
          }
          if(data.viewers > 0) {
            var newViewers = data.viewers - 1;
            await Viewers.updateOne({number: 1}, {$set: {viewers: newViewers}})
          }
        })
      }
    })
  });
});

require('dotenv').config(); 
const path = require("path"); 
var fetch = require('node-fetch');

//// serve up production assets
app.use(express.static('public'));

var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

server.listen(process.env.PORT || 50000, () => {
  console.log('Port 50000 is Active.')
});

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https')
          // the statement for performing our redirection
          return res.redirect('https://' + req.headers.host + req.url);
      else
          return next();
  } else
      return next();
});

//app.get('*', function(req, res) {  
//  res.redirect('https://' + req.headers.host + req.url);
//
//  // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//  // res.redirect('https://example.com' + req.url);
//})


var cors = require('cors'); 
app.use(cors()); 

 const mongoose = require ('mongoose'); 
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect('mongodb+srv://matt:GotsomeT33th@litmusdatabase.myfi7.mongodb.net/litmusDatabase?retryWrites=true&w=majority');
    var db = mongoose.connection;

const session = require('express-session'); 
const MongoStore = require('connect-mongo');
app.use(session({
  secret: process.env.secret, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 7200000},
  store: new MongoStore({
    mongoUrl: mongoose.connection._connectionString,
    mongoOptions: {}
  })
}));

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

var Schema = mongoose.Schema;
var eventsSchema = new Schema ({
  eventId: String,
  start: String, 
  end: String,
})  
var testEventsSchema = new Schema ({
  eventId: String,
  start: String,
  end: String,
})
var linkSchema = new Schema ({
  link: String
});
var promptSchema = new Schema ({
  number: Number,
  prompt: String
})
var currentUserSchema = new Schema ({
  number: Number,
  email: String,
})
var waitingRoomSchema = new Schema ({
  number: Number, 
  email: String,
})
var currentNumberSchema = new Schema ({
  number: Number,
  viewers: Number
})
var ipaddressSchema = new Schema ({
  address: String, 
})
const Events = mongoose.model('Events', eventsSchema)
const TestEvents = mongoose.model('TestEvents', testEventsSchema);
const Link = mongoose.model('Link', linkSchema);
const Prompts = mongoose.model('Prompts', promptSchema);
const CurrentUser = mongoose.model('currentUser', currentUserSchema);
const WaitingRoom = mongoose.model('waitingRoom', waitingRoomSchema);
const Viewers = mongoose.model('Viewers', currentNumberSchema);
const Addresses = mongoose.model('Addresses', ipaddressSchema);

Viewers.updateOne({number: 1}, {$set: {viewers: 0}}, (err, data) => {
  if(err) return console.log(err);
  console.log(data);
})

Addresses.remove({})


//async function updateViewers() {
  //Viewers.remove({});
  //var newViewer = await new Viewers({number: 1, viewers: 0});
//
  //await newViewer.save((err, data) => {
  //  if(err) console.log(err);
  //  console.log(data);
  //})
//}

//updateViewers();

//async function updateWaiting() {
//  await WaitingRoom.updateOne({number: 1}, {$set: {email: "matt.j.guyotte@gmail.com"}}, (err, data) => {
//    if (err) return console.log(err);
//    console.log(data);
//  })
//}
//
//updateWaiting();

//async function addUser() {
//  var newUser = await new WaitingRoom({number: 1, email: "none"});
//
//  await newUser.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//
//  CurrentUser.remove({});
//
//  var newUser2 = await new CurrentUser({number: 1, email: "none"});
//
//  await newUser2.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//
//}

//addUser();

//async function addPrompts () {
//  Prompts.remove({})
//  var newPrompt1 = await new Prompts({number: 1, prompt: "none"});
//  var newPrompt2 = await new Prompts({number: 2, prompt: "none"});
//  var newPrompt3 = await new Prompts({number: 3, prompt: "none"});
//  var newPrompt4 = await new Prompts({number: 4, prompt: "none"});
//  var newPrompt5 = await new Prompts({number: 5, prompt: "none"});
//  var newPrompt6 = await new Prompts({number: 6, prompt: "none"});
//  var newPrompt7 = await new Prompts({number: 7, prompt: "none"});
//  var newPrompt8 = await new Prompts({number: 8, prompt: "none"});
//  var newPrompt9 = await new Prompts({number: 9, prompt: "none"});
//  var newPrompt10 = await new Prompts({number: 10, prompt: "none"});
//
//  await newPrompt1.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt2.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt3.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt4.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt5.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt6.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt7.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt8.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt9.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//  await newPrompt10.save((err, data) => {
//    if(err) return console.log(err);
//    console.log(data);
//  })
//}
//
//addPrompts();


//app.use(express.static('img'));

//const nodemailer = require('nodemailer');
//var transport = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//     user: '',
//     pass: process.env.EMAIL_PASS,
//  }
//});
//let http = require('http');
//const fs = require('fs');

// RTSP Stream Converter //

//const Stream = require('node-rtsp-stream-es6');
//
//const options = {
//  name: 'Dance Performance',
//  url: 'rtsp://107.138.172.180:10554/live',
//  port: 51000
//}
//
//var stream = new Stream(options, (err) => {
//  if (err) return console.log(err);
//  console.log("new stream created.")
//})
//
//stream.start();
//
//const WebSocket = require('ws')
//const ws = new WebSocket('ws://localhost:51000')
//
//ws.on('open', () => {
//  console.log('Connected to webSocket stream')
//})
//
//ws.on('message', (data, flags) => {
//  console.log(data)
//})

//var dgram = require('dgram');
//var client = dgram.createSocket('udp4');
//var message = "udp system test"

var PORT = 64652;
var HOST = '107.138.172.180';
var HOST2 = '73.198.71.217';

//client.on('listening', function () {
//  var address = client.address();
//  console.log('UDP Server listening on ' + address.address + ":" + address.port);
//});
//
//client.on('message', function (message, remote) {
//
//  console.log(remote.address + ':' + remote.port +' - ' + message);
//
//});
//
//client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
//
//  if (err) throw err;
//  console.log('UDP message sent to ' + HOST +':'+ PORT);
//
//});

const { 
  Client, 
  //Server//
} = require('node-osc');
const { appendFile } = require('fs');
const { start } = require('repl');
const { getMaxListeners } = require('process');
const e = require('express');

const clientSend = new Client(HOST, PORT);
const clientSend2 = new Client(HOST2, PORT)

//clientSend.send("test", "send", (err) => {
//  if (err) console.error(err);
//  clientSend.close();
//});

//clientSend.send('/hello', 'world', (err) => {
//  if (err) console.error(err);
//  client.close();
//});


// HTML Routing // 

// Main Show //
app.get('/cynz7zz2r6gapuwj', async (req, res) => {
  //await Viewers.findOne({number: 1}, async (err, data) => {
  //  if (err) return console.log(err);
  //  var newViewerCount = data.viewers + 1; 
  //  await Viewers.updateOne({number:1}, {$set: {viewers: newViewerCount}}, (err2, data2) => {
  //    if(err2) console.log(err2);
  //    console.log(data2);
  //  })
  //})
  console.log("route works.");
  res.sendFile(__dirname + "/public/show.html");
})

// Host Page //
app.get('/gnm6dasgkf33abx4', (req, res) => {
  res.sendFile(__dirname + "/public/host-page.html")
})

app.get('/loginpage', (req, res) => {
  //res.sendFile(__dirname + "/public/login.html")
  res.redirect('/');
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/ticket-check.html")
})

app.get('/pageclose', async (req, res) => {
  //await console.log("pageclose called");
  //console.log("pageclose called")
  //await Viewers.findOne({number: 1}, async (err, data) => {
  //  if(err) return console.log(err);
  //  if(data.viewers == 0) {
  //    console.log("viewers already 0");
  //  }
  //  if(data.viewers > 0) {
  //    var newViewers = data.viewers - 1;
  //    await Viewers.updateOne({number: 1}, {$set: {viewers: newViewers}})
  //  }
  //})
  //res.end();
})

app.get("/pagetest", (req, res) => {
  console.log("page test");
  res.end();
})

app.get('/viewerupdate', async (req, res) => {
  console.log("viewerupdate called.")
  await Viewers.findOne({number: 1}, async (err, data) => {
    if (err) return console.log(err);
    var newViewerCount = data.viewers + 1; 
    await Viewers.updateOne({number:1}, {$set: {viewers: newViewerCount}}, (err2, data2) => {
      if(err2) console.log(err2);
      console.log(data2);
    })
  })
})

app.get('/checkviewers', async (req, res) => {
  var viewerCount = {
    viewers: ''
  }
  await Viewers.findOne({number: 1}, (err, data) => {
    if(err) return console.log(err);
    viewerCount.viewers = data.viewers;
    res.send(viewerCount);
  })
})

//Agreement Page//

app.get('/hgqv7c96m6zdcp6e', async (req, res) => {
  console.log(req.session.sessionID);
  var sessionCall = req.session.sessionID;
  await Events.findOne({eventId: sessionCall}, async (err, data) => {
    console.log(data);
    if (err) return console.log(err);
    if(data === null) {
      await TestEvents.findOne({eventId: sessionCall}, (err2, data2) => {
        console.log("this is data2: " + data2);
        if (err2) return console.log(err2);
        if(data2 === null) {
          console.log("this is the sessionID: " + req.session.sessionID);
          if(sessionCall == null || sessionCall == undefined || sessionCall == "none") {
            res.sendFile(__dirname + "/public/no-ticket.html")
          }
          if(sessionCall !== null && sessionCall !== undefined && sessionCall !== "none") {
            res.sendFile(__dirname + "/public/wrong-time.html");
          }
        }
        if(data2 !== null) {
          console.log("data is not null")
          res.sendFile(__dirname + "/public/agreements.html")
        }
      })
    }
    if(data !== null) {
      res.sendFile(__dirname + "/public/agreements.html")
    }
  })
  //res.end();
})

app.get('/timeleft', (req, res) => {
  var timeLeftJSON = {
    timeLeft: req.session.sessionID
  }
  res.send(timeLeftJSON)
})

app.get("/thankyou", (req, res) => {
  res.sendFile(__dirname + "/public/thank-you-page.html")
})

app.get('/termsbroken', (req, res) => {
  res.sendFile(__dirname + "/public/terms-broken.html")
})

app.get('/agreementtest', (req, res) => {
  console.log("agreements page called.")
  res.sendFile(__dirname + "/public/agreements.html")
})

app.get('/notickettest', (req, res) => {
  res.sendFile(__dirname + "/public/no-ticket.html")
})

app.get('/waitingroomtest', (req, res) => {
  app.set("waiting", true);
  res.sendFile(__dirname + "/public/waiting-room.html")
})

//Finished Agreements / Waiting Room //

app.get('/krusw76dm5zkenpd', async (req, res) => {
  await Events.findOne({eventId: req.session.sessionID}, async (err, data) => {
    if(err) return console.log(err);
    console.log(data);
    if(data === null) {
      await TestEvents.findOne({eventId: req.session.sessionID}, async (err, data2) => {
        if(err) return console.log(err);
        console.log("this is the test event krus data: " + data)
        if(data2 !== null) {
          app.set("waiting", true);
          res.sendFile(__dirname + "/public/waiting-room.html");
        }
        if(data2 == null) {
          res.sendFile(__dirname + "/public/no-ticket.html");
        }
      })
    }
    if(data !== null) {
      app.set("waiting", true);
      await WaitingRoom.findOne({number: 1}, async (err, data) => {
        if(err) console.log(err); 
        console.log(data);
        CurrentUser.updateOne({number: 1}, {$set: {email: data.email}}, (err, data) => {if(err) console.log(err); console.log(data)});
      });
      res.sendFile(__dirname + "/public/waiting-room.html")
    }
  })
})

app.get('/checkwaiting', (req, res) => {
  var waitingCheck = {
    waiting: false
  }
  if(app.get("waiting") == true) {
    waitingCheck.waiting = true
    res.send(waitingCheck);
  }
  if(app.get("waiting") == false) {
    waitingCheck.waiting = false;
    res.send(waitingCheck);
  }
  if(app.get("waiting") !== true && app.get("waiting") !== false) {
    res.send(waitingCheck);
  }
})

app.get('/checkwaitinguser', async (req, res) => {
  var userEmail = {
    email: ''
  }
  await WaitingRoom.findOne({number: 1}, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
    userEmail.email = data.email;
    res.send(userEmail)
  })
})

app.get('/checkuser', async (req, res) => {
  var userEmail = {
    email: ''
  }
  await CurrentUser.findOne({number: 1}, (err, data) => {
    if (err) return console.log(err);
    console.log("this is the currentUser: " + data);
    userEmail.email = data.email;
    res.send(userEmail)
  })
})

app.get('/cT6sq5TDTUj3ZNxL', (req, res) => {
  app.set("waiting", true);
  res.sendFile(__dirname + "/public/waiting-room.html")
})

// Test Send // 
app.get('/udptest', (req, res) => {
  clientSend.send("test", "send", (err) => {
    if (err) console.error(err);
    clientSend.close();
  });
  res.end();
})


// Eventbrite API Routing // 

app.get('/gotoeventbrite', (req, res) => {
  const url2 = 'https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=VJOPC2BN2IE45NO7GN&redirect_uri=https://litmusdance.com/eventbritetickets/';
  const urlsend = {
    url: url2
  }
  res.send(urlsend);
})

app.get('/eventbriteAuth', (req, res) => {
  const url = 'https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=APGQISIOQWKMUPEQDS&redirect_uri=https://litmusdance.com/eventbriteres/';
  const url2 = 'https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=VJOPC2BN2IE45NO7GN&redirect_uri=http://localhost:50000/eventbritetickets/';
  res.send(url);
})

app.get('/checktime', (req, res) => {
  var d = new Date(); // current time
  var hours = d.getHours();
  var mins = d.getMinutes();
  var day = d.getDate();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  console.log(hours);
  console.log(mins);
  //console.log(month);
  //console.log(day);
  //console.log(year);

  if(day == 0 || day == 1 || day == 2 || day == 3 || day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9) {
    day = "0" + day
  }

  if(month == 0 || month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
    month = "0" + month;
  }

  if(hours == 0 || hours == 1 || hours == 2 || hours == 3 || hours == 4 || hours == 5 || hours == 6 || hours == 7 || hours == 8 || hours == 9) {
    hours = "0" + hours
  }

  if(mins == 0 || mins == 1 || mins == 2 || mins == 3 || mins == 4 || mins == 5 || mins == 6 || mins == 7 || mins == 8 || mins == 9) {
    mins = "0" + mins;
  }

  var fullMinutes = hours * 60 + mins;
  console.log(fullMinutes);

  // Current Time //

  var currentDate = year + "-" + month + "-" + day;
  var currentTime = hours + ":" + mins + ":00";
  console.log(currentDate);
  console.log(currentTime);

  //Event Time //

  Events.findOne({eventId: 151214834641}, (err, data) => {
    if (err) return console.log(err);
    //console.log(data.start);

    // Start Times //
    var timeSplitStart = data.start.split("T");
    var startDate = timeSplitStart[0];
    var startTime = timeSplitStart[1];
    var realStartTime = startTime.replace("Z", "");
    var realStartTimeSplit = realStartTime.split(":");
    var realStartHour = realStartTimeSplit[0];
    var realStartMinutes = realStartTimeSplit[1];
    var realStartFullMinutes = parseInt(realStartHour) * 60 + parseInt(realStartMinutes);
    console.log(realStartFullMinutes);

    // End Times //
    var timeSplitEnd = data.end.split("T");
    var endDate = timeSplitEnd[0];
    var endTime = timeSplitEnd[1];
    var realEndTime = endTime.replace("Z", "")
    var realEndTimeSplit = realEndTime.split(":");
    var realEndHour = realEndTimeSplit[0];
    var realEndMinutes = realEndTimeSplit[1];
    var realEndFullMinutes = parseInt(realEndHour) * 60 + parseInt(realEndMinutes);
    console.log(realEndFullMinutes);

    // Time Logs //
    //console.log(startDate);
    //console.log(realStartTime);
    //console.log(endDate);
    //console.log(realEndTime);

    if(realEndFullMinutes < realStartFullMinutes) {
      realEndFullMinutes = realEndFullMinutes + 1440;
      fullMinutes = fullMinutes + 1440;
    }

    // Time Cross-Reference //
    if(currentDate == startDate || currentDate == endDate && currentTime >= realStartFullMinutes && currentTime <= realEndFullMinutes) {
      
    }
  })
    res.end();
})

app.get('/dataTest', async (req, res) => {
  var currentDate = new Date();
  var currentDateParse = Date.parse(currentDate);
  await Events.find({start: {"$exists": true}}, async (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      var startTime = data[i].start;
      var startTimeParse = Date.parse(startTime);
      var dataI = data[i];
      if(currentDateParse > startTimeParse) {
        await Events.remove({eventId: data[i].eventId}, (err, removeData) => {
          if(err) console.log(err);
          console.log("Event Deleted: " + removeData);
        })
      }
      var duplicateCount = [];
      await Events.countDocuments({eventId: dataI.eventId}, async (err, count) => {
        if (err) return console.log(err);
        console.log("this is the count: " + count)
        console.log(dataI);
        if(count > 1) {
          await Events.find({eventId: dataI.eventId}, (req, res) => {
            for(var y = 0; y < res.length; y++) {
              duplicateCount.push(res[y]._id);
            }
            duplicateCount.shift();
          })
          .then(
            await Events.remove({_id: {$in: duplicateCount}}, 
              (err, response) => {
                if(err) return console.log(err);
                console.log("duplicate document deleted: ")
                console.log(response);
              }
            )
          )
        }
      }) 
    }
  })
  await TestEvents.find({start: {"$exists": true}}, async (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      var startTime = data[i].start;
      var startTimeParse = Date.parse(startTime);
      var dataI = data[i];
      if(currentDateParse > startTimeParse) {
        await TestEvents.remove({eventId: data[i].eventId}, (err, removeData) => {
          if(err) console.log(err);
          console.log("Event Deleted: " + removeData);
        })
      }
      var duplicateCount = [];
      await TestEvents.countDocuments({eventId: dataI.eventId}, async (err, count) => {
        if (err) return console.log(err);
        console.log("this is the count: " + count)
        console.log(dataI);
        if(count > 1) {
          await TestEvents.find({eventId: dataI.eventId}, (req, res) => {
            for(var y = 0; y < res.length; y++) {
              duplicateCount.push(res[y]._id);
            }
            duplicateCount.shift();
          })
          .then(
            await TestEvents.remove({_id: {$in: duplicateCount}}, 
              (err, response) => {
                if(err) return console.log(err);
                console.log("duplicate document deleted: ")
                console.log(response);
              }
            )
          )
        }
      }) 
    }
  })
  res.end();
})

app.get('/datatest2', async (req, res) => {
  var currentDate = new Date();
  var currentDateParse = Date.parse(currentDate);
  await Events.find({start: {"$exists": true}}, async (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      var startTime = data[i].start;
      var startTimeSplit = startTime.split("Z");
      var startTimeParse = Date.parse(startTimeSplit[0]);
      var dataI = data[i];
      if(currentDateParse > startTimeParse) {
        await Events.remove({eventId: dataI.eventId}, (err, removeData) => {
          if(err) console.log(err);
          console.log("Event Deleted: " + dataI);
        })
      }
      var duplicateCount = [];
      await Events.countDocuments({eventId: dataI.eventId}, async (err, count) => {
        if (err) return console.log(err);
        console.log("this is the count: " + count)
        console.log(dataI);
        if(count > 1) {
          await Events.find({eventId: dataI.eventId}, (req, res) => {
            for(var y = 0; y < res.length; y++) {
              duplicateCount.push(res[y]._id);
            }
            duplicateCount.shift();
          })
          .then(
            await Events.remove({_id: {$in: duplicateCount}}, 
              (err, response) => {
                if(err) return console.log(err);
                console.log("duplicate document deleted: ")
                console.log(response);
              }
            )
          )
        }
      }) 
    }
  })
  await TestEvents.find({start: {"$exists": true}}, async (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      var startTime = data[i].start;
      var startTimeSplit = startTime.split("Z");
      var startTimeParse = Date.parse(startTimeSplit[0]);
      var dataI = data[i];
      if(currentDateParse > startTimeParse) {
        await TestEvents.remove({eventId: dataI.eventId}, (err, removeData) => {
          if(err) console.log(err);
          console.log("Event Deleted: " + dataI);
        })
      }
      var duplicateCount = [];
      await TestEvents.countDocuments({eventId: dataI.eventId}, async (err, count) => {
        if (err) return console.log(err);
        console.log("this is the count: " + count)
        console.log(dataI);
        if(count > 1) {
          await TestEvents.find({eventId: dataI.eventId}, (req, res) => {
            for(var y = 0; y < res.length; y++) {
              duplicateCount.push(res[y]._id);
            }
            duplicateCount.shift();
          })
          .then(
            await TestEvents.remove({_id: {$in: duplicateCount}}, 
              (err, response) => {
                if(err) return console.log(err);
                console.log("duplicate document deleted: ")
                console.log(response);
              }
            )
          )
        }
      }) 
    }
  })
  Events.remove({start: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  Events.remove({end: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  TestEvents.remove({start: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  TestEvents.remove({end: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
})

app.get("/eventbriteres/*", async (req, res) => {
  var authCode = req.query.code;
  //console.log(authCode);
  let newToken = ""
  let tokenPost = await fetch('https://www.eventbrite.com/oauth/token', {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=authorization_code&client_id=APGQISIOQWKMUPEQDS&client_secret=NEOQYWDMP4Q65B2XJO6TPX5FXQJM2MN6SB2YF25OHQPVTHYD6K&code=' + authCode + '&redirect_uri=https://litmusdance.com/eventbriteres/'
  })
  let tokenRes = await tokenPost.json()
  console.log("this is the access token: " + tokenRes.access_token);
  let getProfile = await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/?token=' + tokenRes.access_token);
  let profile = await getProfile.json();
  console.log(profile)
  let profileId = profile.organizations[0].id;
  console.log("this is the profileId: " + profileId)

  let showsRequest = await fetch('https://www.eventbriteapi.com/v3/organizations/' + profileId + '/events?token=' + tokenRes.access_token);
  let shows = await showsRequest.json();
  //console.log(shows.pagination)
  var showStore = [];
  var currentDate = new Date();
  var currentDateParse = Date.parse(currentDate);
  if(shows.pagination.page_count === 1) {
    for(var ii = 0; ii < shows.events.length; ii++) {
      var showEnd = shows.events[ii].end;
      var showEndSplit = showEnd.split("Z");
      var showEndParse = Date.parse(showEndSplit[0]);
      if(showEndParse > currentDateParse) {
        showStore.push(
          {
            url: shows.events[i].url,
            start: shows.events[i].start.utc,
            end: shows.events[i].end.utc
          }
        )
      }
    }
  }
  if(shows.pagination.page_count > 1) {
    var pageForLoop = shows.pagination.page_count;
    var continuation = shows.pagination.continuation;
    var saveToken = []
    for(var jj = 0; jj < pageForLoop; jj++) {
      let nextPageFetch = await fetch('https://www.eventbriteapi.com/v3/organizations/' + profileId + '/events?token=' + tokenRes.access_token + "&continuation=" + continuation);
      let nextPage = await nextPageFetch.json();
      //console.log(nextPage.pagination);
      continuation = nextPage.pagination.continuation;
      saveToken.push({
        number: jj,
        token: continuation,
      })
      for(var jj2 = 0; jj2 < nextPage.events.length; jj2++) {
        var showEnd = nextPage.events[jj2].end.utc
        var showEndSplit = showEnd.split("Z");
        var showEndParse = Date.parse(showEndSplit[0]);
        //console.log(showStartParse);
        if(showEndParse > currentDateParse) {
          showStore.push(
            {
              url: nextPage.events[jj2].url,
              start: nextPage.events[jj2].start.utc,
              end: nextPage.events[jj2].end.utc
            }
          )
        }
      }
      if(continuation === undefined) {
        for(var jjj2 = 0; jjj2 < nextPage.events.length; jjj2++) {
          var showEnd = nextPage.events[jjj2].end.utc
          var showEndSplit = showEnd.split("Z");
          var showEndParse = Date.parse(showEndSplit[0]);
          if(showEndParse > currentDateParse) { 
            showStore.push(
              {
                url: nextPage.events[jjj2].url,
                start: nextPage.events[jjj2].start.utc,
                end: nextPage.events[jjj2].end.utc
              }
            )
          }
        }
        break;
      }
    }
    console.log(showStore.length);
  }
  //let eventId1 = shows.events[1].id;
  //console.log(shows.events[1]);
  //console.log("this is the eventId" + eventId1)
  //let attendeesRequest = await fetch('https://www.eventbriteapi.com/v3/events/' + eventId1 + '/attendees?token=' + tokenRes.access_token);
  //let attendees = await attendeesRequest.json();
  ///console.log(attendees);
  //console.log(shows);
  //console.log(shows.events[1].start);
  //console.log(shows.events[1].end);
  //var urlSplit = shows.events[1].url.split("-");
  //console.log(urlSplit);
  //console.log(parseInt(urlSplit[2]))


  for(var i = 0; i < showStore.length; i++) {
    //console.log(shows.events[i].url)
    if(showStore[i].url.includes("https://www.eventbrite.com/e/litmus-tickets-") === true) {
      var showUrlSplit = showStore[i].url.split('-');
      var showId = showUrlSplit[2];
      var showStart = showStore[i].start
      var showEnd = showStore[i].end
      //console.log(showId)
      await Events.findOne({eventId: showId}, (err, data) => {
        if(err) return console.log(err);
        if(data === null) {
          var addedEvent = new Events({eventId: showId, start: showStart, end: showEnd});      
          addedEvent.save(function(err, data) {
            if (err) return console.error(err);
            console.log("this is the new event: " + data);
          });
        }
        if(data !== null) {
          //console.log("this is the data: " + data)
        }
      })
      //if(Events.count({eventId: {showId}}) === 0) {
      //  var addedEvent = new Event({eventId: showId});      
      //  addedEvent.save(function(err, data) {
      //    if (err) return console.error(err);
      //    console.log(data);
      //  });
      //}
      if(Events.count({eventId: showId}) < 0) {console.log("event already added")};
      //Events.findOne({eventId: showId}, (err, data) => {
      //  if(err) return console.log(err); 
      //  console.log(data); 
      //});     
    }
    if(showStore[i].url.includes("https://www.eventbrite.com/e/litmus-test-tickets-") === true) {
      var showUrlSplit2 = showStore[i].url.split('-');
      var showId2 = showUrlSplit2[3];
      var showStart2 = showStore[i].start;
      var showEnd2 = showStore[i].end;

      await TestEvents.findOne({eventId: showId2}, (err, data) => {
        if(err) return console.log(err);
        if(data == null) {
          var addedEvent2 = new TestEvents({eventId: showId2, start: showStart2, end: showEnd2});      
          addedEvent2.save(function(err, data) {
            if (err) return console.error(err);
            console.log("this is the new event: " + data);
          });
        }
        if(data !== null) {
          //console.log("this is the data: " + data)
        }
      })
    }
  }
  var currentDate = new Date();
  var currentDateParse = Date.parse(currentDate);
  await Events.find({start: {"$exists": true}}, async (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      var endTime = data[i].end;
      var endTimeSplit = endTime.split("Z");
      var endTimeParse = Date.parse(endTimeSplit[0]);
      var dataI = data[i];
      if(currentDateParse > endTimeParse) {
        await Events.remove({eventId: dataI.eventId}, (err, removeData) => {
          if(err) console.log(err);
          console.log("Event Deleted: " + dataI);
        })
      }
      var duplicateCount = [];
      await Events.countDocuments({eventId: dataI.eventId}, async (err, count) => {
        if (err) return console.log(err);
        console.log("this is the count: " + count)
        console.log(dataI);
        if(count > 1) {
          await Events.find({eventId: dataI.eventId}, (req, res) => {
            for(var y = 0; y < res.length; y++) {
              duplicateCount.push(res[y]._id);
            }
            duplicateCount.shift();
          })
          .then(
            await Events.remove({_id: {$in: duplicateCount}}, 
              (err, response) => {
                if(err) return console.log(err);
                console.log("duplicate document deleted: ")
                console.log(response);
              }
            )
          )
        }
      }) 
    }
  })
  await TestEvents.find({start: {"$exists": true}}, async (err, data) => {
    if (err) return console.log(err);
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      var endTime = data[i].end;
      var endTimeSplit = endTime.split("Z");
      var endTimeParse = Date.parse(endTimeSplit[0]);
      var dataI = data[i];
      if(currentDateParse > endTimeParse) {
        await TestEvents.remove({eventId: dataI.eventId}, (err, removeData) => {
          if(err) console.log(err);
          console.log("Event Deleted: " + dataI);
        })
      }
      var duplicateCount = [];
      await TestEvents.countDocuments({eventId: dataI.eventId}, async (err, count) => {
        if (err) return console.log(err);
        console.log("this is the count: " + count)
        console.log(dataI);
        if(count > 1) {
          await TestEvents.find({eventId: dataI.eventId}, (req, res) => {
            for(var y = 0; y < res.length; y++) {
              duplicateCount.push(res[y]._id);
            }
            duplicateCount.shift();
          })
          .then(
            await TestEvents.remove({_id: {$in: duplicateCount}}, 
              (err, response) => {
                if(err) return console.log(err);
                console.log("duplicate document deleted: ")
                console.log(response);
              }
            )
          )
        }
      }) 
    }
  })
  await Events.remove({start: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  await Events.remove({end: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  await TestEvents.remove({start: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  await TestEvents.remove({end: {"$exists": false}}, (err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  res.end();
})

app.get('/eventbritetickets/*', async (req, res) => {
  console.log("eventbritetickets called")
  //req.session.sessionID = "none";
  var authCode = req.query.code;
  //console.log(authCode);
  let newToken = ""
  let tokenPost = await fetch('https://www.eventbrite.com/oauth/token', {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=authorization_code&client_id=VJOPC2BN2IE45NO7GN&client_secret=VEQJAOGNEMJG56XH2U6LT3UKV733XEO6JPPK2QES7K2KYJXKHS&code=' + authCode + '&redirect_uri=http://litmusdance.com/eventbriteres/'
  })
  let tokenRes = await tokenPost.json()
  console.log("this is the access token: " + tokenRes.access_token);
  let getProfile = await fetch('https://www.eventbriteapi.com/v3/users/me/orders?token=' + tokenRes.access_token);
  let profile = await getProfile.json();
  //console.log("this is the profile");
  console.log(profile)
  var matchingIds = [];
  var emailSave = null
  if(profile.pagination.page_number == 1 && profile.pagination.page_count == 1) { 
    for (var i = 0; i < profile.orders.length; i++) {
      await Events.findOne({eventId: profile.orders[i].event_id}, (err, data) => {
        if (err) return console.log(err);
        console.log(data);
        if(data !== null) {
          matchingIds.push(data.eventId);
          if(typeof profile.orders[i].email === undefined) {
            emailSave = "none";
          }
          if(typeof profile.orders[i].email !== undefined) {
            emailSave = profile.orders[i].email;
          }
          console.log(emailSave);
        }
      })
      await TestEvents.findOne({eventId: profile.orders[i].event_id}, (err, data) => {
        if (err) return console.log(err);
        console.log("first test event: " + data);
        if(data !== null) {
          matchingIds.push(data.eventId);
          
          if(typeof profile.orders[i].email === undefined) {
            emailSave = "none";
          }
          if(typeof profile.orders[i].email !== undefined) {
            emailSave = profile.orders[i].email;
          }
          console.log(emailSave);
        }
      })
    }
  }
  if(profile.pagination.page_count > 1) {
    for (var i = 0; i < profile.orders.length; i++) {
      emailSave;
      await Events.findOne({eventId: profile.orders[i].event_id}, async (err, data) => {
        emailSave;
        if (err) return console.log(err);
        //console.log("first test event: " + data);
        if(data !== null) {
          matchingIds.push(data.eventId);
          emailSave = await profile.orders[i].email;
          console.log(emailSave);
        }
      })
      await TestEvents.findOne({eventId: profile.orders[i].event_id}, async (err, data) => {
        emailSave;
        if (err) return console.log(err);
        //console.log("first test event: " + data);
        if(data !== null) {
          matchingIds.push(data.eventId);
          emailSave = await profile.orders[i].email;
          console.log(emailSave);
        }
      })
    }
    var pageForLoop = profile.pagination.page_count;
    var continuation = profile.pagination.continuation;
    var saveToken = [];
    for(var jj = 0; jj < pageForLoop; jj++) {
      let nextPageFetch = await fetch('https://www.eventbriteapi.com/v3/users/me/orders?token=' + tokenRes.access_token + "&continuation=" + continuation);
      let nextPage = await nextPageFetch.json();
      continuation = nextPage.pagination.continuation;
      saveToken.push({
        number: jj,
        token: continuation,
      })
      for(var jj2 = 0; jj2 < nextPage.orders.length; jj2++) {
        await Events.findOne({eventId: nextPage.orders[jj2].event_id}, async (err, data) => {
          emailSave;
          nextPage;
          if (err) return console.log(err);
          console.log(data);
          if(data !== null) {
            matchingIds.push(data.eventId);
            emailSave = await nextPage.orders[jj2].email;
          }
        })
        await TestEvents.findOne({eventId: nextPage.orders[jj2].event_id}, async (err, data) => {
          emailSave;
          nextPage;
          if (err) return console.log(err);
          console.log(data);
          if(data !== null) {
            matchingIds.push(data.eventId);
            emailSave = await nextPage.orders[jj2].email;
          }
        })
      }
      if(continuation == undefined) {
        for(var jj3 = 0; jj3 < nextPage.orders.length; jj3++) {
          //console.log(nextPage.orders[jj3]);
          await Events.findOne({eventId: nextPage.orders[jj3].event_id}, async (err, data) => {
            emailSave;
            nextPage;
            if (err) return console.log(err);
            console.log(data);
            if(data !== null) {
              matchingIds.push(data.eventId);
              emailSave = await nextPage.orders[jj3].email;
            }
          })
          await TestEvents.findOne({eventId: nextPage.orders[jj3].event_id}, async (err, data) => {
            emailSave;
            nextPage;
            console.log("this is the nextPage email: " + nextPage.orders[jj3].email);
            //console.log(nextPage.orders);
            if (err) return console.log(err);
            console.log(data);
            if(data !== null) {
              matchingIds.push(data.eventId);
              emailSave = await nextPage.orders[jj3].email
            }
          })
        }
        break;
      }
    }
  }
  console.log("these are the matching Ids" + matchingIds);
  console.log('this is the email save' + emailSave)
  if(matchingIds.length == 0) {
    req.session.sessionID = "none"
  }
  if(matchingIds.length == 1) {
    await Events.findOne({eventId: matchingIds[0]}, (err, data) => {
      emailSave;
      if(err) return console.log(err);
      if (data !== null) {
        //console.log(data);
        var d = new Date(); // current time
        var currentTime = Date.parse(d);

        //var hours = d.getHours();
        //var mins = d.getMinutes();
        var day = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        // Time Structuring
        if(day == 0 || day == 1 || day == 2 || day == 3 || day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9) {
          day = "0" + day
        }      
        if(month == 0 || month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
          month = "0" + month;
        }      

        //var fullMinutes = hours * 60 + mins;
        //console.log("full minutes: " + fullMinutes);
      
        // Current Time //
      
        var currentDate = year + "-" + month + "-" + day;
        //var currentTime = hours + ":" + mins + ":00";
        //console.log(currentDate);
        //console.log(currentTime);

        // Start Times //
        var timeSplitStart = data.start.split("T");
        var startDate = timeSplitStart[0];
        var timeSplitTimeStart = data.start.split("Z");
        var startTime = Date.parse(timeSplitTimeStart[0]);
        //var startTime = timeSplitStart[1];
        //console.log(startDate);
        //console.log(startTime);
        //var realStartTime = startTime.replace("Z", "");
        //var realStartTimeSplit = realStartTime.split(":");
        //var realStartHour = realStartTimeSplit[0];
        //var realStartMinutes = realStartTimeSplit[1];
        //console.log("real start hour: " + realStartHour);
        //console.log("real start mins: " + realStartMinutes);
        //var realStartFullMinutes = parseInt(realStartHour) * 60 + parseInt(realStartMinutes);
        //console.log("real start full minutes: " + realStartFullMinutes);

        // End Times //
        var timeSplitEnd = data.end.split("T");
        var endDate = timeSplitEnd[0];
        var timeSplitTimeEnd = data.end.split("Z");
        var endTime = Date.parse(timeSplitTimeEnd[0]);
        //var endTime = timeSplitEnd[1];
        //var realEndTime = endTime.replace("Z", "")
        //var realEndTimeSplit = realEndTime.split(":");
        //var realEndHour = realEndTimeSplit[0];
        //var realEndMinutes = realEndTimeSplit[1];
        //var realEndFullMinutes = parseInt(realEndHour) * 60 + parseInt(realEndMinutes);
        //console.log("real end full minutes: " + realEndFullMinutes);

        // Time Logs //
        //console.log(startDate);
        //console.log(realStartTime);
        //console.log(endDate);
        //console.log(realEndTime);
        console.log("this is the current date: " + currentDate);
        console.log("this is the start date: " + startDate);
      
        // Time Cross-Reference //
        if(currentDate == startDate && currentTime >= startTime && currentTime <= endTime || currentDate == endDate && currentTime >= startTime && currentTime <= endTime) {
          if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
            req.session.sessionID = "none";
          }
          console.log("time is now");
          console.log(data);
          console.log("this is the saved email: " + emailSave)
          req.session.sessionID = data.eventId;
          console.log(req.session.sessionID)
          WaitingRoom.updateOne({number: 1}, {$set: {email: emailSave}}, (err, data) => {if(err) console.log(err); console.log(data)});
        }
        if(currentDate == startDate && currentTime < startTime || currentDate == endDate && currentTime < startTime) {
          if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
            req.session.sessionID = "none";
          }
          console.log("this is not now");
          var timeLeft = startTime - currentTime;
          var minutesLeft = Math.floor(timeLeft / 60000);
          req.session.sessionID = minutesLeft;
          console.log("timeleft is set: " + req.session.sessionID);
        }
        if(currentDate !== startDate && currentDate !== endDate) {
          req.session.sessionID = "none"
        }
      }
    })
    req.session.sessionID = req.session.sessionID;
    await TestEvents.findOne({eventId: matchingIds[0]}, (err, data) => {
      emailSave;
      if(err) return console.log(err);
      if (data !== null) {
        console.log(data);
        var d = new Date(); // current time
        var currentTime = Date.parse(d);

        //var hours = d.getHours();
        //var mins = d.getMinutes();
        var day = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        // Time Structuring
        if(day == 0 || day == 1 || day == 2 || day == 3 || day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9) {
          day = "0" + day
        }      
        if(month == 0 || month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
          month = "0" + month;
        }      

        //var fullMinutes = hours * 60 + mins;
        //console.log("full minutes: " + fullMinutes);
      
        // Current Time //
      
        var currentDate = year + "-" + month + "-" + day;
        //var currentTime = hours + ":" + mins + ":00";
        //console.log(currentDate);
        //console.log(currentTime);

        // Start Times //
        var timeSplitStart = data.start.split("T");
        var startDate = timeSplitStart[0];
        var timeSplitTimeStart = data.start.split("Z");
        var startTime = Date.parse(timeSplitTimeStart[0]);
        //var startTime = timeSplitStart[1];
        //console.log(startDate);
        //console.log(startTime);
        //var realStartTime = startTime.replace("Z", "");
        //var realStartTimeSplit = realStartTime.split(":");
        //var realStartHour = realStartTimeSplit[0];
        //var realStartMinutes = realStartTimeSplit[1];
        //console.log("real start hour: " + realStartHour);
        //console.log("real start mins: " + realStartMinutes);
        //var realStartFullMinutes = parseInt(realStartHour) * 60 + parseInt(realStartMinutes);
        //console.log("real start full minutes: " + realStartFullMinutes);

        // End Times //
        var timeSplitEnd = data.end.split("T");
        var endDate = timeSplitEnd[0];
        var timeSplitTimeEnd = data.end.split("Z");
        var endTime = Date.parse(timeSplitTimeEnd[0]);
        //var endTime = timeSplitEnd[1];
        //var realEndTime = endTime.replace("Z", "")
        //var realEndTimeSplit = realEndTime.split(":");
        //var realEndHour = realEndTimeSplit[0];
        //var realEndMinutes = realEndTimeSplit[1];
        //var realEndFullMinutes = parseInt(realEndHour) * 60 + parseInt(realEndMinutes);
        //console.log("real end full minutes: " + realEndFullMinutes);

        // Time Logs //
        //console.log(startDate);
        //console.log(realStartTime);
        //console.log(endDate);
        //console.log(realEndTime);
        console.log("this is the current date: " + currentDate);
        console.log("this is the start date: " + startDate);
      
        // Time Cross-Reference //
        if(currentDate == startDate && currentTime >= startTime && currentTime <= endTime || currentDate == endDate && currentTime >= startTime && currentTime <= endTime) {
          if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
            req.session.sessionID = "none";
          }
          console.log("time is now");
          console.log(data);
          console.log("this is the saved email: " + emailSave)
          req.session.sessionID = data.eventId;
          console.log(req.session.sessionID)
          WaitingRoom.updateOne({number: 1}, {$set: {email: emailSave}}, (err, data) => {if(err) console.log(err); console.log(data)});
        }
        if(currentDate == startDate && currentTime < startTime || currentDate == endDate && currentTime < startTime) {
          if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
            req.session.sessionID = "none";
          }
          console.log("this is not now");
          var timeLeft = startTime - currentTime;
          var minutesLeft = Math.floor(timeLeft / 60000);
          req.session.sessionID = minutesLeft;
          console.log("timeleft is set: " + req.session.sessionID);
        }
        if(currentDate !== startDate && currentDate !== endDate) {
          req.session.sessionID = "none"
        }
      }
    })
  }
  if(matchingIds.length > 1) {
    var lowestTime = 8000000000000000;
    var lowestId = null;
    var times = [];
    console.log("second matching ids: " + matchingIds)
    for(var y = 0; y < matchingIds.length; y++) {
      console.log(matchingIds[y]);
      await Events.find({eventId: matchingIds[y]}, (err, data) => {
        if(err) return console.log(err);
        console.log("this is the testevent data: " + data);
        if(data.length !== 0) {
          for(var k = 0; k < data.length; k++) {
            var currentDate = new Date()
            var currentDateParse = Date.parse(currentDate);
            var startTime = data[k].start;
            console.log(startTime);
            var startTimeSplit = startTime.split("Z");
            var startTimeParse = Date.parse(startTimeSplit[0]);
            var timeDifference = startTimeParse - currentDateParse;

            times.push(
              {
                eventId: data[k].eventId, 
                start: timeDifference
              }
            )
          }
          console.log("these are the times");
          console.log(times);
          for(var j = 0; j < times.length; j++) {
            console.log("time loop called")
            if(times[j].start < lowestTime && times[j].start >= -1800000) {
              console.log("time loop 2 called")
              lowestTime = times[j].start;
              lowestId = times[j].eventId;
              console.log("this is the lowest Id: " + lowestId);
            }
          }
          lowestId;
        }
        lowestId;
      })
      lowestId;
      await TestEvents.find({eventId: matchingIds[y]}, (err, data) => {
        if(err) return console.log(err);
        console.log("this is the testevent data: " + data);
        if(data.length !== 0) {
          for(var k = 0; k < data.length; k++) {
            var currentDate = new Date()
            var currentDateParse = Date.parse(currentDate);
            var startTime = data[k].start;
            console.log(startTime);
            var startTimeSplit = startTime.split("Z");
            var startTimeParse = Date.parse(startTimeSplit[0]);
            var timeDifference = startTimeParse - currentDateParse;

            times.push(
              {
                eventId: data[k].eventId, 
                start: timeDifference
              }
            )
          }
          console.log("these are the times");
          console.log(times);
          for(var j = 0; j < times.length; j++) {
            if(times[j].start < lowestTime && times[j].start >= -1800000) {
              console.log("time loop 2 called")
              lowestTime = times[j].start;
              lowestId = times[j].eventId;
              console.log("this is the lowest Id in function: " + lowestId);
            }
            lowestId;
          }
          lowestId;
        }
        lowestId;
      })
      lowestId;
    }
    lowestId;
    console.log("this is the lowest Id: " + lowestId);
    if(lowestId !== null) {
      await Events.findOne({eventId: lowestId}, (err, data) => {
        emailSave;
        if(err) return console.log(err);
        if (data !== null && data !== undefined && data.length !== 0) {
          console.log("this is the lowest data");
          console.log(data);
          var d = new Date(); // current time
          var currentTime = Date.parse(d);
          
          //var hours = d.getHours();
          //var mins = d.getMinutes();
          var day = d.getDate();
          var year = d.getFullYear();
          var month = d.getMonth() + 1;
          // Time Structuring
          if(day == 0 || day == 1 || day == 2 || day == 3 || day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9) {
            day = "0" + day
          }      
          if(month == 0 || month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = "0" + month;
          }      
        
          //var fullMinutes = hours * 60 + mins;
          //console.log("full minutes: " + fullMinutes);
        
          // Current Time //
        
          var currentDate = year + "-" + month + "-" + day;
          //var currentTime = hours + ":" + mins + ":00";
          //console.log(currentDate);
          //console.log(currentTime);
        
          // Start Times //
          var timeSplitStart = data.start.split("T");
          var startDate = timeSplitStart[0];
          var timeSplitTimeStart = data.start.split("Z");
          var startTime = Date.parse(timeSplitTimeStart[0]);
          //var startTime = timeSplitStart[1];
          //console.log(startDate);
          //console.log(startTime);
          //var realStartTime = startTime.replace("Z", "");
          //var realStartTimeSplit = realStartTime.split(":");
          //var realStartHour = realStartTimeSplit[0];
          //var realStartMinutes = realStartTimeSplit[1];
          //console.log("real start hour: " + realStartHour);
          //console.log("real start mins: " + realStartMinutes);
          //var realStartFullMinutes = parseInt(realStartHour) * 60 + parseInt(realStartMinutes);
          //console.log("real start full minutes: " + realStartFullMinutes);
        
          // End Times //
          var timeSplitEnd = data.end.split("T");
          var endDate = timeSplitEnd[0];
          var timeSplitTimeEnd = data.end.split("Z");
          var endTime = Date.parse(timeSplitTimeEnd[0]);
          //var endTime = timeSplitEnd[1];
          //var realEndTime = endTime.replace("Z", "")
          //var realEndTimeSplit = realEndTime.split(":");
          //var realEndHour = realEndTimeSplit[0];
          //var realEndMinutes = realEndTimeSplit[1];
          //var realEndFullMinutes = parseInt(realEndHour) * 60 + parseInt(realEndMinutes);
          //console.log("real end full minutes: " + realEndFullMinutes);
        
          // Time Logs //
          //console.log(startDate);
          //console.log(realStartTime);
          //console.log(endDate);
          //console.log(realEndTime);
          console.log("this is the current date: " + currentDate);
          console.log("this is the start date: " + startDate);

          console.log("current time: " + currentTime);
          console.log("start time: " + startTime);
          console.log(startTime - currentTime);
          console.log(currentTime - startTime)
        
          // Time Cross-Reference //
          if(currentDate == startDate && currentTime >= startTime && currentTime <= endTime || currentDate == endDate && currentTime >= startTime && currentTime <= endTime) {
            if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
              req.session.sessionID = "none";
            }
            console.log("time is now");
            console.log(data);
            console.log("this is the saved email: " + emailSave)
            req.session.sessionID = data.eventId;
            console.log(req.session.sessionID)
            WaitingRoom.updateOne({number: 1}, {$set: {email: emailSave}}, (err, data) => {if(err) console.log(err); console.log(data)});
          }
          if(currentDate == startDate && currentTime < startTime && currentTime < endTime || currentDate == endDate && currentTime < startTime && currentTime < endTime) {
            if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
              req.session.sessionID = "none";
            }
            console.log("this is not now");
            var timeLeft = startTime - currentTime;
            console.log(timeLeft);
            var minutesLeft = Math.floor(timeLeft / 60000);
            req.session.sessionID = minutesLeft;
            console.log("timeleft is set: " + req.session.sessionID);
          }
          if(currentDate !== startDate && currentDate !== endDate) {
            req.session.sessionID = "none"
          }
        }
      })
      await TestEvents.findOne({eventId: lowestId}, (err, data) => {
        emailSave;
        if(err) return console.log(err);
        if (data !== null && data !== undefined && data.length !== 0) {
          console.log("this is the lowest data");
          console.log(data);
          var d = new Date(); // current time
          var currentTime = Date.parse(d);
          
          //var hours = d.getHours();
          //var mins = d.getMinutes();
          var day = d.getDate();
          var year = d.getFullYear();
          var month = d.getMonth() + 1;
          // Time Structuring
          if(day == 0 || day == 1 || day == 2 || day == 3 || day == 4 || day == 5 || day == 6 || day == 7 || day == 8 || day == 9) {
            day = "0" + day
          }      
          if(month == 0 || month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = "0" + month;
          }      
        
          //var fullMinutes = hours * 60 + mins;
          //console.log("full minutes: " + fullMinutes);
        
          // Current Time //
        
          var currentDate = year + "-" + month + "-" + day;
          //var currentTime = hours + ":" + mins + ":00";
          //console.log(currentDate);
          //console.log(currentTime);
        
          // Start Times //
          var timeSplitStart = data.start.split("T");
          var startDate = timeSplitStart[0];
          var timeSplitTimeStart = data.start.split("Z");
          var startTime = Date.parse(timeSplitTimeStart[0]);
          //var startTime = timeSplitStart[1];
          //console.log(startDate);
          //console.log(startTime);
          //var realStartTime = startTime.replace("Z", "");
          //var realStartTimeSplit = realStartTime.split(":");
          //var realStartHour = realStartTimeSplit[0];
          //var realStartMinutes = realStartTimeSplit[1];
          //console.log("real start hour: " + realStartHour);
          //console.log("real start mins: " + realStartMinutes);
          //var realStartFullMinutes = parseInt(realStartHour) * 60 + parseInt(realStartMinutes);
          //console.log("real start full minutes: " + realStartFullMinutes);
        
          // End Times //
          var timeSplitEnd = data.end.split("T");
          var endDate = timeSplitEnd[0];
          var timeSplitTimeEnd = data.end.split("Z");
          var endTime = Date.parse(timeSplitTimeEnd[0]);
          //var endTime = timeSplitEnd[1];
          //var realEndTime = endTime.replace("Z", "")
          //var realEndTimeSplit = realEndTime.split(":");
          //var realEndHour = realEndTimeSplit[0];
          //var realEndMinutes = realEndTimeSplit[1];
          //var realEndFullMinutes = parseInt(realEndHour) * 60 + parseInt(realEndMinutes);
          //console.log("real end full minutes: " + realEndFullMinutes);
        
          // Time Logs //
          //console.log(startDate);
          //console.log(realStartTime);
          //console.log(endDate);
          //console.log(realEndTime);
          console.log("this is the current date: " + currentDate);
          console.log("this is the start date: " + startDate);

          console.log("current time: " + currentTime);
          console.log("start time: " + startTime);
          console.log(startTime - currentTime);
          console.log(currentTime - startTime)
        
          // Time Cross-Reference //
          if(currentDate == startDate && currentTime >= startTime && currentTime <= endTime || currentDate == endDate && currentTime >= startTime && currentTime <= endTime) {
            if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
              req.session.sessionID = "none";
            }
            console.log("time is now");
            console.log(data);
            console.log("this is the saved email: " + emailSave)
            req.session.sessionID = data.eventId;
            console.log(req.session.sessionID)
            WaitingRoom.updateOne({number: 1}, {$set: {email: emailSave}}, (err, data) => {if(err) console.log(err); console.log(data)});
          }
          if(currentDate == startDate && currentTime < startTime && currentTime < endTime || currentDate == endDate && currentTime < startTime && currentTime < endTime) {
            if(req.session.sessionID !== "none" || req.session.sessionID !== undefined) {
              req.session.sessionID = "none";
            }
            console.log("this is not now");
            var timeLeft = startTime - currentTime;
            console.log(timeLeft);
            var minutesLeft = Math.floor(timeLeft / 60000);
            req.session.sessionID = minutesLeft;
            console.log("timeleft is set: " + req.session.sessionID);
          }
          if(currentDate !== startDate && currentDate !== endDate) {
            console.log("event passed or not found")
            req.session.sessionID = "none"
          }
        }
      })
    }
    if(lowestId == null) {
      req.session.sessionID = undefined;
    }
  }
  res.redirect('/hgqv7c96m6zdcp6e');
})

app.get('/eventbriteinfo/*', (req, res) => {
  //const response = await fetch(url, {
  //  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //  mode: 'cors', // no-cors, *cors, same-origin
  //  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //  credentials: 'same-origin', // include, *same-origin, omit
  //  headers: {
  //    'Content-Type': 'application/json'
  //    // 'Content-Type': 'application/x-www-form-urlencoded',
  //  },
  //  redirect: 'follow', // manual, *follow, error
  //  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //  body: JSON.stringify(data) // body data type must match "Content-Type" header
  //});


  //https://www.eventbriteapi.com/v3/users/me/?token=RABBP6UZSJMSJM5Y6VH6

})

app.get('/databaseclear', (req, res) => {

})

// Max Patch Send //

app.get('/kqn8hw4frft9sg2g/*', async (req, res) => {
  var currentInput = req.query.input;
  var currentMessage = req.query.message;
  console.log(currentInput)
  console.log(currentMessage)
  if (currentMessage.indexOf('_') !== -1) {
    var newMessage = currentMessage.split('_').join(" ");
    if(currentInput == 1 || currentInput == 2 || currentInput == 3 || currentInput == 4) {
      if(newMessage == "no answer given.") {
        console.log("equals no answer given")
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          console.log("this is the current database prompt: " + data.prompt)
          newMessage;
          if(data.prompt == "none") {
            console.log("this is the current database prompt: " + data.prompt)
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "no answer given.") {
        console.log("does not equal no answer given")
        clientSend.send(currentInput, newMessage, (err) => {
          if (err) console.log(err);
        })
      }
    }
  }
  if(currentMessage.indexOf('_') === -1) {
    clientSend.send(currentInput, currentMessage, (err) => {
      if (err) console.error(err);
    });
  } 
  res.end();
}) 

// Host Page //

app.get('/6st8v32qwsmm85sc/:id', (req, res) => {
  console.log("kick and guide called");
  console.log(req.params.url)
  var urlId = req.params.id;
  console.log(urlId);
  app.set("current", urlId);
  req.session.destroy();
  res.end();
})

app.get('/checkpage', async (req, res) => {
  //console.log("checkPage")
  var jsonObject = {
    number: undefined
  }
  var currentPage = app.get("current");
  //console.log(currentPage);
  if(currentPage === undefined) {
    //console.log("currentPage is undefined")
    jsonObject.number = 0;
    res.send(jsonObject);
  } 
  if(currentPage !== undefined) {
    jsonObject.number = currentPage;
    //console.log(jsonObject);
    res.send(jsonObject);
  }
  res.end();
})

app.get('/zykhetk344e42uds/*', async (req, res) => {
  var currentInput = req.query.input;
  var currentMessage = req.query.message;
  console.log("this is the current input:" + currentInput)
  console.log("this is the current message:" + currentMessage)
  if (currentMessage.indexOf('_') !== -1) { 
    var newMessage = currentMessage.split('_').join(" ");
    console.log(newMessage)
    if(currentInput == 1) {
      console.log("newMessage 2: " + newMessage)
      if(newMessage == "no answer given.") {
        console.log("equals no answer given")
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          console.log("this is the current database prompt: " + data.prompt)
          newMessage;
          if(data.prompt == "none") {
            console.log("this is the current database prompt: " + data.prompt)
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "no answer given.") {
        console.log("does not equal no answer given")
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 2) {
      if(newMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 3) {
      if(newMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 4) {
      if(newMessage == "000000") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "000000") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 5) {
      if(newMessage == "None") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage = "No light picked."
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "None") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 6) {
      if(newMessage == "None") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage = "No light picked."
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "No light picked.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 7) {
      if(newMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 8) {
      if(newMessage == "000000") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "000000") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 9) {
      if(newMessage == "None") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage = "No light picked."
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "None") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 10) {
      if(newMessage == "None") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          newMessage = "No light picked."
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(newMessage !== "None") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: newMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
  }
  if(currentMessage.indexOf('_') == -1) {
    if(currentInput == 1) {
      if(currentMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 2) {
      if(currentMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 3) {
      if(currentMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 4) {
      if(currentMessage == "000000") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "000000") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 5) {
      if(currentMessage == "No light picked.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "No light picked.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 6) {
      if(currentMessage == "No light picked.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "No light picked.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 7) {
      if(currentMessage == "no answer given.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "no answer given.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 8) {
      if(currentMessage == "000000") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "000000") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 9) {
      if(currentMessage == "No light picked.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "No light picked.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
    if(currentInput == 10) {
      if(currentMessage == "No light picked.") {
        await Prompts.findOne({number: currentInput}, async (err, data) => {
          if(err) console.log(err);
          currentMessage;
          if(data.prompt == "none") {
            await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
              if (err) return console.log(err)
              console.log(data);
            })
          }
        })
      }
      if(currentMessage !== "No light picked.") {
        await Prompts.updateOne({number: currentInput}, {$set: {prompt: currentMessage}}, (err, data) => {
          if (err) return console.log(err)
          console.log(data);
        });
      }
    }
  } 
  res.end();
})

app.get('/zykhetk344e42uds22222/*', (req, res) => {
  var currentInput = req.query.input;
  var currentMessage = req.query.message;
  console.log("this is the current input:" + currentInput)
  console.log("this is the current message:" + currentMessage)
  if (currentMessage.indexOf('_') !== -1) { 
    var newMessage = currentMessage.split('_').join(" ");
    if(currentInput == 1) {
      console.log("currentInput is 1");
      app.set("prompt1", newMessage);
      console.log("this is prompt1:" + app.get('prompt1'));
    }
    if(currentInput == 2) {
      app.set("prompt2", newMessage);
    }
    if(currentInput == 3) {
      app.set("prompt3", newMessage);
    }
    if(currentInput == 4) {
      console.log("4 has been triggered")
      app.set("prompt4", newMessage);
      console.log("this is prompt4:" + app.get('prompt4'));
    }
    if(currentInput == 5) {
      app.set("prompt5", newMessage);
    }
    if(currentInput == 6) {
      app.set("prompt6", newMessage);
    }
    if(currentInput == 7) {
      app.set("prompt7", newMessage);
    }
    if(currentInput == 8) {
      app.set("prompt8", newMessage);
    }
    if(currentInput == 9) {
      app.set("prompt9", newMessage);
    }
    if(currentInput == 10) {
      app.set("prompt10", newMessage);
    }
  }
  if(currentMessage.indexOf('_') == -1) {
    if(currentInput == 1) {
      console.log('current input is 1');
      app.set("prompt1", currentMessage);
      console.log("this is prompt 1:" + app.get('prompt1'));
    }
    if(currentInput == 2) {
      app.set("prompt2", currentMessage);
    }
    if(currentInput == 3) {
      app.set("prompt3", currentMessage);
    }
    if(currentInput == 4) {
      console.log("4 has been triggered")
      app.set("prompt4", currentMessage);
      console.log(app.get("prompt4"))
    }
    if(currentInput == 5) {
      app.set("prompt5", currentMessage);
    }
    if(currentInput == 6) {
      app.set("prompt6", currentMessage);
    }
    if(currentInput == 7) {
      app.set("prompt7", currentMessage);
    }
    if(currentInput == 8) {
      app.set("prompt8", currentMessage);
    }
    if(currentInput == 9) {
      app.set("prompt9", currentMessage);
    }
    if(currentInput == 10) {
      app.set("prompt10", currentMessage);
    }
  } 
  res.end();
})


app.get('/6st8v32qwsmm85sc/:id', (req, res) => {
  console.log("kick and guide called");
  console.log(req.params.url)
  var urlId = req.params.id;
  console.log(urlId);
  app.set("current", urlId);
  res.end();
})

app.get('/checkpage', async (req, res) => {
  //console.log("checkPage")
  var jsonObject = {
    number: undefined
  }
  var currentPage = app.get("current");
  //console.log(currentPage);
  if(currentPage === undefined) {
    //console.log("currentPage is undefined")
    jsonObject.number = 0;
    res.send(jsonObject);
  } 
  if(currentPage !== undefined) {
    jsonObject.number = currentPage;
    //console.log(jsonObject);
    res.send(jsonObject);
  }
  res.end();
})


app.get('/8mgttkxbw987j5wc', async (req, res) => {
  await Prompts.updateOne({number: 1}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 2}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 3}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 4}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 5}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 6}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 7}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 8}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 9}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await Prompts.updateOne({number: 10}, {$set: {prompt: "none"}}, (err, data) => {if(err) return console.log(err); console.log(data)});
  await CurrentUser.updateOne({number: 1}, {$set: {email: "None"}}, (err, data) => {if (err) return console.log(err); console.log(data)});
  app.set("current", 0);
  req.session.destroy();
  res.end();
})

app.get('/hostcheck', async (req, res) => {
  var prompt1Call = await Prompts.findOne({number: 1});
  var prompt1 = prompt1Call.prompt
  var prompt1Real = undefined
  if(prompt1 === "none") {
    prompt1Real = "none";
  }
  if(prompt1 !== "none") {
    prompt1Real = prompt1;
  }

  var prompt2Call = await Prompts.findOne({number: 2});
  var prompt2 = prompt2Call.prompt
  var prompt2Real = undefined
  if(prompt2 === "none") {
    prompt2Real = "none";
  }
  if(prompt2 !== "none") {
    prompt2Real = prompt2;
  }

  var prompt3Call = await Prompts.findOne({number: 3});
  var prompt3 = prompt3Call.prompt;
  var prompt3Real = undefined
  if(prompt3 === "none") {
    prompt3Real = "none";
  }
  if(prompt3 !== "none") {
    prompt3Real = prompt3;
  }

  var prompt4Call = await Prompts.findOne({number: 4});
  var prompt4 = prompt4Call.prompt;
  var prompt4Real = undefined
  if(prompt4 === "none") {
    prompt4Real = "none";
  }
  if(prompt4 !== "none") {
    prompt4Real = prompt4;
  }

  var prompt5Call = await Prompts.findOne({number: 5});
  var prompt5 = prompt5Call.prompt;
  var prompt5Real = undefined
  if(prompt5 === "none") {
    prompt5Real = "none";
  }
  if(prompt5 !== "none") {
    prompt5Real = prompt5;
  }

  var prompt6Call = await Prompts.findOne({number: 6});
  var prompt6 = prompt6Call.prompt;
  var prompt6Real = undefined
  if(prompt6 === "none") {
    prompt6Real = "none";
  }
  if(prompt6 !== "none") {
    prompt6Real = prompt6;
  }

  var prompt7Call = await Prompts.findOne({number: 7});
  var prompt7 = prompt7Call.prompt;
  var prompt7Real = undefined
  if(prompt7 === "none") {
    prompt7Real = "none";
  }
  if(prompt7 !== "none") {
    prompt7Real = prompt7;
  }

  var prompt8Call = await Prompts.findOne({number: 8});
  var prompt8 = prompt8Call.prompt;
  var prompt8Real = undefined
  if(prompt8 === "none") {
    prompt8Real = "none";
  }
  if(prompt8 !== "none") {
    prompt8Real = prompt8;
  }

  var prompt9Call = await Prompts.findOne({number: 9});
  var prompt9 = prompt9Call.prompt;
  var prompt9Real = undefined
  if(prompt9 === "none") {
    prompt9Real = "none";
  }
  if(prompt9 !== "none") {
    prompt9Real = prompt9;
  }

  var prompt10Call = await Prompts.findOne({number: 10});
  var prompt10 = prompt10Call.prompt;
  var prompt10Real = undefined
  if(prompt10 === "none") {
    prompt10Real = "none";
  }
  if(prompt10 !== "none") {
    prompt10Real = prompt10;
  }


  var promptArray = [
    {
      prompt: 1,
      message: prompt1Real
    },
    {
      prompt: 2,
      message: prompt2Real
    },
    {
      prompt: 3,
      message: prompt3Real
    },
    {
      prompt: 4,
      message: prompt4Real
    },
    {
      prompt: 5,
      message: prompt5Real
    },
    {
      prompt: 6,
      message: prompt6Real
    },
    {
      prompt: 7,
      message: prompt7Real
    },
    {
      prompt: 8,
      message: prompt8Real
    },
    {
      prompt: 9,
      message: prompt9Real
    },
    {
      prompt: 10,
      message: prompt10Real
    },
  ]
  res.send(promptArray);
  res.end();
})

app.get('/zeba5ue82qpsecpn/*', async (req, res) => {
  var start = req.query.input;
  if(start == 0) {
    app.set("showStart", 0);
    await WaitingRoom.updateOne({number: 1}, {$set: {email: "None"}}, (err, data) => {if(err) console.log(err); console.log(data)});
  }
  if(start == 1) {
    app.set("showStart", 1);
    app.set("waiting", false);
    await WaitingRoom.findOne({number: 1}, async (err, data) => {
      if(err) console.log(err); 
      console.log(data);
      await CurrentUser.updateOne({number: 1}, {$set: {email: data.email}}, (err, data) => {if(err) console.log(err); console.log(data)});
    });
  }
  res.end();
})

app.get('/checkshow', async (req, res) => {
  var showCheck = {
    number: undefined
  }
  var check = app.get("showStart");
  if(check == 1) {
    await WaitingRoom.findOne({number: 1}, async (err, data) => {
      if(err) console.log(err); 
      console.log(data);
      if(data.email !== "None") {
        await CurrentUser.updateOne({number: 1}, {$set: {email: data.email}}, (err2, data2) => {if(err2) console.log(err2); console.log(data2)})
        await WaitingRoom.updateOne({number: 1}, {$set: {email: "None"}}, (err3, data3) => {if(err3) console.log(err3); console.log(data3)});
      }
      });
    showCheck.number = 1
    res.send(showCheck);
  }
  else {
    showCheck.number = 0
    res.send(showCheck);
  }
  res.end();
})

app.get("/test", (req, res) => {
  console.log("test");
  res.end();
})

app.get('/checkticket/*', async (req, res) => {
  const ticket = req.query.ticket;
  Events.findOne({eventId: ticket}, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  })
})

app.get('/youtubelink/*', async (req, res) => {
  var youtubeLink = req.query.link;
  console.log(youtubeLink);
  await Link.remove({})
  var newLink = await new Link({link: youtubeLink}); 
  await newLink.save((err, data) => {
    if(err) return console.log(err);
    console.log(data);
  })
  res.end();
})

app.get('/getyoutubelink', async (req, res) => {
  var youtubeLink = {
    link: null
  }
  await Link.find({}, (err, res) => {
    if (err) console.log(err);
    youtubeLink.link = res[0];
  })
  res.send(youtubeLink);
})