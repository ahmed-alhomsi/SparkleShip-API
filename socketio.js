const express = require("express");
var http = require("http");
const cors= require("cors");
const fs = require('fs')
const { Socket } = require("socket.io");
const app=express();
const port = 8800;
var server = http.createServer(app);
var io= require("socket.io")(server,{
    cors:{
        origin:"*"
    }
});

app.use(express.json());
app.use(cors());
io.on("connection",(Socket)=>{
    Socket.join('first_group');
    console.log("Connected");
    console.log(Socket.id,' has joined');
    Socket.on('/canada',(msg)=>{
        console.log(msg)
        io.to('first_group').emit('canada/sender',msg);
    })

    Socket.on('/europe',(msg)=>{
        console.log(msg)
        io.to('first_group').emit('europe/sender',msg);
    })
});

server.listen(port,"0.0.0.0",()=>{
    console.log("server started");
});