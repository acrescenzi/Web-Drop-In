var express = require('express');
var app = express();
var path = require('path');


app.use( express.static( __dirname + '/public' ));

// POST method route
app.post('/payment', function (req, res) {
    res.send('POST request for payment')
  })

app.listen(3000);