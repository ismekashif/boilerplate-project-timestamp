// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Send current time
app.get('/api', (req, res) => {
  res.json({"unix": Date.now(), "utc": new Date().toUTCString()});
});

// Send formatted date and time according to Unix and UTC
app.get('/api/:date', (req, res) => {
  let routeParam = req.params.date;
  const date = isNaN(+routeParam) ? new Date(routeParam) : new Date(+routeParam);
  const unixDate = new Date(date).getTime()
  const utcDate = new Date(date);

  unixDate == "Invalid Date" || utcDate == "Invalid Date"
  ? res.json({"error": "Invalid Date"})
  : res.json({"unix": unixDate, "utc": utcDate.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});