const express = require('express');
const logger = require('morgan');
// const index = require('./routes/index')
const admins = require('./routes/admins');
const skills = require('./routes/skills');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
// const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

const passport = require('passport');
require('./middleware/passport')
app.use(session({ secret: 'iloveyou' })); // chuối bí mật đã mã hóa coookie
app.use(passport.initialize());
app.use(passport.session());

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', function (req, res) {
  res.json({ "HKTeam": "Server Admin UpTutor" });
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, secret_token");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// public route
// app.use('./', index);
app.use('/admins', admins);
app.use('/skills', skills);

// private route
app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});

// app.set( 'port', ( process.env.PORT || 5000 ));
// Start node server
// app.listen(app.get( 'port' ), function(){
//  console.log('Node server listening on port ' + app.get( 'port' ));
// });

// #!/usr/bin/env node

// /**
//  * Module dependencies.
//  */

var debug = require('debug')('btcn06-restfulapi:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on port ' + addr.port)

}
