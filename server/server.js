const express = require('express');
const app = express();
const cors = require('cors');
const port =8000;
const socket = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require('./config/mongoose.config');

require('./routes/skiffs.route')(app);

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
    });
io.on("connection", (socket) => {
    console.log('on the server side - socket id: ' + socket.id);
    
    socket.on("added_skiff", (data) => {
        console.log("new skiff added");
        console.log(data);
        socket.broadcast.emit("new_added_skiff", data);
    })
})