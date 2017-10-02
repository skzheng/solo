const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const yelp = require('yelp-fusion');
const parser = require('body-parser');
const compiler = webpack(webpackConfig);
require('ssl-root-cas').inject();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);



// SOCKETS ============
io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  // socket.on('change', function(){
  // }) 
});
// ====================

// YELP API ===========

const clientId = 'vu7tgLOf6OAAfuCJo8AcLQ';
const clientSecret = 'RrVEgGhQdXknYCOnIZHRurQ0J6QCtDhTqCWLFC1D6cxoNTZ4wZkdYMdWeh1JfiAj';

// const token = yelp.accessToken(clientId, clientSecret).then(response => {
//   const client = (response.jsonBody.access_token);
// }).catch(e => {
//   console.log(e);
// });
const token = "o5Fc4rhnroNvg3h7n5SJ35RlnAlnKOfsT2z_TgtBrgxUmJScSHperL3RdRS3OrSUQeFiImjYVHwBTzKj1-BK2xccSAN_ua4Mgwtr6uKVgk8CHm0jjjPZDLSDr8XKWXYx";
const client = yelp.client(token);

//======================

app.use(parser.json());
app.use(express.static(__dirname + '/www'));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 

// TWILIO ========
const accountSid = 'ACcb99ee6ba943563febfd3cca72d06f6f';
const authToken = '99e0d2ad20452d7ee4b2fd6812a42d80';
const twilio = require('twilio');
const twilioClient = new twilio(accountSid, authToken);

app.post('/message', function(req,res) {
  console.log('afsdfsdf');
  console.log(req.body);

  twilioClient.messages.create({
    body: req.body.message,
    to: req.body.number,
    from: '+12019034667'
  })
  .then((message) =>
    console.log(message.sid));
})
//==================

// HANDLERS ===========
app.post('/random', function(req,res){
  console.log(req.body.term);
  client.search({
    term: "",
    categories: "restaurants",
    limit: 50,
    // location: "new york, ny",
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    radius: 1000,
    open_now: true
  })
  .then(response => {
    var businesses = response.jsonBody.businesses;
    var resultsArray = []
    while (resultsArray.length < 5){
      var random = Math.floor(Math.random() * (businesses.length -1 ));
      if(!resultsArray.includes(response.jsonBody.businesses[random])){
        resultsArray.push(response.jsonBody.businesses[random]);
      }
    }
    console.log(resultsArray);
    res.send(resultsArray);
  })
  .catch(error => {
    console.log(error);
  })
})

app.post('/business', function(req,res){
  client.business(req.body.id)
  .then(response => {
    res.send(response.jsonBody);
  })
  .catch(error => {
    console.log(error);
  })
})

app.post('/reviews', function(req, res){
  client.reviews(req.body.id)
  .then(response => {
    res.send(response.jsonBody);
  })
  .catch(error => {
    console.log(error)
  })
})
// ==================
const server = http.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});