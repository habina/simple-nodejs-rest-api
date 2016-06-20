var express = require('express'),
    users = require('./routes/users'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/users', users.findAllUsers);
app.get('/users/:id', users.findUserById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

app.listen(3000);

console.log('Listening on port 3000...');
