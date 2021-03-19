require ("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

//const socket = io.connect("http://18.189.26.197:8000", { secure: false, reconnection: true, rejectUnauthorized: false });
//const socket = require('socket.io');
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: "*",
}));
app.use(cookieParser());

//require('./config/mongoose.config');
require('./config/mongoose.config')(process.env.DB_NAME);

require('./routes/skiffs.route')(app);
require('./routes/user.routes')(app);

// this is showing undefined.
//app.listen(process.env.DB_PORT, () => console.log(`Trying to listen on port: ${process.env.DB_PORT} which is the Process Env DB_Port`));

const server = app.listen(process.env.DB_PORT, () => {console.log(`Listening on port: ${port} which should be :8000`)});

// server-side
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    }
  });

io.on("connection", (socket) => {
    console.log('on the server side - socket id: ' + socket.id);

    // send a message to ONLY the client that just connected
    socket.emit('your_socket_id', socket.id);  

    socket.on("added_skiff", (data) => {
        console.log("New Skiff Added:");
        console.log(data);
        // send a message to ALL clients EXCEPT for the one that added the skiff
        socket.broadcast.emit("new_added_skiff", data);
    });

    socket.on("edited_skiff", (data) => {
        console.log("Skiff Edited:");
        console.log(data);
        // send a message to ALL clients EXCEPT for the one that edited the skiff
        socket.broadcast.emit("edited_skiff", data);
    });

    socket.on("deleted_skiff", (data) => {
        console.log("skiff was deleted");
        console.log(data);
        socket.broadcast.emit("remove_skiff", data);
    })

    socket.on("disconnect", (data) => {
        // print to the console that a client disconnected
        console.log(`socket disconnected...did you mean to? ${socket.id}`);
    })
})

