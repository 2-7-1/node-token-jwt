'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
const uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config'); // get our config file
// var User = require('./api/models/user'); // get our mongoose model

// Server Configuration
var port = process.env.PORT || 8080;
app.set('secret', config.secret); // secret variable

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Morgan logging
app.use(morgan('dev'));

// Base path 
app.get('/', function (req, res) {
    res.send('JWT demo API path http://localhost:' + port + '/api');
});

// Authenticate user
var apiRoutes = express.Router();
apiRoutes.post('/get-token', function (req, res) {
    if (req.body.userName != 'Mr. Node') {
        res.json({
            success: false,
            message: 'Authentication failed.  User not found'
        });
    } else if (req.body.password != 'password') {
        res.json({
            success: false,
            message: 'Authentication failed.  Bad password'
        });
    } else {
        const payload = {
            userName: req.body.userName,
            password: req.body.password // This should be hashed
        }
        var token = jwt.sign(payload, app.get('secret'), {
            expiresIn: 1440
        });
        res.json({
            success: true,
            message: 'User JWT',
            token: token
        });
    }
});

// Middleware to verify a token and authenticate user.  All requests will go through this function.
apiRoutes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {
                if ((decoded.userName == 'Mr. Node') && (decoded.password == 'password')) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.status(403).send({
                        success: false,
                        message: 'User not authenticated.'
                    })
                }
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});

// Show a welcome message for this API (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({
        message: 'JWT Demo API'
    });
});

// Return all users (GET http://localhost:8080/api/get-message)
apiRoutes.get('/get-message', function (req, res) {
    res.json({
        Message: 'Hello!'
    })
});

// Apply routes to our application path /api
app.use('/api', apiRoutes);

// Start Express Server
app.listen(port);
console.log('Starting server http://localhost:' + port);