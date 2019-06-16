const express = require('express');
const router = require('./routers');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://jair:jair123@cluster0-4voee.mongodb.net/mearn?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(router);

server.listen(3000);