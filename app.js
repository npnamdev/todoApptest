const express = require('express');
const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./views");
const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(3000);

const listTask = [];

io.on("connection", (socket) => {
    console.log('Client connected: ' + socket.id);

    socket.on("add-task", function (data) {
        console.log(data);
        listTask.push(data)
        io.sockets.emit("server-send-data", listTask)
    })
})

app.get("/", (req, res) => {
    res.render("home");
})